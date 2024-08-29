import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Typography,
  Button,
  Input,
  Divider,
  Rate,
  notification,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { readItem, updateItem } from "../utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { removeCartItem, createOrder } from "../services/course.service";

const { Title, Text } = Typography;

const ShoppingCart = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = readItem("User");
    const cartItems = user.Cart.CartItems;

    if (cartItems) {
      setCourses(cartItems);
    }
  }, []);

  const handleRemove = async (courseId) => {
    try {
      let user = readItem("User");

      if (!user || !user.Cart) {
        throw new Error("User or Cart not found.");
      }

      const cart = user.Cart;

      if (!cart.CartItems || !Array.isArray(cart.CartItems)) {
        throw new Error("Cart items are missing or not an array.");
      }

      const updatedCartItems = cart.CartItems.filter(
        (course) => course.CourseId !== courseId
      );

      if (updatedCartItems.length === cart.CartItems.length) {
        throw new Error("Course not found in the cart.");
      }

      user.Cart.CartItems = updatedCartItems;
      updateItem("User", user);
      setCourses(updatedCartItems);

      await removeCartItem(cart.CartId, courseId).then((res) => {
        notification.success({
          message: "Success",
          description: `Remove course from cart.`,
        });
      });
    } catch (error) {
      console.error("Error occurred during removing cart item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const user = readItem("User");

      if (!user || !user.Cart) {
        throw new Error("User or Cart not found.");
      }

      const cartId = user.Cart.CartId;
      const userId = user.UserId;

      const orderDetails = await createOrder(userId, cartId);
      notification.success({
        message: "Order Created",
        description: `Your order has been successfully created.`,
      });

      navigate("/checkout", { state: { orderDetails } });
    } catch (error) {
      console.error("Error occurred during checkout:", error);
      notification.error({
        message: "Checkout Failed",
        description: error.message,
      });
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "#52c41a"; // Green
      case "Intermediate":
        return "#faad14"; // Yellow
      case "Advanced":
        return "#f5222d"; // Red
      default:
        return "#999"; // Grey
    }
  };

  const total = courses.reduce((acc, course) => acc + course.Price, 0);
  const originalTotal = courses.reduce(
    (acc, course) => acc + course.originalPrice,
    0
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Shopping Cart</Title>
      <Text style={{ color: "#555", marginBottom: "20px", display: "block" }}>
        {courses.length} Courses in Cart
      </Text>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 2 }}>
          <List
            itemLayout="vertical"
            dataSource={courses}
            renderItem={(item) => (
              <List.Item
                style={{
                  backgroundColor: "#fff",
                  marginBottom: "20px",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #f0f0f0",
                  position: "relative",
                }}
              >
                <Button
                  type="link"
                  icon={<CloseOutlined />}
                  style={{
                    color: "#ffffff",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#ff4d4f",
                  }}
                  onClick={() => handleRemove(item.CourseId)}
                />
                <img
                  src="https://via.placeholder.com/150" // Placeholder image URL
                  alt={item.Title}
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "10px",
                    marginRight: "20px",
                  }}
                />
                <List.Item.Meta
                  title={
                    <>
                      <Text strong>{item.Title}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {item.Subtitle}
                      </Text>
                    </>
                  }
                  description={
                    <>
                      <Text type="secondary">By {item.LectureName}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {item.Description}
                      </Text>
                      <br />
                      <Rate allowHalf disabled defaultValue={item.Rating} />
                      <Text style={{ marginLeft: "8px", color: "#999" }}>
                        ({item.TotalReviews} ratings)
                      </Text>
                      <br />
                      <Text
                        type="secondary"
                        style={{
                          fontSize: "14px",
                          color: getLevelColor(item.Level),
                        }}
                      >
                        {item.Level}
                      </Text>
                    </>
                  }
                />
                <div style={{ textAlign: "right" }}>
                  {item.DiscountPercent && (
                    <Text strong style={{ fontSize: "20px", color: "#d44" }}>
                      {(item.Price.toLocaleString() *
                        (1 + item.DiscountPercent)) /
                        100}
                      ₫
                    </Text>
                  )}
                  <Text
                    delete={item.DiscountPercent ? true : false}
                    style={{ fontSize: "16px", color: "#999" }}
                  >
                    {item.Price?.toLocaleString()}₫
                  </Text>
                  <br />
                </div>
              </List.Item>
            )}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Card
            style={{
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              border: "none",
            }}
          >
            <Title level={4}>
              Total:{" "}
              <span style={{ color: "#d44", fontSize: "24px" }}>
                {total.toLocaleString()}₫
              </span>
            </Title>
            <Text delete style={{ fontSize: "16px", color: "#999" }}>
              {originalTotal.toLocaleString()}₫
            </Text>
            <Text style={{ marginLeft: "8px", color: "#52c41a" }}>79% off</Text>
            <Divider style={{ margin: "15px 0" }} />
            <Button
              type="primary"
              block
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={handleCheckout} // Gọi hàm handleCheckout khi nhấn nút
            >
              Checkout
            </Button>
            <Divider style={{ margin: "15px 0" }} />
            <Title level={5} style={{ color: "#333", marginBottom: "10px" }}>
              Promotions
            </Title>
            <Text style={{ fontSize: "14px" }}>SKILS4SALEB is applied</Text>
            <Input.Search
              placeholder="Enter Coupon"
              enterButton="Apply"
              style={{
                marginTop: "15px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
