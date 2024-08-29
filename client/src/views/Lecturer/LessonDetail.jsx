import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get `lessonId` from URL
import {
  Typography,
  Card,
  Spin,
  Input,
  Row,
  Col,
  Form,
  DatePicker,
} from "antd";
import moment from "moment";
import { getLessonDetails } from "../../services/course.service";

const { Title } = Typography;
const { TextArea } = Input;

const LessonDetailPageForStudent = () => {
  const { id } = useParams(); // Get lessonId from URL
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  // Function to fetch lesson details
  const fetchLessonDetails = async () => {
    try {
      const data = await getLessonDetails(id);
      setLesson(data.LessonDetails);
      form.setFieldsValue({
        ...data.LessonDetails,
        StartTime: data.LessonDetails.StartTime
          ? moment(data.LessonDetails.StartTime)
          : null,
        EndTime: data.LessonDetails.EndTime
          ? moment(data.LessonDetails.EndTime)
          : null,
      });
    } catch (error) {
      console.error("Error fetching lesson details:", error);
      message.error("Failed to load lesson details.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchLessonDetails();
      setLoading(false);
    };

    fetchData();
  }, [id, form]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!lesson) {
    return <div>No lesson details found</div>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: "24px" }}>
      <Card
        bordered
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "20px",
        }}
        title={
          <Title level={2} style={{ color: "#1890ff", marginBottom: "0" }}>
            {lesson.Title}
          </Title>
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Card
                bordered
                style={{
                  backgroundColor: "#f0f5ff",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <Title level={4}>Lesson Details</Title>
                <Form.Item label="Title" name="Title">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Description" name="Description">
                  <TextArea disabled />
                </Form.Item>
                <Form.Item label="Start Time" name="StartTime">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item label="End Time" name="EndTime">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                bordered
                style={{
                  backgroundColor: "#f0f5ff",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <Title level={4}>Media</Title>
                <Form.Item label="Image">
                  {lesson.ImageURL ? (
                    <>
                      <img
                        src={lesson.ImageURL}
                        alt={lesson.ImageName}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                      <Input
                        value={lesson.ImageURL}
                        readOnly
                        style={{ marginTop: "8px" }}
                        addonBefore="Image URL:"
                      />
                    </>
                  ) : (
                    <p>No image</p>
                  )}
                </Form.Item>
                <Form.Item label="Video">
                  {lesson.VideoURL ? (
                    <>
                      <video
                        width="100%"
                        controls
                        style={{ borderRadius: "8px", marginTop: "16px" }}
                      >
                        <source src={lesson.VideoURL} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <Input
                        value={lesson.VideoURL}
                        readOnly
                        style={{ marginTop: "8px" }}
                        addonBefore="Video URL:"
                      />
                    </>
                  ) : (
                    <p>No video</p>
                  )}
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default LessonDetailPageForStudent;
