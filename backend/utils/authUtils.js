const jwt = require("jsonwebtoken");

// Mã bí mật cho JWT (Nên lưu trong biến môi trường)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Tạo một JWT token cho người dùng
 * @param {Object} payload - Dữ liệu người dùng hoặc các thông tin khác cần lưu trong token
 * @param {string} [expiresIn='1h'] - Thời gian hết hạn của token (vd: '1h', '30m', '7d')
 * @returns {string} - JWT token
 */
const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Xác thực JWT token
 * @param {string} token - JWT token cần xác thực
 * @returns {Object} - Thông tin người dùng sau khi xác thực
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
