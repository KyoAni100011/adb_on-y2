/**
 * Lưu một đối tượng vào Local Storage
 * @param {string} key - Tên khóa để lưu trữ dữ liệu
 * @param {Object} value - Đối tượng dữ liệu cần lưu trữ
 */
const createItem = (key, value) => {
  if (typeof value !== "object" || value === null) {
    throw new Error("Value must be a non-null object");
  }
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Đọc một đối tượng từ Local Storage
 * @param {string} key - Tên khóa để đọc dữ liệu
 * @returns {Object|null} - Đối tượng dữ liệu nếu có, hoặc null nếu không tìm thấy
 */
const readItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

/**
 * Cập nhật một đối tượng trong Local Storage
 * @param {string} key - Tên khóa để cập nhật dữ liệu
 * @param {Object} newValue - Đối tượng dữ liệu mới
 */
const updateItem = (key, newValue) => {
  if (typeof newValue !== "object" || newValue === null) {
    throw new Error("New value must be a non-null object");
  }
  localStorage.setItem(key, JSON.stringify(newValue));
};

/**
 * Xóa một đối tượng khỏi Local Storage
 * @param {string} key - Tên khóa để xóa dữ liệu
 */
const deleteItem = (key) => {
  localStorage.removeItem(key);
};

// Xuất các hàm
export { createItem, readItem, updateItem, deleteItem };
