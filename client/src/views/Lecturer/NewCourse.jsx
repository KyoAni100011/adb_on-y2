import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Col,
  Row,
  Typography,
  Divider,
  Button,
  InputNumber,
  message,
} from "antd";
import { readItem } from "../../utils/localStorage";
import { getAllCategories, addCourse } from "../../services/course.service";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const AddCourse = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getAllCategories();
        setCategories(response.categories || []);
      } catch (error) {
        message.error("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFinish = async (values) => {
    const courseData = {
      Title: values.Title,
      LectureId: readItem("User").UserId, // Thay đổi theo cách lấy ID giảng viên
      Description: values.Description,
      Level: values.Level,
      Language: values.Language,
      Price: values.Price,
      CourseImageName: values.CourseImage,
      CourseImageURL: values.CourseImage,
      CourseVideoName: values.CourseVideo,
      CourseVideoURL: values.CourseVideo,
      Subtitle: values.Subtitle,
      Status: "Inactive", // Trạng thái mặc định
      CategoryId: values.CategoryId,
    };

    try {
      const response = await addCourse(courseData);
      message.success("Course added successfully!");
      console.log(response);
      // Có thể reset form hoặc chuyển hướng nếu cần
    } catch (error) {
      message.error("Failed to add course.");
    }
  };

  const user = readItem("User").UserName;

  return (
    <div
      style={{
        maxWidth: 1000,
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
        margin: "40px auto",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Add New Course
      </Title>

      <Form
        layout="vertical"
        onFinish={handleFinish}
        scrollToFirstError
        style={{ marginTop: "20px" }}
      >
        <Divider orientation="left">Course Information</Divider>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Course Title"
              name="Title"
              rules={[
                { required: true, message: "Please input the course title!" },
              ]}
            >
              <Input placeholder="Enter course title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Lecture Name"
              name="LectureName"
              initialValue={user}
              rules={[{ required: true, message: "Lecture name is required!" }]}
            >
              <Input placeholder="Lecture Name" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="Description"
              rules={[
                {
                  required: true,
                  message: "Please input the course description!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Enter course description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Language" name="Language">
              <Input placeholder="Enter course language" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Level" name="Level">
              <Select placeholder="Select course level">
                <Option value="Beginner">Beginner</Option>
                <Option value="Immediate">Immediate</Option>
                <Option value="Advanced">Advanced</Option>
                <Option value="All levels">All levels</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="Price"
              rules={[
                { required: true, message: "Please input the course price!" },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Enter price"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="CategoryId"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select category" loading={loading}>
                {categories.map((category) => (
                  <Option key={category.CategoryId} value={category.CategoryId}>
                    {category.Description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Media Information</Divider>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Course Image"
              name="CourseImage"
              rules={[
                {
                  required: true,
                  message: "Please input the course image URL!",
                },
              ]}
            >
              <Input placeholder="Enter course image URL" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Course Video"
              name="CourseVideo"
              rules={[
                {
                  required: true,
                  message: "Please input the course video URL!",
                },
              ]}
            >
              <Input placeholder="Enter course video URL" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Subtitle" name="Subtitle">
              <Input placeholder="Enter subtitle (optional)" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "right", marginTop: "20px" }}>
          <Button type="primary" htmlType="submit" size="large">
            Add Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCourse;
