const db = require('../config/db');


// Enroll a user in a course
exports.enrollUser = (req, res) => {
    const { course_id, amount_paid } = req.body;
    const user_id = req.user?.user_id; // Extract `user_id` from token

    if (!user_id || !course_id || amount_paid === undefined) {
        return res.status(400).json({ message: "Required fields are missing." });
    }

    const sql = `
        INSERT INTO enrollments (user_id, course_id, amount_paid, enrolled_at) 
        VALUES (?, ?, ?, NOW())
    `;
    const values = [user_id, course_id, amount_paid];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error enrolling user:", err.message || err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "User is already enrolled in this course." });
            }
            return res.status(500).json({ message: "Error enrolling user." });
        }
        res.status(201).json({ message: "User enrolled successfully!", enrollment_id: result.insertId });
    });
};

// Get all enrollments
exports.getAllEnrollments = (req, res) => {
    const sql = `
        SELECT enrollments.*, users.full_name AS user_name, courses.course_name 
        FROM enrollments
        INNER JOIN users ON enrollments.user_id = users.user_id
        INNER JOIN courses ON enrollments.course_id = courses.course_id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching enrollments:", err.message || err);
            return res.status(500).json({ message: "Error fetching enrollments." });
        }
        res.status(200).json(results);
    });
};

// Get enrollments by user
exports.getEnrollmentsByUser = (req, res) => {
    const user_id = req.user?.user_id; // Ensure `req.user` is populated by `verifyToken`
    const sql = `
        SELECT enrollments.*, courses.course_name 
        FROM enrollments
        INNER JOIN courses ON enrollments.course_id = courses.course_id
        WHERE enrollments.user_id = ?
    `;
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching user enrollments:", err.message || err);
            return res.status(500).json({ message: "Error fetching user enrollments." });
        }
        res.status(200).json(results);
    });
};

// Get enrollments by course
exports.getEnrollmentsByCourse = (req, res) => {
    const { course_id } = req.params;
    const sql = `
        SELECT enrollments.*, users.full_name AS user_name 
        FROM enrollments
        INNER JOIN users ON enrollments.user_id = users.user_id
        WHERE enrollments.course_id = ?
    `;
    db.query(sql, [course_id], (err, results) => {
        if (err) {
            console.error("Error fetching course enrollments:", err.message || err);
            return res.status(500).json({ message: "Error fetching course enrollments." });
        }
        res.status(200).json(results);
    });
};

// Delete an enrollment
exports.deleteEnrollment = (req, res) => {
    const { enrollment_id } = req.params;
    const sql = "DELETE FROM enrollments WHERE enrollment_id = ?";
    db.query(sql, [enrollment_id], (err, result) => {
        if (err) {
            console.error("Error deleting enrollment:", err.message || err);
            return res.status(500).json({ message: "Error deleting enrollment." });
        }
        res.status(200).json({ message: "Enrollment deleted successfully." });
    });
};