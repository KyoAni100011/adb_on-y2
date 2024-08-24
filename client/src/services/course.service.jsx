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
 * Hàm gọi API để thêm một mục vào giỏ hàng
 * @param {string} cartId - ID của giỏ hàng
 * @param {string} courseId - ID của khóa học cần xóa vào giỏ hàng
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
      `Error adding item to cart: ${
        error.response ? error.response.data.message : error.message
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
  // Thêm các hàm khác nếu cần
};
