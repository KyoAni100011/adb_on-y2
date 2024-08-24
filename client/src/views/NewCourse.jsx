import React from "react";
import {
  Form,
  Input,
  Select,
  Col,
  Row,
  Typography,
  Divider,
  Button,
  Upload,
  InputNumber,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const AddCourse = () => {
  const handleFinish = (values) => {
    console.log("Submitted values:", values);
    // Implement the logic to handle form submission here
    message.success("Course added successfully!");
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
        margin: "0 auto",
      }}
    >
      <Title level={2}>Add New Course</Title>

      <Form layout="vertical" onFinish={handleFinish} scrollToFirstError>
        <Divider orientation="left">Course Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Course Title"
              name="Title"
              rules={[
                { required: true, message: "Please input the course title!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Lecture ID"
              name="LectureId"
              rules={[
                { required: true, message: "Please input the lecture ID!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Description" name="Description">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Language" name="Language">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Total Reviews" name="TotalReviews">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Level" name="Level">
              <Select>
                <Option value="Beginner">Beginner</Option>
                <Option value="Immediate">Immediate</Option>
                <Option value="Advanced">Advanced</Option>
                <Option value="All levels">All levels</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Price" name="Price">
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Category ID"
              name="CategoryId"
              rules={[
                { required: true, message: "Please input the category ID!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Discount ID" name="DiscountId">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Media Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Course Image"
              name="CourseImage"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload name="CourseImage" action="/upload" listType="picture">
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Course Video"
              name="CourseVideo"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload name="CourseVideo" action="/upload" listType="picture">
                <Button icon={<UploadOutlined />}>Upload Video</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Subtitle" name="Subtitle">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status" name="Status">
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Blocked">Blocked</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Rating" name="Rating">
              <InputNumber min={0} max={5} step={0.1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Number of Students Registered"
              name="NumberStudentsRegister"
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCourse;
