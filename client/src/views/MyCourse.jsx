import React, { useState } from "react";
import {
  Table,
  Typography,
  Button,
  Tag,
  Modal,
  Space,
  Avatar,
  Popover,
  Descriptions,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const MyCourses = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const dataSource = [
    {
      key: "1",
      name: "Introduction to Programming",
      instructor: "John Doe",
      status: "Available",
      category: "Programming",
      description: "Learn the basics of programming.",
      image: "https://via.placeholder.com/100", // Larger placeholder image
    },
    {
      key: "2",
      name: "Advanced Data Analysis",
      instructor: "Jane Smith",
      status: "Enrolled",
      category: "Data Science",
      description: "Dive deep into data analysis techniques.",
      image: "https://via.placeholder.com/100", // Larger placeholder image
    },
    // Add more course data here
  ];

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Avatar
          src={image}
          shape="square"
          size={100} // Adjust size to make it square
          style={{ border: "1px solid #ddd" }} // Add border for a grid effect
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Giảng viên",
      dataIndex: "instructor",
      key: "instructor",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Enrolled" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <Popover
          content={<Paragraph>{description}</Paragraph>}
          title="Course Description"
        >
          <Button type="link" icon={<InfoCircleOutlined />}>
            More Info
          </Button>
        </Popover>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            disabled={record.status === "Enrolled"}
            onClick={() => handleEnroll(record.key)}
          >
            Enroll
          </Button>
        </Space>
      ),
    },
  ];

  const handleEnroll = (key) => {
    console.log(`Enrolled in course with key: ${key}`);
    // Add functionality to enroll in the course
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Title level={2}>My Courses</Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={false} // Disable pagination for simplicity
        bordered // Add borders to the table
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} // Add background and shadow
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
              {selectedCourse.name}
            </Descriptions.Item>
            <Descriptions.Item label="Instructor">
              {selectedCourse.instructor}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {selectedCourse.category}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedCourse.description}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={selectedCourse.status === "Enrolled" ? "green" : "blue"}
              >
                {selectedCourse.status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default MyCourses;
