const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65170dfbe8e76c2024a1e8f8', //Your User ID
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fugit iure amet repellat eos tempora non placeat, ab necessitatibus id, odio sapiente, dolor quia? Voluptatem deserunt aliquid similique repellendus deleniti?',
            price,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddxbv1j8u/image/upload/v1697123361/YelpCamp/ijlorfdm73u2rz9oy7hs.jpg',
                    filename: 'YelpCamp/ijlorfdm73u2rz9oy7hs'
                },
                {
                    url: 'https://res.cloudinary.com/ddxbv1j8u/image/upload/v1697123272/YelpCamp/vdhstrv4plnb64kl6pzg.jpg',
                    filename: 'YelpCamp/vdhstrv4plnb64kl6pzg'
                },
            ],
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}); 