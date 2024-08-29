import React, { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Button,
  Tag,
  Modal,
  Space,
  Popover,
  Descriptions,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getPurchasedCourses, enrollCourse } from "../services/course.service";
import { readItem } from "../utils/localStorage";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const MyCourses = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = readItem("User");
        const data = await getPurchasedCourses(user.UserId);
        setCourses(data.Coures); // Giả định API trả về { Courses: [...] }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const user = readItem("User");
      await enrollCourse(courseId, user.UserId);
      // Refetch courses to update the list
      const data = await getPurchasedCourses(user.UserId);
      console.log(data);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "Title",
      key: "Title",
      render: (text, record) => (
        <Link to={`/my-course/${record.CourseId}`}>
          <Text strong>{text}</Text>
        </Link>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
      render: (Description) => (
        <Popover
          content={<Paragraph>{Description}</Paragraph>}
          title="Course Description"
        >
          <Button type="link" icon={<InfoCircleOutlined />}>
            More Info
          </Button>
        </Popover>
      ),
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "Language",
      key: "Language",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Cấp độ",
      dataIndex: "Level",
      key: "Level",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Đánh giá",
      dataIndex: "Rating",
      key: "Rating",
      render: (rating) => <Text>{rating} ⭐</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "Status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Trạng thái Đăng ký",
      dataIndex: "EnrollmentStatus",
      key: "EnrollmentStatus",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.EnrollmentStatus === "Not Enrolled" ? (
            <Button
              type="primary"
              onClick={() => handleEnroll(record.CourseId)}
            >
              Enroll
            </Button>
          ) : (
            <Button type="default" disabled>
              Already Enrolled
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Title level={2}>My Courses</Title>
      <Table
        dataSource={courses} // Cập nhật dataSource với dữ liệu từ API
        columns={columns}
        rowKey="CourseId" // Sử dụng CourseId làm key cho hàng
        pagination={false}
        bordered
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      />

      <Modal
        title="Course Details"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {selectedCourse && (
          <Descriptions bordered>
            <Descriptions.Item label="Name">
              {selectedCourse.Title}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedCourse.Description}
            </Descriptions.Item>
            <Descriptions.Item label="Language">
              {selectedCourse.Language}
            </Descriptions.Item>
            <Descriptions.Item label="Level">
              {selectedCourse.Level}
            </Descriptions.Item>
            <Descriptions.Item label="Rating">
              {selectedCourse.Rating} ⭐
            </Descriptions.Item>
            <Descriptions.Item label="Subtitle">
              {selectedCourse.Subtitle}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={selectedCourse.Status === "Active" ? "green" : "blue"}
              >
                {selectedCourse.Status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Enrollment Status">
              <Tag
                color={
                  selectedCourse.EnrollmentStatus === "Completed"
                    ? "green"
                    : "orange"
                }
              >
                {selectedCourse.EnrollmentStatus}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Enrollment Date">
              {selectedCourse.EnrollmentDate === "N/A"
                ? "N/A"
                : new Date(selectedCourse.EnrollmentDate).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default MyCourses;
