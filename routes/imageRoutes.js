const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const imageController = require('../controllers/imageController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary directory for uploads

router.post('/upload', verifyToken, upload.single('image'), imageController.uploadImage); // Upload an image

module.exports = router;
