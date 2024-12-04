const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const chaptersController = require('../controllers/chaptersController');

const router = express.Router();

// Routes for chapters
router.post('/', verifyToken, chaptersController.createChapter); // Create a new chapter
router.get('/course/:course_id', verifyToken, chaptersController.getChaptersByCourse); // Get chapters for a course
router.get('/:chapter_id', verifyToken, chaptersController.getChapterById); // Get a specific chapter
router.put('/:chapter_id', verifyToken, chaptersController.updateChapter); // Update a chapter
router.delete('/:chapter_id', verifyToken, chaptersController.deleteChapter); // Delete a chapter

module.exports = router;
