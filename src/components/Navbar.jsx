import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const items = [
  { label: "Home", key: "/", icon: <HomeOutlined /> },
  {
    label: "Cryptocurrencies",
    key: "/cryptocurrencies",
    icon: <FundOutlined />,
  },
  { label: "News", key: "/news", icon: <BulbOutlined /> },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoVerse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          items={items}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
