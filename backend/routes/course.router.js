const express = require("express");
const {
  getAllCourses,
  getCourseById,
  addCartItem,
  removeCartItem,
} = require("../controllers/course.controllers");
const router = express.Router();

router.get("/courses", getAllCourses);
router.get("/course-detail/:id", getCourseById);
router.post("/add-course-to-cart", addCartItem);
router.post("/remove-course-to-cart", removeCartItem);

module.exports = router;
