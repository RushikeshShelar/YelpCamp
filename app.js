if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};


const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const userRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds'); 
const reviewsRoutes = require('./routes/reviews');

const MongoStore = require('connect-mongo');

// const dbURL = process.env.DB_URL; // cloud db (MONGO ATLAS)
const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp';


// 'mongodb://127.0.0.1:27017/yelp-camp' // local db
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});
store.on("error", function(e){
    console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
    store,
    name: 'aadi',
    secret: 'RushikeshShelar',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true, //only works on https
        expires: Date.now() + 1000 * 60 * 60 *24 * 7,   
        maxAge: 1000 * 60 * 60 *24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());  
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error'); 
    next();
});

app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'rushi@gmail.com', username: 'rushi' });
    const newUser = await User.register(user, '1234');
    res.send(newUser);
});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);


//Root Route
app.get('/', (req, res) => {
    res.render('home')
});

//Basic Routes
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})