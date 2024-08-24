import React from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { deleteItem } from "../utils/localStorage";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeaderLecturer = () => {
  const handleLogOut = () => {
    deleteItem("User");
    window.location.href = "/";
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/lecturer/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/lecturer/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={handleLogOut}
        key="2"
        style={{
          color: "red",
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#001529", // Dark background for better contrast
        padding: "0 20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo and Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          className="logo"
          style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}
        >
          LOGO
        </div>
        <Link to="/lecturer/new-course">
          <Button type="link" style={{ color: "#fff" }}>
            Add Course
          </Button>
        </Link>
      </div>

      {/* Right Side Actions */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            icon={<UserOutlined />}
            type="link"
            style={{ color: "#fff", display: "flex", alignItems: "center" }}
          >
            User <DownOutlined style={{ marginLeft: "8px" }} />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeaderLecturer;
