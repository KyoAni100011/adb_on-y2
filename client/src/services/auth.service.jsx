import axios from "axios";

// Tạo một instance của axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/user", // Địa chỉ URL của backend
  headers: {
    "Content-Type": "application/json",
    // Thêm các header khác nếu cần
  },
});

// Hàm gọi API để đăng ký người dùng
export const registerStudent = async (studentData) => {
  try {
    const response = await apiClient.post("/students/register", studentData);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error registering student: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

// Hàm gọi API để đăng ký giảng viên
export const registerLecturer = async (lecturerData) => {
  try {
    const response = await apiClient.post("/lecturers/register", lecturerData);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error registering lecturer: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

// Hàm gọi API để đăng nhập người dùng
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    throw new Error(
      `Error logging in user: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  }
};

// Export các hàm gọi API khác ở đây

export default {
  registerStudent,
  registerLecturer, // Thêm hàm gọi API cho giảng viên vào đây
  loginUser,
  // Thêm các hàm khác nếu cần
};
