const chaptersModel = require('../models/chaptersModel');

// Create a new chapter
exports.createChapter = (req, res) => {
    const { course_id, chapter_title, chapter_content, order_number } = req.body;

    if (!course_id || !chapter_title || !order_number) {
        return res.status(400).json({ message: "Required fields are missing." });
    }

    const chapterData = [course_id, chapter_title, chapter_content || '', order_number];

    chaptersModel.createChapter(chapterData, (err, result) => {
        if (err) {
            console.error("Error creating chapter:", err.message || err);
            return res.status(500).json({ message: "Failed to create chapter." });
        }
        res.status(201).json({ message: "Chapter created successfully!", chapter_id: result.insertId });
    });
};

// Get all chapters for a course
exports.getChaptersByCourse = (req, res) => {
    const { course_id } = req.params;

    if (!course_id) {
        return res.status(400).json({ message: "Course ID is required." });
    }

    chaptersModel.getChaptersByCourse(course_id, (err, results) => {
        if (err) {
            console.error("Error fetching chapters:", err.message || err);
            return res.status(500).json({ message: "Failed to fetch chapters." });
        }
        res.status(200).json({ chapters: results });
    });
};

// Get a single chapter
exports.getChapterById = (req, res) => {
    const { chapter_id } = req.params;

    chaptersModel.getChapterById(chapter_id, (err, result) => {
        if (err) {
            console.error("Error fetching chapter:", err.message || err);
            return res.status(500).json({ message: "Failed to fetch chapter." });
        }
        if (!result.length) {
            return res.status(404).json({ message: "Chapter not found." });
        }
        res.status(200).json(result[0]);
    });
};

// Update a chapter
exports.updateChapter = (req, res) => {
    const { chapter_id } = req.params;
    const { chapter_title, chapter_content, order_number } = req.body;

    if (!chapter_title || !order_number) {
        return res.status(400).json({ message: "Required fields are missing." });
    }

    const chapterData = [chapter_title, chapter_content || '', order_number];

    chaptersModel.updateChapter(chapter_id, chapterData, (err, result) => {
        if (err) {
            console.error("Error updating chapter:", err.message || err);
            return res.status(500).json({ message: "Failed to update chapter." });
        }
        res.status(200).json({ message: "Chapter updated successfully!" });
    });
};

// Delete a chapter
exports.deleteChapter = (req, res) => {
    const { chapter_id } = req.params;

    chaptersModel.deleteChapter(chapter_id, (err) => {
        if (err) {
            console.error("Error deleting chapter:", err.message || err);
            return res.status(500).json({ message: "Failed to delete chapter." });
        }
        res.status(200).json({ message: "Chapter deleted successfully!" });
    });
};
