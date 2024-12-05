const db = require('../config/db');

// Create `enrollments` table
exports.createEnrollmentsTable = (callback) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS enrollments (
            enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            course_id INT NOT NULL,
            amount_paid DECIMAL(10, 2) NOT NULL,
            enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
        )
    `;
    db.query(sql, callback);
};

// Enroll a user in a course
exports.enrollUser = (enrollmentData, callback) => {
    const sql = `
        INSERT INTO enrollments (user_id, course_id, amount_paid, enrolled_at)
        VALUES (?, ?, ?, NOW())
    `;
    db.query(sql, enrollmentData, callback);
};

// Get all enrollments
exports.getAllEnrollments = (callback) => {
    const sql = `
        SELECT enrollments.*, users.full_name AS user_name, courses.course_name 
        FROM enrollments
        INNER JOIN users ON enrollments.user_id = users.user_id
        INNER JOIN courses ON enrollments.course_id = courses.course_id
    `;
    db.query(sql, callback);
};

// Get enrollments by user
exports.getEnrollmentsByUser = (user_id, callback) => {
    const sql = `
        SELECT enrollments.*, courses.course_name 
        FROM enrollments
        INNER JOIN courses ON enrollments.course_id = courses.course_id
        WHERE enrollments.user_id = ?
    `;
    db.query(sql, [user_id], callback);
};

// Get enrollments by course
exports.getEnrollmentsByCourse = (course_id, callback) => {
    const sql = `
        SELECT enrollments.*, users.full_name AS user_name 
        FROM enrollments
        INNER JOIN users ON enrollments.user_id = users.user_id
        WHERE enrollments.course_id = ?
    `;
    db.query(sql, [course_id], callback);
};

// Delete an enrollment
exports.deleteEnrollment = (enrollment_id, callback) => {
    const sql = "DELETE FROM enrollments WHERE enrollment_id = ?";
    db.query(sql, [enrollment_id], callback);
};