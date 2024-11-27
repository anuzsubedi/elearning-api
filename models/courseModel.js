const db = require('../config/db');

// Create `courses` table
exports.createCoursesTable = (callback) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS courses (
            course_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            course_name VARCHAR(255) NOT NULL,
            course_description TEXT,
            difficulty ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
            difficulty_description TEXT,
            course_type ENUM('Full Access', 'Limited Access') NOT NULL,
            course_price DECIMAL(10, 2),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
        )
    `;
    db.query(sql, callback);
};

// Course-related operations
exports.createCourse = (courseData, callback) => {
    const sql = `
        INSERT INTO courses 
        (user_id, course_name, course_description, difficulty, difficulty_description, course_type, course_price, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    db.query(sql, courseData, callback);
};
