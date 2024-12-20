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
            course_type ENUM('Full Access', 'Subscription') NOT NULL,
            course_price DECIMAL(10, 2),
            image_id INT,
            CLOs JSON,
            tags JSON,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (image_id) REFERENCES images(image_id) ON DELETE SET NULL
        )
    `;
    db.query(sql, callback);
};

exports.createCourse = (courseData, callback) => {
    const sql = `
        INSERT INTO courses 
        (user_id, course_name, course_description, difficulty, difficulty_description, course_type, course_price, image_id, CLOs, tags, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    db.query(sql, courseData, callback);
};

exports.getCourses = (callback) => {
    const sql = `
        SELECT courses.*, users.full_name AS instructor_name 
        FROM courses
        INNER JOIN users ON courses.user_id = users.user_id
    `;
    db.query(sql, callback);
};

exports.getCoursesByUser = (user_id, callback) => {
    const sql = `
        SELECT courses.*, users.full_name AS instructor_name 
        FROM courses
        INNER JOIN users ON courses.user_id = users.user_id
        WHERE courses.user_id = ?
    `;
    db.query(sql, [user_id], callback);
};

exports.deleteCourse = (course_id, callback) => {
    const sql = "DELETE FROM courses WHERE course_id = ?";
    db.query(sql, [course_id], callback);
};

exports.editCourse = (course_id, courseData, callback) => {
    const { course_name, course_description, difficulty, difficulty_description, course_type, course_price, image_id, CLOs, tags } = courseData;
    const sql = `
        UPDATE courses 
        SET course_name = ?, course_description = ?, difficulty = ?, difficulty_description = ?, course_type = ?, course_price = ?, image_id = ?, CLOs = ?, tags = ?, updated_at = NOW()
        WHERE course_id = ?
    `;
    const values = [course_name, course_description, difficulty, difficulty_description, course_type, course_price, image_id, CLOs, tags, course_id];
    db.query(sql, values, callback);
};

exports.getCourseById = (course_id, callback) => {
    const sql = `
        SELECT courses.*, users.full_name AS instructor_name, 
               (SELECT COUNT(*) FROM chapters WHERE chapters.course_id = courses.course_id) AS chapter_number
        FROM courses
        INNER JOIN users ON courses.user_id = users.user_id
        WHERE courses.course_id = ?
    `;
    db.query(sql, [course_id], callback);
};
