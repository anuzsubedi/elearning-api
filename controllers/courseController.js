const db = require('../config/db');

// Create a new course
exports.createCourse = (req, res) => {
    console.log("User from token:", req.user); // Debugging

    const { course_name, course_description, difficulty, difficulty_description, course_type, course_price } = req.body;
    const user_id = req.user?.user_id; // Safely access `user_id`

    if (!user_id) {
        return res.status(400).json({ message: "User ID is missing in the token." });
    }

    const sql = `
        INSERT INTO courses (user_id, course_name, course_description, difficulty, difficulty_description, course_type, course_price, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const values = [user_id, course_name, course_description, difficulty, difficulty_description, course_type, course_price];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error creating course:", err.message || err);
            return res.status(500).json({ message: "Error creating course." });
        }
        res.status(201).json({ message: "Course created successfully!", course_id: result.insertId });
    });
};


// Get all courses
exports.getAllCourses = (req, res) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching courses:", err.message || err);
            return res.status(500).json({ message: "Error fetching courses." });
        }
        res.status(200).json(results);
    });
};

// Get courses by user
exports.getCoursesByUser = (req, res) => {
    const user_id = req.user.user_id; // Ensure `req.user` is populated by `verifyToken`
    const sql = "SELECT * FROM courses WHERE user_id = ?";
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching user courses:", err.message || err);
            return res.status(500).json({ message: "Error fetching user courses." });
        }
        res.status(200).json(results);
    });
};

// Delete a course
exports.deleteCourse = (req, res) => {
    const { course_id } = req.params;
    const sql = "DELETE FROM courses WHERE course_id = ?";
    db.query(sql, [course_id], (err, result) => {
        if (err) {
            console.error("Error deleting course:", err.message || err);
            return res.status(500).json({ message: "Error deleting course." });
        }
        res.status(200).json({ message: "Course deleted successfully." });
    });
};
