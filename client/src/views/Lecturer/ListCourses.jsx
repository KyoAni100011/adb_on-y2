import React, { useEffect, useState } from "react";
import { Table, Typography, Button, Space, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getCoursesByLectureId } from "../../services/course.service";
import { readItem } from "../../utils/localStorage";
import { Link } from "react-router-dom";

const { Title } = Typography;

const LecturerCoursesTable = ({ lectureId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesByLectureId(readItem("User").UserId);
        setCourses(data.Courses || []);
      } catch (error) {
        message.error("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [lectureId]);

  const columns = [
    {
      title: "Course Title",
      dataIndex: "Title",
      key: "title",
      render: (text) => (
        <span style={{ color: "#1890ff", fontWeight: "600" }}>{text}</span>
      ),
    },
    {
      title: "Language",
      dataIndex: "Language",
      key: "language",
      render: (text) => <span style={{ color: "#333" }}>{text}</span>,
    },
    {
      title: "Level",
      dataIndex: "Level",
      key: "level",
      render: (text) => <span style={{ color: "#333" }}>{text}</span>,
    },
    {
      title: "Price (VND)",
      dataIndex: "Price",
      key: "price",
      render: (price) => (
        <span style={{ color: "#333" }}>
          {parseInt(price).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color:
              status === "Active"
                ? "#52c41a"
                : status === "Inactive"
                ? "#f5222d"
                : "#faad14",
            fontWeight: "600",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Rating",
      dataIndex: "Rating",
      key: "rating",
      render: (rating) => (
        <span style={{ color: "#faad14", fontWeight: "600" }}>
          {rating.toFixed(1)}
        </span>
      ),
    },
    {
      title: "Number of Students",
      dataIndex: "NumberStudentsRegister",
      key: "numberStudentsRegister",
      render: (number) => (
        <span style={{ color: "#333" }}>
          {parseInt(number).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            type="primary"
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              color: "#fff",
            }}
          >
            <Link
              to={`/lecturer/course-detail/${record.CourseId}`}
              style={{ color: "#fff" }}
            >
              View Detail
            </Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "40px auto",
        padding: "24px",
        background: "#f5f5f5",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: "40px", color: "#1890ff" }}
      >
        Lecturer's Courses
      </Title>
      <Table
        dataSource={courses}
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        loading={loading}
        rowKey="CourseId"
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
      />
    </div>
  );
};

export default LecturerCoursesTable;
