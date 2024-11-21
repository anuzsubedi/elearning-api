const db = require("../config/db");

exports.checkEmail = (req, res) => {
    const { email } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error checking email:", err.message);
            return res.status(500).json({ message: "Server error" });
        }
        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(200).json({ message: "Email is available" });
    });
};
