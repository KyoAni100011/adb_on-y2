const { parseNestedObject } = require("../utils/JSONUtils");
const { executeProcedure } = require("../config/db.config");
const sql = require("mssql");

const getAllCourses = async (req, res) => {
  try {
    const result = await executeProcedure("GetAllCourses");
    const resParse = parseNestedObject(result);
    return res.status(201).json({ courses: resParse });
  } catch (error) {
    console.error("Error occurred during getting courses:", error);
    return res.status(500).json({
      Message: "Error occurred during getting courses.",
      error: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await executeProcedure("GetCourseById", [
      { name: "CourseId", type: sql.UniqueIdentifier, value: id },
    ]);

    if (!result.length) {
      throw new Error("Course not found");
    }

    const resParse = parseNestedObject(result[0]);

    res.status(201).json({ course: resParse });
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res
      .status(500)
      .json({ Message: "Error occurred while fetching course details" });
  }
};

const addCartItem = async (req, res) => {
  const { cartId, courseId } = req.body;

  try {
    const result = await executeProcedure("AddCartItem", [
      { name: "CartId", type: sql.UniqueIdentifier, value: cartId },
      { name: "CourseId", type: sql.UniqueIdentifier, value: courseId },
    ]);

    const message = result[0]?.Message || "No message returned";

    return res.status(201).json({ Message: message });
  } catch (error) {
    console.error("Error occurred during adding cart item:", error);
    return res.status(500).json({
      Message: "Error occurred while adding cart item.",
      error: error.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  const { cartId, courseId } = req.body;

  try {
    const result = await executeProcedure("RemoveCartItem", [
      { name: "CartId", type: sql.UniqueIdentifier, value: cartId },
      { name: "CourseId", type: sql.UniqueIdentifier, value: courseId },
    ]);

    const message = result[0]?.Message || "No message returned";
    const errorCode = result[0]?.ErrorCode || 0;

    if (errorCode === 0) {
      return res.status(200).json({ Message: message });
    } else {
      return res.status(400).json({
        Message: message,
        ErrorDetail: result[0]?.ErrorDetail || "No error details returned",
        Severity: result[0]?.Severity,
        State: result[0]?.State,
      });
    }
  } catch (error) {
    console.error("Error occurred during removing cart item:", error);
    return res.status(500).json({
      Message: "Error occurred while removing cart item.",
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const result = await executeProcedure("GetAllCategories");
    const resParse = parseNestedObject(result);
    return res.status(200).json({ categories: resParse });
  } catch (error) {
    console.error("Error occurred during getting categories:", error);
    return res.status(500).json({
      Message: "Error occurred during getting categories.",
      error: error.message,
    });
  }
};

const addCourse = async (req, res) => {
  const {
    Title,
    LectureId,
    Description,
    Level,
    Language,
    Price,
    CourseImageName,
    CourseImageURL,
    CourseVideoName,
    CourseVideoURL,
    Subtitle,
    Status = "Inactive",
    CategoryId,
    DiscountId = null,
  } = req.body;

  try {
    const result = await executeProcedure("AddCourse", [
      { name: "Title", type: sql.NVarChar, value: Title },
      { name: "LectureId", type: sql.UniqueIdentifier, value: LectureId },
      { name: "Description", type: sql.NVarChar, value: Description },
      { name: "Level", type: sql.NVarChar, value: Level },
      { name: "Language", type: sql.NVarChar, value: Language },
      { name: "Price", type: sql.BigInt, value: Price },
      { name: "CourseImageName", type: sql.NVarChar, value: CourseImageName },
      { name: "CourseImageURL", type: sql.NVarChar, value: CourseImageURL },
      { name: "CourseVideoName", type: sql.NVarChar, value: CourseVideoName },
      { name: "CourseVideoURL", type: sql.NVarChar, value: CourseVideoURL },
      { name: "Subtitle", type: sql.NVarChar, value: Subtitle },
      { name: "Status", type: sql.NVarChar, value: Status },
      { name: "CategoryId", type: sql.UniqueIdentifier, value: CategoryId },
      { name: "DiscountId", type: sql.UniqueIdentifier, value: DiscountId },
    ]);

    // Đọc thông điệp và dữ liệu khóa học từ kết quả
    const message = result[0]?.Message || "No message returned";
    const course = result[0]?.Course || null;

    // Xử lý thành công hoặc lỗi
    if (message === "Course added successfully") {
      return res
        .status(201)
        .json({ Message: message, Course: JSON.parse(course) });
    } else {
      return res.status(400).json({
        Message: message,
        ErrorDetail: result[0]?.ErrorDetail || "",
      });
    }
  } catch (error) {
    console.error("Error occurred during adding course:", error);
    return res.status(500).json({
      Message: "Error occurred while adding course.",
      error: error.message,
    });
  }
};

const getCoursesByLectureId = async (req, res) => {
  const { id } = req.params;
  try {
    // Thực thi stored procedure với lectureId
    const result = await executeProcedure("GetCoursesByLectureId", [
      { name: "LectureId", type: sql.UniqueIdentifier, value: id },
    ]);

    // Xử lý thành công hoặc lỗi

    return res.status(200).json({ Courses: result || [] });
  } catch (error) {
    console.error("Error occurred during retrieving courses:", error);
    return res.status(500).json({
      Message: "Error occurred while retrieving courses.",
      ErrorDetail: error.message,
    });
  }
};

const getCourseDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // Execute stored procedure with CourseId
    const result = await executeProcedure("GetCourseDetails", [
      { name: "CourseId", type: sql.UniqueIdentifier, value: id },
    ]);

    // Handle successful retrieval or return an empty object if no result
    return res
      .status(200)
      .json({ CourseDetails: parseNestedObject(result)[0] || {} });
  } catch (error) {
    console.error("Error occurred during retrieving course details:", error);
    return res.status(500).json({
      Message: "Error occurred while retrieving course details.",
      ErrorDetail: error.message,
    });
  }
};

const createLesson = async (req, res) => {
  const {
    courseId,
    title,
    description,
    imageName,
    imageURL,
    videoName,
    videoURL,
    startTime,
    endTime,
  } = req.body;

  try {
    // Thực thi thủ tục lưu trữ CreateLesson
    const result = await executeProcedure("CreateLesson", [
      { name: "CourseId", type: sql.UniqueIdentifier, value: courseId },
      { name: "Title", type: sql.NVarChar, value: title },
      { name: "Description", type: sql.NVarChar, value: description },
      { name: "ImageName", type: sql.NVarChar, value: imageName },
      { name: "ImageURL", type: sql.NVarChar, value: imageURL },
      { name: "VideoName", type: sql.NVarChar, value: videoName },
      { name: "VideoURL", type: sql.NVarChar, value: videoURL },
      { name: "StartTime", type: sql.DateTime, value: startTime },
      { name: "EndTime", type: sql.DateTime, value: endTime },
    ]);

    // Trả về thông báo thành công
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error occurred while creating the lesson:", error);
    return res.status(500).json({
      Message: "Error occurred while creating the lesson.",
      ErrorDetail: error.message,
    });
  }
};

const createAssignment = async (req, res) => {
  const {
    courseId,
    title,
    description,
    imageName,
    imageURL,
    videoName,
    videoURL,
    text,
    submissionDeadline,
  } = req.body;
  try {
    // Thực thi thủ tục lưu trữ CreateAssignment
    const result = await executeProcedure("CreateAssignment", [
      { name: "CourseId", type: sql.UniqueIdentifier, value: courseId },
      { name: "Title", type: sql.NVarChar, value: title },
      { name: "Description", type: sql.NVarChar, value: description },
      { name: "ImageName", type: sql.NVarChar, value: imageName },
      { name: "ImageURL", type: sql.NVarChar, value: imageURL },
      { name: "VideoName", type: sql.NVarChar, value: videoName },
      { name: "VideoURL", type: sql.NVarChar, value: videoURL },
      { name: "Text", type: sql.NVarChar, value: text },
      {
        name: "SubmissionDeadline",
        type: sql.DateTime,
        value: submissionDeadline,
      },
    ]);
    // Trả về thông báo thành công
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error occurred while creating the assignment:", error);
    return res.status(500).json({
      Message: "Error occurred while creating the assignment.",
      ErrorDetail: error.message,
    });
  }
};

const getAssignmentDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // Thực hiện stored procedure với CourseId và AssignmentId
    const result = await executeProcedure("GetAssignmentById", [
      { name: "AssignmentId", type: sql.UniqueIdentifier, value: id },
    ]);

    // Trả về kết quả hoặc một object rỗng nếu không có dữ liệu
    return res
      .status(200)
      .json({ AssignmentDetails: parseNestedObject(result)[0] || {} });
  } catch (error) {
    console.error(
      "Error occurred during retrieving assignment details:",
      error
    );
    return res.status(500).json({
      Message: "Error occurred while retrieving assignment details.",
      ErrorDetail: error.message,
    });
  }
};

const getLessonDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // Thực hiện stored procedure với CourseId và LessonId
    const result = await executeProcedure("GetLessonById", [
      { name: "LessonId", type: sql.UniqueIdentifier, value: id },
    ]);

    // Trả về kết quả hoặc một object rỗng nếu không có dữ liệu
    return res
      .status(200)
      .json({ LessonDetails: parseNestedObject(result)[0] || {} });
  } catch (error) {
    console.error("Error occurred during retrieving lesson details:", error);
    return res.status(500).json({
      Message: "Error occurred while retrieving lesson details.",
      ErrorDetail: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  const { userId, cartId } = req.body;

  if (!userId || !cartId) {
    return res.status(400).json({ Message: "UserId and CartId are required." });
  }

  try {
    // Thực hiện stored procedure với UserId và CartId
    const result = await executeProcedure("CreateOrder", [
      { name: "UserId", type: sql.UniqueIdentifier, value: userId },
      { name: "CartId", type: sql.UniqueIdentifier, value: cartId },
    ]);

    // Trả về kết quả hoặc một object rỗng nếu không có dữ liệu
    return res.status(200).json({ OrderStatus: result[0] || {} });
  } catch (error) {
    console.error("Error occurred during order creation:", error);
    return res.status(500).json({
      Message: "Error occurred while creating the order.",
      ErrorDetail: error.message,
    });
  }
};

const processPayment = async (req, res) => {
  const { userId, paymentMethod } = req.body;

  if (!userId || !paymentMethod) {
    return res
      .status(400)
      .json({ Message: "UserId and PaymentMethod are required." });
  }

  try {
    // Thực hiện stored procedure với UserId và PaymentMethod
    const result = await executeProcedure("ProcessPayment", [
      { name: "UserId", type: sql.UniqueIdentifier, value: userId },
      { name: "PaymentMethod", type: sql.NVarChar, value: paymentMethod },
    ]);

    console.log(result);

    // Trả về kết quả hoặc một object rỗng nếu không có dữ liệu
    return res.status(200).json(parseNestedObject(result[0]));
  } catch (error) {
    console.error("Error occurred during payment processing:", error);
    return res.status(500).json({
      Message: "Error occurred while processing the payment.",
      ErrorDetail: error.message,
    });
  }
};

const getPurchasedCourses = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ Message: "UserId is required." });
  }

  try {
    // Thực hiện stored procedure với UserId
    const result = await executeProcedure("GetPurchasedCourses", [
      { name: "UserId", type: sql.UniqueIdentifier, value: id },
    ]);

    // Trả về kết quả hoặc một object rỗng nếu không có dữ liệu
    const courses = result || [];
    return res.status(200).json({
      Message: "Courses retrieved successfully",
      Coures: courses,
    });
  } catch (error) {
    console.error("Error occurred while retrieving purchased courses:", error);
    return res.status(500).json({
      Message: "Error occurred while retrieving purchased courses.",
      ErrorDetail: error.message,
    });
  }
};

