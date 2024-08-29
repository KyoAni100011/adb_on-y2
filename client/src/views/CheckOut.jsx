import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Select,
  Radio,
  Typography,
  Row,
  Col,
  Divider,
  Flex,
  message,
} from "antd";
import { CreditCardOutlined, PayCircleOutlined } from "@ant-design/icons";
import { readItem, updateItem } from "../utils/localStorage";
import { processPayment } from "../services/course.service";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const naviagte = useNavigate();

  useEffect(() => {
    // Simulate fetching cart data from storage or API
    const fetchCartData = () => {
      let user = readItem("User");
      const cart = user?.Cart || { CartItems: [] };

      setCartItems(cart.CartItems);

      // Calculate prices
      const originalPrice = cart.CartItems.reduce(
        (acc, item) => acc + item.Price,
        0
      );

      const discount = cart.CartItems.reduce(
        (acc, item) =>
          acc +
          (item.Price *
            (item?.DiscountPercent ? item?.DiscountPercent : -100 + 100)) /
            100,
        0
      );
      const total = originalPrice - discount;

      setOriginalPrice(originalPrice);
      setDiscount(discount);
      setTotal(total);
    };

    fetchCartData();
  }, []);

  const handlePayment = async () => {
    try {
      const user = readItem("User");
      if (!user || !user.UserId) {
        message.error("User information is missing.");
        return;
      }

      const response = await processPayment(user.UserId, paymentMethod);

      message.success(
        `Payment successful! Order Number: ${response.Payment.OrderId}`
      );

      user.Cart.CartItems = [];
      updateItem("User", user);

      naviagte("/payment", { state: response.Payment });
      // Additional processing after successful payment if needed
    } catch (error) {
      message.error(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Card title="Checkout">
            <Form layout="vertical">
              <Form.Item label="Billing address">
                <Form.Item name="country" noStyle>
                  <Select defaultValue="Turkmenistan">
                    <Option value="turkmenistan">Turkmenistan</Option>
                    {/* Add more countries as needed */}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Payment method">
                <Radio.Group
                  defaultValue="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Card size="small" style={{ marginBottom: 16 }}>
                    <Radio value="paypal">
                      <PayCircleOutlined /> PayPal
                    </Radio>
                    <Text
                      type="secondary"
                      style={{ display: "block", marginTop: 8 }}
                    >
                      In order to complete your transaction, we will transfer
                      you over to PayPal's secure servers.
                    </Text>
                    <Text
                      type="warning"
                      style={{ display: "block", marginTop: 8 }}
                    >
                      Unfortunately, PayPal does not support payments in VND,
                      therefore your payment will be in USD.
                    </Text>
                    <Text style={{ display: "block", marginTop: 8 }}>
                      The amount you will be charged by PayPal is $15.92.
                    </Text>
                  </Card>

                  <Card size="small">
                    <Radio value="card">
                      <CreditCardOutlined /> Credit/Debit Card
                    </Radio>
                  </Card>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Summary">
            <Flex align="center" justify="space-between">
              <Text>Original Price:</Text>{" "}
              <Text strong>₫{originalPrice?.toLocaleString()}</Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text>Discounts:</Text>{" "}
              <Text strong>-₫{discount?.toLocaleString()}</Text>
            </Flex>
            <Divider />
            <Flex align="center" justify="space-between">
              <Text>Total:</Text>
              <Title level={3} style={{ display: "inline-block" }}>
                ₫{total?.toLocaleString()}
              </Title>
            </Flex>
            <Button type="primary" block onClick={handlePayment}>
              Proceed
            </Button>
            <Text type="secondary" style={{ display: "block", marginTop: 16 }}>
              30-Day Money-Back Guarantee
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Order details" style={{ marginTop: 24 }}>
            {cartItems.map((item, index) => (
              <Row
                key={index}
                style={{ marginTop: index > 0 ? 16 : 0 }}
                align="middle"
              >
                <Col span={3}>
                  {/* Course Image with Placeholder and Smaller Size */}
                  <img
                    src={item.ImageUrl || "https://via.placeholder.com/80x80"}
                    alt={item.Title}
                    style={{ width: "50px", height: "50px", borderRadius: 4 }}
                  />
                </Col>
                <Col span={13} style={{ paddingLeft: 16 }}>
                  <Text>{item.Title}</Text>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <Text delete={item.DiscountPercent}>
                    ₫{item.Price.toLocaleString()}
                  </Text>
                  {item.DiscountPercent && (
                    <Text strong style={{ marginLeft: 8 }}>
                      ₫
                      {(
                        (item.Price *
                          (item?.DiscountPercent
                            ? item?.DiscountPercent
                            : -100 + 100)) /
                        100
                      )?.toLocaleString()}
                    </Text>
                  )}
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
