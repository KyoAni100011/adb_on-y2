import React, { useEffect, useState } from "react";
import {
  Table,
  Rate,
  Badge,
  Typography,
  Button,
  Tag,
  Form,
  Input,
  Select,
  Row,
  Col,
  notification,
} from "antd";
import { addCartItem, getAllCourses } from "../services/course.service";
import { Link } from "react-router-dom";
import convertTitleToSlug from "../utils/converter";
import { readItem, updateItem } from "../utils/localStorage";

const { Text } = Typography;
const { Option } = Select;

const levelColors = {
  Beginner: "green",
  Immediate: "orange",
  "All Levels": "blue",
};

const addToCart = async (course) => {
  let user = readItem("User");
  const cart = user.Cart;

  if (!cart.CartItems) {
    // Nếu giỏ hàng chưa có mục nào, khởi tạo mảng CartItems
    cart.CartItems = [];
  }

  const existingItemIndex = cart.CartItems.findIndex(
    (item) => item.CourseId === course.CourseId
  );

  if (existingItemIndex === -1) {
    // Nếu khóa học chưa có trong giỏ hàng, thêm nó vào

    await addCartItem(cart.CartId, course.CourseId)
      .then((res) => {
        cart.CartItems.push(course);
        notification.success({
          message: "Success",
          description: `Added ${course.Title} to cart.`,
        });
      })
      .catch((err) => console.log(err));
  } else {
    // Nếu khóa học đã tồn tại trong giỏ hàng, thông báo đã tồn tại
    notification.info({
      message: "Info",
      description: `${course.Title} is already in the cart.`,
    });
  }

  // Cập nhật giỏ hàng của người dùng
  user.Cart.CartItems = cart.CartItems;

  console.log(user);

  updateItem("User", user);
};

const columns = [
  {
    title: "Image",
    dataIndex: "CourseImageURL",
    key: "CourseImageURL",
    render: (text) => (
      <img
        src={text || "https://via.placeholder.com/800x400?text=Course+Image"}
        alt="course"
        style={{ width: 120, borderRadius: 8 }}
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "Title",
    key: "Title",
    width: 300,
    render: (text, record) => (
      <Link
        to={`/course/${convertTitleToSlug(text)}`}
        state={{ courseId: record.CourseId }}
      >
        <Text strong>{text}</Text>
        <br />
        <Text type="secondary">{record.LectureName}</Text>
      </Link>
    ),
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    width: 400,
    render: (text) => (
      <Text ellipsis style={{ maxWidth: 300 }}>
        {text}
      </Text>
    ),
  },
  {
    title: "Level",
    dataIndex: "Level",
    key: "Level",
    render: (level) => (
      <Tag color={levelColors[level]} style={{ fontSize: 14 }}>
        {level}
      </Tag>
    ),
  },
  {
    title: "Rating",
    dataIndex: "Rating",
    key: "Rating",
    width: 200,
    render: (text, record) => (
      <div>
        <Rate disabled defaultValue={text} />
        <Text> ({record.TotalReviews.toLocaleString()})</Text>
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "Price",
    key: "Price",
    width: 150,
    render: (text) => (
      <div>
        <Text strong style={{ fontSize: 16 }}>
          {text}
        </Text>
      </div>
    ),
  },
  {
    title: "Action",
    key: "Action",
    render: (text, record) => (
      <Button
        type="primary"
        onClick={() => addToCart(record)}
        style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
      >
        Add to Cart
      </Button>
    ),
  },
];

const CourseSearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSearch(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ marginBottom: 24 }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="courseName" label="Tên khóa học">
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="category" label="Lĩnh vực">
            <Select placeholder="Chọn lĩnh vực">
              <Option value="tech">Công nghệ</Option>
              <Option value="business">Kinh doanh</Option>
              <Option value="design">Thiết kế</Option>
              <Option value="marketing">Marketing</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="rating" label="Đánh giá sao">
            <Rate allowHalf />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="studentsCount" label="Số lượng học viên đã đăng ký">
            <Input placeholder="Nhập số lượng" type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="reviewsCount" label="Số lượng đánh giá">
            <Input placeholder="Nhập số lượng" type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tìm kiếm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        console.log("Fetched courses data:", coursesData.courses);
        if (Array.isArray(coursesData.courses)) {
          setCourses(coursesData.courses);
          setFilteredCourses(coursesData.courses);
        } else {
          console.error("Fetched data is not an array:", coursesData.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (values) => {
    const { courseName, category, rating, studentsCount, reviewsCount } =
      values;

    const filtered = courses.filter((course) => {
      return (
        (!courseName ||
          course.Title.toLowerCase().includes(courseName.toLowerCase())) &&
        (!category ||
          course.CategoryDescription.toLowerCase() ===
            category.toLowerCase()) &&
        (!rating || course.Rating >= rating) &&
        (!studentsCount || course.TotalReviews >= studentsCount) &&
        (!reviewsCount || course.TotalReviews >= reviewsCount)
      );
    });

    setFilteredCourses(filtered);
  };

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: 20 }}>
      <CourseSearchForm onSearch={handleSearch} />
      <Table
        columns={columns}
        dataSource={filteredCourses}
        pagination={{ pageSize: 10 }}
        rowKey="CourseId"
        style={{ backgroundColor: "#fff", borderRadius: 8, overflow: "hidden" }}
      />
    </div>
  );
}
