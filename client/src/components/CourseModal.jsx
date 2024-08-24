import React from "react";
import {
  Card,
  Row,
  Col,
  Rate,
  Badge,
  Button,
  Descriptions,
  Divider,
  Avatar,
  Typography,
  Tag,
  Modal,
} from "antd";
import { ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const course = {
  key: "1",
  title: "Communication Fundamentals: How To Communicate Better",
  description:
    "Become an Effective Communicator And Learn How To Get Your Message Across By Learning Communication Fundamentals",
  author: "Life Progression Project, Lorraine Wiseman",
  rating: 4.5,
  hours: "1.5 total hours",
  lectures: 38,
  level: "Beginner",
  image: "https://via.placeholder.com/800x400?text=Course+Image",
  bestseller: true,
  instructor: {
    name: "Lorraine Wiseman",
    bio: "Experienced Communication Coach with over 20 years of experience in corporate communication training.",
    avatar: "https://via.placeholder.com/64?text=Lorraine+Wiseman",
  },
};

const CourseModal = ({ visible, onCancel }) => {
  const addToCart = () => {
    console.log("Adding to cart:", course);
    // Logic to add the course to the cart
  };

  const buyNow = () => {
    console.log("Buying now:", course);
    // Logic to purchase the course immediately
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
      style={{ top: 20 }}
      bodyStyle={{ padding: "20px" }}
    >
      <Row gutter={24}>
        <Col span={16}>
          <Card
            cover={
              <img
                alt="course"
                src={course.image}
                style={{ borderRadius: "12px" }}
              />
            }
            actions={[
              <Button
                type="primary"
                icon={<DollarOutlined />}
                onClick={buyNow}
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  color: "white",
                  borderRadius: 8,
                  width: "120px",
                  fontWeight: "bold",
                }}
              >
                Buy Now
              </Button>,
              <Button
                icon={<ShoppingCartOutlined />}
                onClick={addToCart}
                style={{
                  backgroundColor: "#FF5722",
                  borderColor: "#FF5722",
                  color: "white",
                  borderRadius: 8,
                  width: "120px",
                  fontWeight: "bold",
                  marginLeft: 8,
                }}
              >
                Add to Cart
              </Button>,
            ]}
          >
            <Title level={2}>{course.title}</Title>
            <Text type="secondary">{course.author}</Text>
            <Divider />
            <Rate disabled defaultValue={course.rating} />
            {course.bestseller && (
              <Badge color="gold" text="Bestseller" style={{ marginLeft: 8 }} />
            )}
            <Divider />
            <Paragraph>{course.description}</Paragraph>
            <Descriptions
              title="Course Details"
              bordered
              column={1}
              style={{ marginTop: 16 }}
            >
              <Descriptions.Item label="Total Hours">
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {course.hours}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Lectures">
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {course.lectures}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Level">
                <Tag color="green">{course.level}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Instructor" style={{ marginBottom: 24 }}>
            <Avatar size={64} src={course.instructor.avatar} />
            <Title level={4}>{course.instructor.name}</Title>
            <Text type="secondary">{course.instructor.bio}</Text>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default CourseModal;
