const express = require("express");
const { checkEmail } = require("../controllers/validationController");
const router = express.Router();

router.post("/check-email", checkEmail);

module.exports = router;
