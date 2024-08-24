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
  List,
  Typography,
  Tag,
} from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getCourseById } from "../services/course.service";

const { Title, Text, Paragraph } = Typography;

const CourseDetail = () => {
  const location = useLocation();
  const { courseId } = location.state || {};
  const [course, setCourse] = useState(null);

  const addToCart = () => {
    console.log("Adding to cart:", course);
    // Logic to add the course to the cart
  };

  const buyNow = () => {
    console.log("Buying now:", course);
    // Logic to purchase the course immediately
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await getCourseById(courseId);
        setCourse(response.course);
      } catch (err) {
        console.log("Failed to load course details");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      {course ? (
        <Row gutter={24}>
          <Col span={16}>
            <Card
              cover={
                <img
                  alt="course"
                  src={course.CourseImageURL}
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
              <Title level={2}>{course.CourseTitle}</Title>
              <Text type="secondary">{course.LecturerName}</Text>
              <Divider />
              <Rate disabled defaultValue={course.CourseRating} />
              <Text>
                {" "}
                ({course.NumberStudentsRegister.toLocaleString()} students)
              </Text>
              {course.CourseStatus === "Active" && (
                <Badge color="gold" text="Active" style={{ marginLeft: 8 }} />
              )}
              <Divider />
              <Paragraph>{course.CourseDescription}</Paragraph>
              <Descriptions
                title="Course Details"
                bordered
                column={1}
                style={{ marginTop: 16 }}
              >
                <Descriptions.Item label="Subtitle">
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {course.Subtitle}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                  <Text strong style={{ fontSize: 18, color: "#ff4d4f" }}>
                    ₫{course.Price.toLocaleString()}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Language">
                  <Tag color="blue">{course.Language}</Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Instructor" style={{ marginBottom: 24 }}>
              <Avatar
                size={64}
                src={course.CourseImageURL} // Assuming avatar image should be different
              />
              <Title level={4}>{course.LecturerName}</Title>
              <Text type="secondary">{course.Biography}</Text>
              <Divider />
              <Text>
                Current Workplace: {course.CurrentWorkplaceStreet},{" "}
                {course.CurrentWorkplaceWard}, {course.CurrentWorkplaceDistrict}
                , {course.CurrentWorkplaceCity}
              </Text>
              <Divider />
              <Text>Degrees: {course.Degrees}</Text>
            </Card>
            {course.Reviews && course.Reviews.length > 0 && (
              <Card title="Reviews">
                <List
                  dataSource={course.Reviews}
                  renderItem={(review) => (
                    <List.Item key={review.ReviewId}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src="https://via.placeholder.com/32?text=R"
                            icon={<UserOutlined />}
                          />
                        }
                        title={review.UserName}
                        description={
                          <>
                            <Rate disabled defaultValue={review.ReviewRating} />
                            <Paragraph>{review.Review}</Paragraph>
                          </>
                        }
                      />
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        {new Date(review.TimeReview).toLocaleDateString()}
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            )}
          </Col>
        </Row>
      ) : (
        <Text>Loading course details...</Text>
      )}
    </div>
  );
};

export default CourseDetail;
