const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const studentCourseController = require('../controllers/studentCourseController');

const router = express.Router();

router.get('/:user_id', verifyToken, studentCourseController.getCoursesByStudentId); // Get courses by student ID

module.exports = router;