const enrollCourse = async (req, res) => {
  const { courseId, studentId } = req.body;

  // Kiểm tra nếu thiếu dữ liệu đầu vào
  if (!courseId || !studentId) {
    return res
      .status(400)
      .json({ Message: "CourseId and StudentId are required." });
  }

  try {
    // Thực hiện stored procedure với CourseId và StudentId
    const result = await executeProcedure("EnrollCourse", [
      { name: "CourseId", type: sql.UniqueIdentifier, value: courseId },
      { name: "StudentId", type: sql.UniqueIdentifier, value: studentId },
    ]);

    // Trả về kết quả từ stored procedure hoặc thông báo lỗi nếu có
    const message = result[0]?.Message || "Unknown error occurred";
    const errorDetail = result[0]?.ErrorDetail || null;

    // Nếu có chi tiết lỗi, trả về với mã trạng thái 400
    if (errorDetail) {
      return res.status(400).json({
        Message: message,
        ErrorDetail: errorDetail,
      });
    }

    // Nếu không có lỗi, trả về thông báo thành công
    return res.status(200).json({
      Message: message,
    });
  } catch (error) {
    console.error("Error occurred during enrollment:", error);
    return res.status(500).json({
      Message: "Error occurred during enrollment.",
      ErrorDetail: error.message,
    });
  }
};

