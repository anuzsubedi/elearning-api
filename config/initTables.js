const { createUsersTable } = require('../models/userModel');
const { createCoursesTable } = require('../models/courseModel');
const { createImagesTable } = require('../models/imageModel');
const { createChaptersTable } = require('../models/chaptersModel');

const initializeTables = () => {
    createUsersTable((err) => {
        if (err) console.error("Error creating 'users' table:", err.message);
        else console.log("'users' table is ready.");
    });

    createImagesTable((err) => {
        if (err) console.error("Error creating 'images' table:", err.message);
        else console.log("'images' table is ready.");
    });

    createCoursesTable((err) => {
        if (err) console.error("Error creating 'courses' table:", err.message);
        else console.log("'courses' table is ready.");
    });

    createChaptersTable((err) => {
        if (err) console.error("Error creating 'chapters' table:", err.message);
        else console.log("'chapters' table is ready.");
    });
};

module.exports = initializeTables;
