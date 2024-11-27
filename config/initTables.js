const { createUsersTable } = require('../models/userModel');
const { createCoursesTable } = require('../models/courseModel');

const initializeTables = () => {
    // Create `users` table
    createUsersTable((err) => {
        if (err) {
            console.error("Error creating 'users' table:", err.message);
        } else {
            console.log("'users' table is ready.");
        }
    });

    // Create `courses` table
    createCoursesTable((err) => {
        if (err) {
            console.error("Error creating 'courses' table:", err.message);
        } else {
            console.log("'courses' table is ready.");
        }
    });
};

module.exports = initializeTables;
