const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginUser,
  registerLecturer,
} = require("../controllers/user.controllers");

router.post("/students/register", registerStudent);
router.post("/lecturers/register", registerLecturer);
router.post("/login", loginUser);

module.exports = router;
