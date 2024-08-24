const express = require("express");
const { getLecturerById } = require("../controllers/lecturer.controllers");
const router = express.Router();

router.get("/lecturer-detail/:id", getLecturerById);

module.exports = router;
