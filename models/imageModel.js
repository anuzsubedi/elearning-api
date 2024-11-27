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
