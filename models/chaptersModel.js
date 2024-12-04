const db = require('../config/db');

// Create `chapters` table
exports.createChaptersTable = (callback) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS chapters (
            chapter_id INT AUTO_INCREMENT PRIMARY KEY,
            course_id INT NOT NULL,
            chapter_title VARCHAR(255) NOT NULL,
            chapter_content TEXT,
            chapter_description TEXT,
            order_number INT NOT NULL,
            type VARCHAR(50) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
        )
    `;
    db.query(sql, callback);
};

// Create a new chapter
exports.createChapter = (chapterData, callback) => {
    const sql = `
        INSERT INTO chapters (course_id, chapter_title, chapter_content, chapter_description, order_number, type)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, chapterData, callback);
};

// Get all chapters for a course
exports.getChaptersByCourse = (courseId, callback) => {
    const sql = `
        SELECT * FROM chapters
        WHERE course_id = ?
        ORDER BY order_number ASC
    `;
    db.query(sql, [courseId], callback);
};

// Get a single chapter by ID
exports.getChapterById = (chapterId, callback) => {
    const sql = `SELECT * FROM chapters WHERE chapter_id = ?`;
    db.query(sql, [chapterId], callback);
};

// Update a chapter
exports.updateChapter = (chapterId, chapterData, callback) => {
    const sql = `
        UPDATE chapters
        SET chapter_title = ?, chapter_content = ?, chapter_description = ?, order_number = ?, type = ?, updated_at = NOW()
        WHERE chapter_id = ?
    `;
    db.query(sql, [...chapterData, chapterId], callback);
};

// Delete a chapter
exports.deleteChapter = (chapterId, callback) => {
    const sql = `DELETE FROM chapters WHERE chapter_id = ?`;
    db.query(sql, [chapterId], callback);
};