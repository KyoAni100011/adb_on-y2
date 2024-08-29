const express = require("express");
const {
  getAllCourses,
  getCourseById,
  addCartItem,
  removeCartItem,
  getAllCategories,
  addCourse,
  getCoursesByLectureId,
  getCourseDetails,
  createLesson,
  createAssignment,
  getAssignmentDetails,
  getLessonDetails,
  createOrder,
  processPayment,
  getPurchasedCourses,
  enrollCourse,
  getCourseDetaByStudent,
  submitAnswer,
  getSubmissionsByCourseAndTeacher,
} = require("../controllers/course.controllers");
const router = express.Router();

router.get("/courses", getAllCourses);
router.get("/courses-by-lecture/:id", getCoursesByLectureId);
router.post("/add-course", addCourse);
router.get("/course-detail/:id", getCourseById);
router.post("/add-course-to-cart", addCartItem);
router.post("/remove-course-to-cart", removeCartItem);
router.get("/categories", getAllCategories);
router.get("/get-course-detail/:id", getCourseDetails);
router.post("/create-lessons", createLesson);
router.post("/create-assignments", createAssignment);
router.get("/assignment/:id", getAssignmentDetails);
router.get("/lesson/:id", getLessonDetails);
router.post("/create-order", createOrder);
router.post("/process-payment", processPayment);
router.get("/purchased-courses/:id", getPurchasedCourses);
router.post("/enroll-course", enrollCourse);
router.get("/course-details-student", getCourseDetaByStudent);
router.post("/submit-answer", submitAnswer);
router.get("/get-submission", getSubmissionsByCourseAndTeacher);

module.exports = router;
