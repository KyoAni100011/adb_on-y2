import React from "react";
import { Modal, Form, Input, DatePicker, message } from "antd";
import moment from "moment";
import { createAssignment } from "../../services/course.service";

const AddAssignmentModal = ({ visible, onClose, confirmLoading, courseId }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Gọi hàm API để tạo bài tập
      await createAssignment({
        courseId: courseId, // Sử dụng courseId từ prop
        title: values.title,
        description: values.description,
        imageName: values.imageName,
        imageURL: values.imageURL,
        videoName: values.videoName,
        videoURL: values.videoURL,
        text: values.text,
        submissionDeadline: values.dueDate.toISOString(), // Chuyển đổi datetime thành ISO string
      });

      form.resetFields();
      onClose();
      message.success("Assignment added successfully");
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  return (
    <Modal
      title="Add New Assignment"
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      width={800}
    >
      <Form form={form} layout="vertical" initialValues={{ dueDate: moment() }}>
        <Form.Item
          name="title"
          label="Assignment Title"
          rules={[
            { required: true, message: "Please enter the assignment title" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="imageName"
          label="Image Name"
          rules={[{ required: true, message: "Please enter the image name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imageURL"
          label="Image URL"
          rules={[{ required: true, message: "Please enter the image URL" }]}
        >
          <Input placeholder="Enter the URL of the image" />
        </Form.Item>
        <Form.Item
          name="videoName"
          label="Video Name"
          rules={[{ required: true, message: "Please enter the video name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="videoURL"
          label="Video URL"
          rules={[{ required: true, message: "Please enter the video URL" }]}
        >
          <Input placeholder="Enter the URL of the video" />
        </Form.Item>
        <Form.Item
          name="text"
          label="Text"
          rules={[{ required: true, message: "Please enter the text" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Submission Deadline"
          rules={[{ required: true, message: "Please select the due date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAssignmentModal;
