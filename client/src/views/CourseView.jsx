import React, { useState, useEffect } from "react";
import { Typography, Card, List, Divider, Tabs, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { getCourseDetailsByStudent } from "../services/course.service";
import { readItem } from "../utils/localStorage";

const { Title, Text, Paragraph } = Typography;

const CourseDetailPageForStudent = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("1");

  const defaultImageURL = "https://via.placeholder.com/600x400?text=No+Image";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = readItem("User");
        const courseData = await getCourseDetailsByStudent(id, user.UserId);
        if (courseData) {
          console.log(courseData);
          setCourse(courseData.CourseDetails.CourseDetails);
          setLectures(courseData.CourseDetails.Lessons || []);
          setAssignments(courseData.CourseDetails.Assignments || []);
        }
      } catch (error) {
        message.error("Failed to fetch course data");
      }
    };

    fetchData();
  }, [id]);

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
                        <Link to={`/lesson/${lecture.LessonId}`}>
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
                        <Link to={`/assignment/${assignment.AssignmentId}`}>
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
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default CourseDetailPageForStudent;
