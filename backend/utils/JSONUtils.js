/**
 * Phân tích chuỗi JSON lồng nhau thành đối tượng JavaScript.
 * @param {Object} obj - Đối tượng chứa chuỗi JSON lồng nhau.
 * @returns {Object} - Đối tượng đã phân tích.
 */
const parseNestedObject = (obj) => {
  const parseValue = (value) => {
    try {
      // Nếu giá trị là chuỗi JSON hợp lệ, phân tích nó thành đối tượng
      return JSON.parse(value);
    } catch (e) {
      // Nếu không phải chuỗi JSON hợp lệ, trả lại giá trị gốc
      return value;
    }
  };

  // Hàm giải mã đệ quy cho tất cả các giá trị trong đối tượng
  const recursiveParse = (item) => {
    if (typeof item === "string") {
      // Nếu giá trị là chuỗi JSON, phân tích nó
      const parsedValue = parseValue(item);
      // Nếu phân tích thành đối tượng, tiếp tục giải mã đệ quy
      if (typeof parsedValue === "object" && parsedValue !== null) {
        return recursiveParse(parsedValue);
      }
      return parsedValue;
    }
    if (typeof item === "object" && item !== null) {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          item[key] = recursiveParse(item[key]);
        }
      }
    }
    return item;
  };

  return recursiveParse(obj);
};

module.exports = { parseNestedObject };
