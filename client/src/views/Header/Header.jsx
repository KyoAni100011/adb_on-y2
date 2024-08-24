import React from "react";
import { Layout, Menu, Input, Button, Badge, Dropdown, Flex } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { deleteItem, readItem } from "../../utils/localStorage";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const handleLogOut = () => {
    deleteItem("User");
    window.location.href = "/";
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">Profile</Menu.Item>
      <Menu.Item key="1">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={handleLogOut}
        key="3"
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
        backgroundColor: "#fff",
        padding: "0 20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Thêm shadow
        position: "sticky",
        top: 0,
        zIndex: 1000, // Đảm bảo header luôn nằm trên cùng
      }}
    >
      <div className="logo" style={{ fontSize: "24px", fontWeight: "bold" }}>
        LOGO
      </div>

      {/* Right Side Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* Login and Signup Buttons */}
        {!readItem("User") && (
          <React.Fragment>
            <Link
              to="/join-teaching"
              style={{ textDecoration: "none", fontSize: 15 }}
            >
              Teaching
            </Link>
            <Button type="primary">Login</Button>
            <Button type="default">Sign Up</Button>
          </React.Fragment>
        )}

        {/* Shopping Cart with Badge */}
        <Link to="/shopping-cart">
          <Badge count={5}>
            <ShoppingCartOutlined style={{ fontSize: "20px" }} />
          </Badge>
        </Link>

        {/* User Menu */}
        {readItem("User") && (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<UserOutlined />} type="link">
              User <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
