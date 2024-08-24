const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { Database } = require("./config/db.config");
const userRoutes = require("./routes/user.router");
const courseRoutes = require("./routes/course.router");
const lectureRoutes = require("./routes/lecturer.router");

dotenv.config();

// Cấu hình CORS cho tất cả các route
app.use(
  cors({
    origin: "*", // Cho phép tất cả các nguồn. Thay đổi theo yêu cầu bảo mật của bạn.
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
  })
);

// Đảm bảo kết nối cơ sở dữ liệu được thiết lập khi server khởi động
(async () => {
  try {
    await Database.getInstance(); // Tạo kết nối cơ sở dữ liệu
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
})();

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/lecturer", lectureRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
