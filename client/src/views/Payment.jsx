import React from "react";
import { Card, Typography, Button, Result } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Title, Text } = Typography;

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy dữ liệu từ state
  const paymentData = location.state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <Result
        icon={
          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: "48px" }} />
        }
        title="Payment Successful"
        subTitle="Thank you for your purchase! Your payment has been processed successfully."
        extra={[
          <Button type="primary" key="home" onClick={handleBackToHome}>
            Back to Home
          </Button>,
        ]}
      />
      <Card
        title={<Title level={4}>Order Summary</Title>}
        style={{
          marginTop: "20px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text strong>Order Number:</Text>{" "}
        <Text>{paymentData.OrderId || "N/A"}</Text>
        <br />
        <Text strong>Payment Method:</Text>{" "}
        <Text>{paymentData.PaymentMethod || "N/A"}</Text>
        <br />
        <Text strong>Total Amount:</Text>{" "}
        <Text style={{ color: "#d44" }}>
          {paymentData.TotalAmount
            ? `₫${paymentData.TotalAmount.toLocaleString()}`
            : "N/A"}
        </Text>
        <br />
        <Text strong>Order Date:</Text>{" "}
        <Text>
          {paymentData.OrderDate
            ? new Date(paymentData.OrderDate).toLocaleDateString()
            : "N/A"}
        </Text>
        <br />
        <Text strong>Payment ID:</Text>{" "}
        <Text>{paymentData.PaymentId || "N/A"}</Text>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
