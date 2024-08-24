import axios from "axios";

// Tạo một instance của axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/lecturer", // Địa chỉ URL của backend
  headers: {
    "Content-Type": "application/json",
    // Thêm các header khác nếu cần
  },
});

/**
 * Hàm gọi API để lấy thông tin chi tiết của một giảng viên theo ID
 * @param {string} userId - ID của giảng viên cần lấy thông tin
 * @returns {Promise<Object>} - Thông tin chi tiết của giảng viên
 */
const getLecturerById = async (userId) => {
  try {
    const response = await apiClient.get(`/lecturer-detail/${userId}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error fetching lecturer by ID ${userId}: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

module.exports = { getLecturerById };
