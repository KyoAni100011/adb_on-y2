import React from "react";
import { Button, Form, Input, Typography, Flex, Alert } from "antd";
import { ReadOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { createItem } from "../utils/localStorage";

const LoginForm = () => {
  const onFinish = async (values) => {
    await loginUser(values)
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
        maxWidth: 400,
        margin: "0 auto",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <ReadOutlined style={{ fontSize: 60, color: "#1890ff" }} />
      </div>
      <Form layout="vertical" onFinish={onFinish}>
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
            type="email"
            placeholder="Enter your email"
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
            Login
          </Button>
          <Flex justify="center" style={{ marginTop: 2 }}>
            <Typography>Don't have an account ? </Typography>
            <Link to="/join-new">Sign Up</Link>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
