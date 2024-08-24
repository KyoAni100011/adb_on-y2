import React from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Flex,
  Typography,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { registerStudent } from "../services/auth.service";
import { createItem } from "../utils/localStorage";

const { Option } = Select;

const RegistrationForm = () => {
  const onFinish = async (values) => {
    await registerStudent(values)
      .then((res) => {
        <Alert message={res.Message} type="success" showIcon />;
        createItem("User", res.User);
        window.location.href = "/";
      })
      .catch((err) => {
        <Alert message={err.Message} type="error" showIcon />;
      });
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <GlobalOutlined style={{ fontSize: 60, color: "#1890ff" }} />
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="User Name"
          name="userName"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your username"
            style={{ borderRadius: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
            style={{ borderRadius: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Enter your phone number"
            style={{ borderRadius: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Enter your email"
            style={{ borderRadius: 4 }}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Street" name="street">
              <Input
                prefix={<HomeOutlined />}
                placeholder="Enter your street"
                style={{ borderRadius: 4 }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Ward" name="ward">
              <Input
                prefix={<HomeOutlined />}
                placeholder="Enter your ward"
                style={{ borderRadius: 4 }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="District" name="district">
              <Input
                prefix={<HomeOutlined />}
                placeholder="Enter your district"
                style={{ borderRadius: 4 }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="City" name="city">
              <Input
                prefix={<HomeOutlined />}
                placeholder="Enter your city"
                style={{ borderRadius: 4 }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Date of Birth" name="dateOfBirth">
          <DatePicker
            style={{ width: "100%", borderRadius: 4 }}
            suffixIcon={<CalendarOutlined />}
          />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select placeholder="Select your gender" style={{ borderRadius: 4 }}>
            <Option value="M">Male</Option>
            <Option value="F">Female</Option>
            <Option value="O">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              borderRadius: 4,
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: 16,
              height: 40,
            }}
          >
            Register
          </Button>
          <Flex justify="center" style={{ marginTop: 2 }}>
            <Typography>Already have an account ? </Typography>
            <Link to="/join">Login</Link>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
