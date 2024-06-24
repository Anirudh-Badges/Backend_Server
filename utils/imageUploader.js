const cloudinary = require('cloudinary').v2;
require("dotenv").config();

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };

  if (height) {
    options.height = height;
  }

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";

  try {
    // console.log('Uploading file:', file);
    // console.log('Options:', options);

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    // console.log('Upload result:', result);

    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};
