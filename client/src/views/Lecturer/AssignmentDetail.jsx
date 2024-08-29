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
import {
  getAssignmentDetails,
  submitAnswer,
  getSubmission,
} from "../../services/course.service";
import { readItem } from "../../utils/localStorage";

const { Title } = Typography;
const { TextArea } = Input;

const AssignmentDetailPage = () => {
  const { id } = useParams(); // Lấy assignmentId từ URL
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  // Hàm gọi API để lấy chi tiết bài tập
  const fetchAssignmentDetails = async () => {
    try {
      const data = await getAssignmentDetails(id);
      setAssignment(data.AssignmentDetails);
      form.setFieldsValue({
        ...data.AssignmentDetails,
        SubmissionDeadline: data.AssignmentDetails.SubmissionDeadline
          ? moment(data.AssignmentDetails.SubmissionDeadline)
          : null,
      });
    } catch (error) {
      console.error("Error fetching assignment details:", error);
      message.error("Failed to load assignment details.");
    }
  };

  // Hàm gọi API để lấy thông tin nộp bài
  const fetchSubmission = async () => {
    try {
      const user = readItem("User");
      const data = await getSubmission(id, user.UserId);
      console.log(data);
      setSubmission(data.Submissions); // Dữ liệu nộp bài là một mảng, lấy phần tử đầu tiên
      form.setFieldsValue({
        Answer: data[0]?.Text || "", // Lấy câu trả lời từ dữ liệu nộp bài
      });
    } catch (error) {
      console.error("Error fetching submission:", error);
      message.error("Failed to load submission.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAssignmentDetails();
      await fetchSubmission();
      setLoading(false);
    };

    fetchData();
  }, [id, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const user = readItem("User");
        submitAnswer(id, user.UserId, values.Answer, 0, null, "Pending")
          .then(() => {
            message.success("Answer submitted successfully.");
          })
          .catch((error) => {
            message.error("Failed to submit answer.");
          });
      })
      .catch((error) => {
        message.error("Failed to submit answer.");
      });
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
                <Title level={4}>Assignment Details</Title>

                <Form.Item label="Title" name="Title">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Description" name="Description">
                  <TextArea disabled />
                </Form.Item>
                <Form.Item label="Text" name="Text">
                  <TextArea disabled />
                </Form.Item>
                <Form.Item
                  label="Submission Deadline"
                  name="SubmissionDeadline"
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    disabled
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Your Answer"
                  name="Answer"
                  rules={[
                    { required: true, message: "Please input your answer!" },
                  ]}
                >
                  <TextArea />
                </Form.Item>
                {submission && (
                  <Card
                    bordered
                    style={{
                      backgroundColor: "#f0f5ff",
                      borderRadius: "8px",
                      padding: "16px",
                      marginTop: "16px",
                    }}
                  >
                    <Title level={4}>Submissions</Title>
                    <p>
                      <strong>Submission ID:</strong> {submission.SubmissionId}
                    </p>
                    <p>
                      <strong>Score:</strong> {submission.Score}
                    </p>
                    <p>
                      <strong>Status:</strong> {submission.Status}
                    </p>
                    <p>
                      <strong>Feedback:</strong>{" "}
                      {submission.Feedback || "No feedback"}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {moment(submission.CreatedAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {moment(submission.UpdatedAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </p>
                  </Card>
                )}
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
                      <Input
                        value={assignment.ImageURL}
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
                      <Input
                        value={assignment.VideoURL}
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

          <div style={{ marginTop: "24px", textAlign: "right" }}>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ marginRight: "8px" }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AssignmentDetailPage;
