const bcrypt = require("bcryptjs");

/**
 * Hàm băm mật khẩu
 * @param {string} password - Mật khẩu cần băm
 * @returns {Promise<string>} - Mật khẩu đã được băm
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

/**
 * Hàm so sánh mật khẩu
 * @param {string} inputPassword - Mật khẩu người dùng nhập vào
 * @param {string} storedPassword - Mật khẩu đã được băm và lưu trữ
 * @returns {Promise<boolean>} - Kết quả so sánh, true nếu khớp, false nếu không khớp
 */
const comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
