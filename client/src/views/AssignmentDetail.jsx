import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Spin,
  Button,
  Input,
  message,
  Row,
  Col,
  Form,
  DatePicker,
} from "antd";
import moment from "moment";
import { getAssignmentDetails, submitAnswer } from "../services/course.service";
import { readItem } from "../utils/localStorage";

const { Title } = Typography;
const { TextArea } = Input;

const AssignmentDetailPageForStudent = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(""); // Trạng thái cho câu trả lời
  const user = readItem("User");

  const fetchAssignmentDetails = async () => {
    try {
      const data = await getAssignmentDetails(id);
      setAssignment(data.AssignmentDetails);
    } catch (error) {
      console.error("Error fetching assignment details:", error);
      message.error("Failed to load assignment details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignmentDetails();
  }, [id]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = async () => {
    try {
      await submitAnswer(id, user.UserId, answer);
      message.success("Answer submitted successfully");
      setAnswer(""); // Xóa câu trả lời sau khi gửi
    } catch (error) {
      console.error("Error submitting answer:", error);
      message.error("Failed to submit answer.");
    }
  };

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

  if (!assignment) {
    return <div>No assignment details found</div>;
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
            {assignment.Title}
          </Title>
        }
      >
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
              <Title level={4}>Assignment Details</Title>

              <p>
                <strong>Title:</strong> {assignment.Title}
              </p>
              <p>
                <strong>Description:</strong> {assignment.Description}
              </p>
              <p>
                <strong>Text:</strong> {assignment.Text}
              </p>
              <p>
                <strong>Submission Deadline:</strong>{" "}
                {assignment.SubmissionDeadline
                  ? moment(assignment.SubmissionDeadline).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "No deadline"}
              </p>
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
                {assignment.ImageURL ? (
                  <>
                    <img
                      src={assignment.ImageURL}
                      alt={assignment.ImageName}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </>
                ) : (
                  <p>No image</p>
                )}
              </Form.Item>
              <Form.Item label="Video">
                {assignment.VideoURL ? (
                  <>
                    <video
                      width="100%"
                      controls
                      style={{ borderRadius: "8px", marginTop: "16px" }}
                    >
                      <source src={assignment.VideoURL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </>
                ) : (
                  <p>No video</p>
                )}
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: "24px" }}>
          <Card
            bordered
            style={{
              backgroundColor: "#f0f5ff",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Title level={4}>Submit Your Answer</Title>
            <Form.Item label="Your Answer">
              <TextArea rows={4} value={answer} onChange={handleAnswerChange} />
            </Form.Item>
            <Button
              type="primary"
              onClick={handleSubmitAnswer}
              style={{ marginTop: "8px" }}
            >
              Submit Answer
            </Button>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default AssignmentDetailPageForStudent;