const getCourseDetaByStudent = async (req, res) => {
  const { courseId, studentId } = req.query;

  try {
    // Execute stored procedure with CourseId and StudentId
    const result = await executeProcedure("GetCourseDetailsByStudentId", [
      { name: "CourseId", type: sql.UniqueIdentifier, value: courseId },
      { name: "StudentId", type: sql.UniqueIdentifier, value: studentId },
    ]);

    // Check if the result contains a message indicating the student is not enrolled
    if (result[0].Message === "Student is not enrolled in this course") {
      return res
        .status(403)
        .json({ Message: "Student is not enrolled in this course." });
    }

    // Handle successful retrieval or return an empty object if no result
    const courseDetails = result[0] || {}; // Parse result if needed
    return res
      .status(200)
      .json({ CourseDetails: parseNestedObject(courseDetails) });
  } catch (error) {
    console.error("Error occurred during retrieving course details:", error);
    return res.status(500).json({
      Message: "Error occurred while retrieving course details.",
      ErrorDetail: error.message,
    });
  }
};

const submitAnswer = async (req, res) => {
  const { AssignmentId, StudentId, Text, Score, Feedback, Status } = req.body;
  if (!AssignmentId || !StudentId) {
    return res
      .status(400)
      .json({ Message: "AssignmentId and StudentId are required" });
  }

  try {
    // Execute stored procedure with provided parameters
    const result = await executeProcedure("SubmitAnswer", [
      { name: "AssignmentId", type: sql.UniqueIdentifier, value: AssignmentId },
      { name: "StudentId", type: sql.UniqueIdentifier, value: StudentId },
      { name: "Text", type: sql.NVarChar(2000), value: Text },
      { name: "Score", type: sql.BigInt, value: Score || 0 },
      { name: "Feedback", type: sql.NVarChar(2000), value: Feedback || null },
      { name: "Status", type: sql.NVarChar(50), value: Status || "Pending" },
    ]);

    // Handle successful submission
    return res.status(200).json({ Message: "Answer submitted successfully" });
  } catch (error) {
    console.error("Error occurred during submission:", error);
    return res.status(500).json({
      Message: "Error occurred while submitting the answer.",
      ErrorDetail: error.message,
    });
  }
};

