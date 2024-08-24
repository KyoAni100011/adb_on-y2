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
} from "antd";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const sampleLecturerData = {
  userName: "John Doe",
  phoneNumber: "+1234567890",
  email: "john.doe@example.com",
  street: "123 Elm Street",
  ward: "Ward 5",
  district: "Downtown",
  city: "Metropolis",
  dateOfBirth: "1985-06-15",
  gender: "M",
  role: "Lecturer",
  degrees: "PhD in Computer Science",
  currentWorkplaceStreet: "456 Oak Avenue",
  currentWorkplaceWard: "Ward 10",
  currentWorkplaceDistrict: "Uptown",
  currentWorkplaceCity: "Metropolis",
  biography:
    "John Doe is a professor with over 20 years of experience in computer science and artificial intelligence.",
};

const LecturerProfileView = () => {
  const handleUpdate = (values) => {
    console.log("Updated values:", values);
    // Implement the update logic here
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
      <Title level={2}>Lecturer Profile</Title>

      <Form
        layout="vertical"
        initialValues={sampleLecturerData}
        scrollToFirstError
        onFinish={handleUpdate}
      >
        <Divider orientation="left">Personal Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Name" name="userName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date of Birth" name="dateOfBirth">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Gender" name="gender">
              <Select>
                <Option value="M">Male</Option>
                <Option value="F">Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Address Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Street Address" name="street">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ward" name="ward">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="District" name="district">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Workplace Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Current Workplace Street"
              name="currentWorkplaceStreet"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Current Workplace Ward"
              name="currentWorkplaceWard"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Current Workplace District"
              name="currentWorkplaceDistrict"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Current Workplace City"
              name="currentWorkplaceCity"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Professional Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Role" name="role">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Degrees" name="degrees">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Additional Information</Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Biography" name="biography">
              <TextArea rows={6} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LecturerProfileView;
