const express = require('express');
const { createCourse, getAllCourses, getCoursesByUser, deleteCourse } = require('../controllers/courseController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new course (authenticated)
router.post('/', verifyToken, createCourse);

// Get all courses
router.get('/', getAllCourses);

// Get courses by the logged-in user (authenticated)
router.get('/my-courses', verifyToken, getCoursesByUser);

// Delete a course (authenticated)
router.delete('/:course_id', verifyToken, deleteCourse);

module.exports = router;
