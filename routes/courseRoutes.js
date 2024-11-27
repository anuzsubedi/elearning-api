const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post('/create', verifyToken, courseController.createCourse); // Create a course
router.get('/all', courseController.getAllCourses); // Get all courses
router.get('/my-courses', verifyToken, courseController.getCoursesByUser); // Get courses by the current user
router.delete('/:course_id', verifyToken, courseController.deleteCourse); // Delete a course

module.exports = router;
