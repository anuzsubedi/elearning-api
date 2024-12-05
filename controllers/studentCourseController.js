const db = require('../config/db');

exports.getCoursesByStudentId = (req, res) => {
    const { user_id } = req.params; // Extract `user_id` from params

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required." });
    }

    // Check enrollments for the student
    const enrollmentCheckSql = `
        SELECT course_id 
        FROM enrollments 
        WHERE user_id = ?
    `;
    db.query(enrollmentCheckSql, [user_id], (err, enrollmentResults) => {
        if (err) {
            console.error("Error checking enrollment:", err.message || err);
            return res.status(500).json({ message: "Error checking enrollment." });
        }
        if (enrollmentResults.length === 0) {
            return res.status(404).json({ message: "No enrollments found for this student." });
        }

        const courseDetailsPromises = enrollmentResults.map(enrollment => {
            const course_id = enrollment.course_id;

            // Fetch course details and instructor's full name
            const courseDetailsSql = `
                SELECT courses.*, users.full_name AS instructor_name, 
                       (SELECT COUNT(*) FROM chapters WHERE chapters.course_id = courses.course_id) AS chapter_number
                FROM courses
                INNER JOIN users ON courses.user_id = users.user_id
                WHERE courses.course_id = ?
            `;
            return new Promise((resolve, reject) => {
                db.query(courseDetailsSql, [course_id], (err, courseResults) => {
                    if (err) {
                        console.error("Error fetching course details:", err.message || err);
                        return reject("Error fetching course details.");
                    }
                    if (courseResults.length === 0) {
                        return reject("Course not found.");
                    }
                    resolve(courseResults[0]);
                });
            });
        });

        Promise.all(courseDetailsPromises)
            .then(courseDetails => {
                res.status(200).json(courseDetails);
            })
            .catch(error => {
                res.status(500).json({ message: error });
            });
    });
};