const getSubmissionsByCourseAndTeacher = async (req, res) => {
  const { CourseId, TeacherId } = req.query;
  if (!CourseId || !TeacherId) {
    return res
      .status(400)
      .json({ Message: "CourseId and TeacherId are required" });
  }

  try {
    // Execute stored procedure with provided parameters
    const result = await executeProcedure("GetSubmissionsByCourseAndTeacher", [
      { name: "AssignmentId", type: sql.UniqueIdentifier, value: CourseId },
      { name: "TeacherId", type: sql.UniqueIdentifier, value: TeacherId },
    ]);

    console.log(result);

    // Check if there is a message indicating an error
    if (result[0].Message) {
      return res.status(403).json({ Message: result[0].Message });
    }

    // Handle successful retrieval
    return res.status(200).json({ Submissions: result });
  } catch (error) {
    console.error("Error occurred while retrieving submissions:", error);
    return res.status(500).json({
      Message: "Error occurred while retrieving submissions.",
      ErrorDetail: error.message,
    });
  }
};

module.exports = {
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
  getLessonDetails,
  getAssignmentDetails,
  createOrder,
  processPayment,
  getPurchasedCourses,
  enrollCourse,
  getCourseDetaByStudent,
  submitAnswer,
  getSubmissionsByCourseAndTeacher,
};
