
# YELPCAMP

Welcome to **Yelpcamp**, it is a full-stack web application designed for campground exploration, reviews, and user interaction. It features CRUD operations for campgrounds and comments, user authentication for secure access, and seamless integration with interactive maps. Check it out live [here](https://yelpcamp-9qr9.onrender.com/)


## Introduction
YelpCamp isn't just another camping directory – it's a vibrant community-driven hub that empowers users to explore, rate, and contribute their experiences with various campgrounds. From serene lakeside spots to rugged mountain retreats, YelpCamp provides a diverse array of camping destinations waiting to be discovered.

## Features

- **Campground Operations**: Create, Read, Update, and Delete campgrounds.
- **User Authentication**: Register and login with authorization for secure access to features.
- **Comment Operations**: Add, Edit, Delete comments on campgrounds.
- **Map Integration**: View the location of each campground on an interactive map.
- **Environment Variables**: Utilizes environment variables to ensure security and flexibility in configuration.
This project prioritizes security, scalability, and ease of use, providing a solid foundation for building applications that require robust user management functionalities.

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js, Passport.js (for authentication)
- **Database**: MongoDB, Mongoose
- **Mapping**: Mapbox API

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Node.js** (with npm or yarn)
- **MongoDB**
  
To get started with this project locally, follow these steps:
### Instalation
1. Clone the repository:
```bash 
git clone https://github.com/RushikeshShelar/YelpCamp.git
```
2. Install dependencies:
```bash 
cd YelpCamp
npm install
```
3. Set up environment variables:
Create a `.env` file in the root directory of the project and add the following environment variables:
```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_secret_key

# Mapbox Configuration
MAPBOX_TOKEN=your_mapbox_token

# Database URL
DB_URL=your_database_url

# Session Secret
SECRET=your_session_secret
```
Replace these placeholders with your actual values when setting up the environment variables.

4. Start the server:
```bash 
npm start
```
This will start the server at [http://localhost:3000](http://localhost:3000).

## Acknowledgements

 - [Colt Steel](https://www.linkedin.com/in/coltsteele/)
 - [Mapbox](https://www.mapbox.com/)
 - [Cloudinary](https://cloudinary.com/)
 - [MongoDB Atlas](https://cloud.mongodb.com/)
 - [Readme.so](https://readme.so/)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@Rushikesh Shelar](https://www.github.com/RushikeshShelar)


## Contact

If you have any questions or would like to get in touch, please feel free to reach out to me at rushikeshshelar.cs@gmail.com.

Thank you for visiting my repository!
