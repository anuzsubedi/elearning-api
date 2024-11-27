const fs = require('fs');
const imageModel = require('../models/imageModel');
const db = require('../config/db');

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

exports.getImage = (req, res) => {
    const { image_id } = req.params;

    const sql = `SELECT image_data FROM images WHERE image_id = ?`;
    db.query(sql, [image_id], (err, results) => {
        if (err) {
            console.error("Error fetching image:", err.message || err);
            return res.status(500).json({ message: "Error fetching image." });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Image not found." });
        }

        const imageData = results[0].image_data;

        // Set the appropriate headers and send the image
        res.writeHead(200, {
            "Content-Type": "image/jpeg", // Change this based on your image type
            "Content-Length": imageData.length,
        });
        res.end(imageData); // Send the binary data
    });
};
