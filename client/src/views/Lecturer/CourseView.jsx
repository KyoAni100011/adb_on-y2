import React, { useState, useEffect } from "react";
import { Typography, Card, List, Divider, Tabs, Button, message } from "antd";
import { Link, useParams } from "react-router-dom";
import AddLessonModal from "./ModalAddLesson";
import AddAssignmentModal from "./ModalAddAssignment";
import { getCoursesDetails } from "../../services/course.service";

const { Title, Text, Paragraph } = Typography;

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]); // Add students state
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("1");

  const defaultImageURL = "https://via.placeholder.com/600x400?text=No+Image";

  const fakeStudents = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCoursesDetails(id);
        if (courseData) {
          console.log(courseData);
          setCourse(courseData.CourseDetails.CourseDetails);
          setLectures(courseData.CourseDetails.Lessons || []);
          setAssignments(courseData.CourseDetails.Assignments || []);
          // Set fake students data
          setStudents(fakeStudents);
        }
      } catch (error) {
        message.error("Failed to fetch course data");
      }
    };

    fetchData();
  }, [id]);

  const showLectureModal = () => setIsLectureModalOpen(true);
  const showAssignmentModal = () => setIsAssignmentModalOpen(true);

  const handleLectureOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsLectureModalOpen(false);
      setConfirmLoading(false);
      message.success("Lecture added successfully");
    }, 2000);
  };

  const handleAssignmentOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsAssignmentModalOpen(false);
      setConfirmLoading(false);
      message.success("Assignment added successfully");
    }, 2000);
  };

  const handleModalCancel = () => {
    setIsLectureModalOpen(false);
    setIsAssignmentModalOpen(false);
  };

  function calculateDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMilliseconds = end - start;

    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours}h ${minutes}m`;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: "24px" }}>
      <Card
        bordered
        style={{ backgroundColor: "#f7f9fc", borderRadius: "8px" }}
        title={
          <Title level={2} style={{ color: "#1890ff" }}>
            {course.Title}
          </Title>
        }
        cover={
          <img
            alt={course.CourseImageName || "Course Image"}
            src={course.CourseImageURL || defaultImageURL}
            style={{
              maxWidth: "300px",
              maxHeight: "200px",
              objectFit: "cover",
            }}
          />
        }
      >
        <div style={{ marginBottom: "24px" }}>
          <Text>Language: {course.Language}</Text>
          <br />
          <Text>Level: {course.Level}</Text>
          <br />
          <Text>Price: {Number(course.Price).toLocaleString()} VND</Text>
          <br />
          <Text>Status: {course.Status}</Text>
          <br />
          <Paragraph>Description: {course.Description}</Paragraph>
        </div>

        <Divider />

        <Tabs
          defaultActiveKey="1"
          activeKey={activeTabKey}
          onChange={(key) => setActiveTabKey(key)}
        >
          <Tabs.TabPane tab="Lectures" key="1">
            {lectures.length > 0 ? (
              <List
                bordered
                dataSource={lectures}
                renderItem={(lecture) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Link to={`/lecturer/lesson/${lecture.LessonId}`}>
                          {lecture.LessonTitle}
                        </Link>
                      }
                      description={`Duration: ${calculateDuration(
                        lecture.StartTime,
                        lecture.EndTime
                      )}`}
                    />

                    <div>
                      {lecture.content}
                      <br />
                      {`Start Time: ${lecture.StartTime}`}
                      <br />
                      {`End Time: ${lecture.EndTime}`}
                    </div>
                  </List.Item>
                )}
              />
            ) : (
              <Text>No lectures available</Text>
            )}
            {activeTabKey === "1" && (
              <div style={{ marginTop: "24px" }}>
                <Button type="primary" onClick={showLectureModal}>
                  Add New Lecture
                </Button>
              </div>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Assignments" key="2">
            {assignments.length > 0 ? (
              <List
                bordered
                dataSource={assignments}
                renderItem={(assignment) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Link
                          to={`/lecturer/assignment/${assignment.AssignmentId}`}
                        >
                          {assignment.AssignmentTitle}
                        </Link>
                      }
                      description={`Due Date: ${assignment.SubmissionDeadline}`}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Text>No assignments available</Text>
            )}
            {activeTabKey === "2" && (
              <div style={{ marginTop: "24px" }}>
                <Button type="primary" onClick={showAssignmentModal}>
                  Add New Assignment
                </Button>
              </div>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Students" key="3">
            {students.length > 0 ? (
              <List
                bordered
                dataSource={students}
                renderItem={(student) => (
                  <List.Item>
                    <List.Item.Meta
                      title={student.name}
                      description={student.email}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Text>No students enrolled</Text>
            )}
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <AddLessonModal
        visible={isLectureModalOpen}
        onClose={handleModalCancel}
        confirmLoading={confirmLoading}
        courseId={id}
      />

      <AddAssignmentModal
        visible={isAssignmentModalOpen}
        onClose={handleModalCancel}
        confirmLoading={confirmLoading}
        courseId={id}
      />
    </div>
  );
};

export default CourseDetailPage;
