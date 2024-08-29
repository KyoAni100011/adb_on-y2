import axios from "axios";

// Tạo một instance của axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/course", // Địa chỉ URL của backend
  headers: {
    "Content-Type": "application/json",
    // Thêm các header khác nếu cần
  },
});

/**
 * Hàm gọi API để lấy tất cả các khóa học
 * @returns {Promise<Object[]>} - Danh sách các khóa học
 */
export const getAllCourses = async () => {
  try {
    const response = await apiClient.get("/courses");
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error fetching courses: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

/**
 * Hàm gọi API để lấy thông tin chi tiết của một khóa học theo ID
 * @param {string} courseId - ID của khóa học cần lấy thông tin
 * @returns {Promise<Object>} - Thông tin chi tiết của khóa học
 */
export const getCourseById = async (courseId) => {
  try {
    const response = await apiClient.get(`/course-detail/${courseId}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error fetching course by ID ${courseId}: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

/**
 * Hàm gọi API để thêm một mục vào giỏ hàng
 * @param {string} cartId - ID của giỏ hàng
 * @param {string} courseId - ID của khóa học cần thêm vào giỏ hàng
 * @returns {Promise<Object>} - Kết quả thêm mục vào giỏ hàng
 */
export const addCartItem = async (cartId, courseId) => {
  try {
    const response = await apiClient.post("/add-course-to-cart", {
      cartId,
      courseId,
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error adding item to cart: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

/**
 * Hàm gọi API để xóa một mục khỏi giỏ hàng
 * @param {string} cartId - ID của giỏ hàng
 * @param {string} courseId - ID của khóa học cần xóa khỏi giỏ hàng
 * @returns {Promise<Object>} - Kết quả xóa mục khỏi giỏ hàng
 */
export const removeCartItem = async (cartId, courseId) => {
  try {
    const response = await apiClient.post("/remove-course-to-cart", {
      cartId,
      courseId,
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error removing item from cart: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

/**
 * Hàm gọi API để lấy tất cả các danh mục
 * @returns {Promise<Object[]>} - Danh sách các danh mục
 */
export const getAllCategories = async () => {
  try {
    const response = await apiClient.get("/categories");
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error fetching categories: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

/**
 * Hàm gọi API để thêm một khóa học mới
 * @param {Object} courseData - Dữ liệu của khóa học mới
 * @returns {Promise<Object>} - Kết quả thêm khóa học mới
 */
export const addCourse = async (courseData) => {
  try {
    const response = await apiClient.post("/add-course", courseData);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error adding course: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

/**
 * Hàm gọi API để lấy danh sách khóa học dựa trên ID của giảng viên
 * @param {string} lectureId - ID của giảng viên
 * @returns {Promise<Object[]>} - Danh sách các khóa học
 */
export const getCoursesByLectureId = async (lectureId) => {
  try {
    const response = await apiClient.get(`/courses-by-lecture/${lectureId}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error fetching courses by lecture ID ${lectureId}: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

export const getCoursesDetails = async (courseId) => {
  try {
    const response = await apiClient.get(`/get-course-detail/${courseId}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error fetching courses by lecture ID ${courseId}: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

export const createLesson = async (lessonData) => {
  try {
    const response = await apiClient.post("/create-lessons", lessonData);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error creating lesson: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const createAssignment = async (assignmentData) => {
  try {
    const response = await apiClient.post(
      "/create-assignments",
      assignmentData
    );
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error creating assignment: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const getAssignmentDetails = async (id) => {
  try {
    const response = await apiClient.get(`/assignment/${id}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error retrieving assignment details: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const getLessonDetails = async (id) => {
  try {
    const response = await apiClient.get(`/lesson/${id}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error retrieving lesson details: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const createOrder = async (userId, cartId) => {
  try {
    const response = await apiClient.post("/create-order", {
      userId,
      cartId,
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error creating order: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const processPayment = async (userId, paymentMethod) => {
  try {
    const response = await apiClient.post("/process-payment", {
      userId,
      paymentMethod,
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error processing payment: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const getPurchasedCourses = async (userId) => {
  try {
    // Gửi yêu cầu GET đến API với userId
    const response = await apiClient.get(`/purchased-courses/${userId}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error retrieving purchased courses: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const enrollCourse = async (courseId, studentId) => {
  try {
    // Gửi yêu cầu POST đến API với courseId và studentId
    const response = await apiClient.post(`/enroll-course`, {
      courseId,
      studentId,
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error enrolling in course: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const getCourseDetailsByStudent = async (courseId, studentId) => {
  try {
    // Send a GET request to the API with courseId and studentId as query parameters
    const response = await apiClient.get(`/course-details-student`, {
      params: {
        courseId,
        studentId,
      },
    });
    return response.data; // Return the data received from the API
  } catch (error) {
    throw new Error(
      `Error retrieving course details: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const submitAnswer = async (
  assignmentId,
  studentId,
  text,
  score = 0,
  feedback = null,
  status = "Pending"
) => {
  try {
    // Gửi yêu cầu POST đến API với assignmentId, studentId, score, feedback, và status
    const response = await apiClient.post("/submit-answer", {
      AssignmentId: assignmentId,
      StudentId: studentId,
      Text: text,
      Score: score,
      Feedback: feedback,
      Status: status,
    });

    // Xử lý dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    throw new Error(
      `Error submitting answer: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

export const getSubmission = async (CourseId, TeacherId) => {
  try {
    // Gửi yêu cầu POST đến API với assignmentId, studentId, score, feedback, và status
    const response = await apiClient.get("/get-submission", {
      params: {
        CourseId,
        TeacherId,
      },
    });

    // Xử lý dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    throw new Error(
      `Error get submission: ${
        error.response ? error.response.data.Message : error.message
      }`
    );
  }
};

// Export các hàm gọi API khác nếu cần
export default {
  getAllCourses,
  getCourseById,
  addCartItem,
  removeCartItem,
  getAllCategories,
  addCourse,
  getCoursesByLectureId,
  submitAnswer,
  getSubmission,
  // Thêm các hàm khác nếu cần
};
