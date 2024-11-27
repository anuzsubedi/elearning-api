const fs = require('fs');
const imageModel = require('../models/imageModel');

exports.uploadImage = (req, res) => {
    const imageFile = req.file;

    if (!imageFile) {
        return res.status(400).json({ message: "No image file provided." });
    }

    const imageData = fs.readFileSync(imageFile.path); // Read the file from disk
    imageModel.uploadImage(imageData, (err, imageId) => {
        if (err) {
            console.error("Error uploading image:", err.message);
            return res.status(500).json({ message: "Error uploading image." });
        }

        res.status(201).json({ message: "Image uploaded successfully!", image_id: imageId });
    });
};
