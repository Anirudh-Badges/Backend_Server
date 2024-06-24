const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudConnect = () => {
  try {
    console.log('Configuring Cloudinary with:', {
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log("Cloudinary is connected");
  } catch (err) {
    console.log("Error connecting to Cloudinary:", err);
  }
};
