const db = require('../config/db');

// Create `images` table
exports.createImagesTable = (callback) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS images (
            image_id INT AUTO_INCREMENT PRIMARY KEY,
            image_data LONGBLOB NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    db.query(sql, callback);
};

exports.uploadImage = (imageData, callback) => {
    const sql = `INSERT INTO images (image_data) VALUES (?)`;
    db.query(sql, [imageData], (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId); // Return the image ID
    });
};

try {
    console.log("Image model")
    exports.getImage = (image_id, callback) => {
        const sql = `SELECT * FROM images WHERE image_id = ?`;
        db.query(sql, [image_id], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback({ message: "Image not found" });
            callback(null, results[0]);
        });
    }
}
catch (err) {
    console.log(err)
}
