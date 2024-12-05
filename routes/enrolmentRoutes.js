const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const enrollmentController = require('../controllers/enrollmentController');

const router = express.Router();

// Routes for enrollments
router.post('/', verifyToken, enrollmentController.enrollUser); // Enroll a user in a course
router.get('/all', verifyToken, enrollmentController.getAllEnrollments); // Get all enrollments
router.get('/user', verifyToken, enrollmentController.getEnrollmentsByUser); // Get enrollments by user
router.get('/course/:course_id', verifyToken, enrollmentController.getEnrollmentsByCourse); // Get enrollments by course
router.delete('/:enrollment_id', verifyToken, enrollmentController.deleteEnrollment); // Delete an enrollment

module.exports = router;