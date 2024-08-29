import React from "react";
import { Modal, Form, Input, DatePicker, message } from "antd";
import moment from "moment";
import { createLesson } from "../../services/course.service";

const AddLessonModal = ({ visible, onClose, confirmLoading, courseId }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Gọi hàm API để tạo bài học
      await createLesson({
        courseId: courseId, // Sử dụng courseId từ prop
        title: values.title,
        description: values.description,
        imageName: values.imageName,
        imageURL: values.imageURL,
        videoName: values.videoName,
        videoURL: values.videoURL,
        startTime: values.startTime.toISOString(), // Chuyển đổi datetime thành ISO string
        endTime: values.endTime.toISOString(), // Chuyển đổi datetime thành ISO string
      });

      form.resetFields();
      onClose();
      message.success("Lesson added successfully");
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  return (
    <Modal
      title="Add New Lesson"
      open={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ startTime: moment(), endTime: moment() }}
      >
        <Form.Item
          name="title"
          label="Lesson Title"
          rules={[{ required: true, message: "Please enter the lesson title" }]}
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
          name="startTime"
          label="Start Date & Time"
          rules={[
            {
              required: true,
              message: "Please select the start date and time",
            },
          ]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="End Date & Time"
          rules={[
            { required: true, message: "Please select the end date and time" },
          ]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLessonModal;
