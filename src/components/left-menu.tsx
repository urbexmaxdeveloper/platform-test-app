import React, { useState } from "react";
import { Drawer, Menu, Button, Row, Col } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

type MenuItem = {
  label: string;  //наименование пункта меню
  key: string; //ключ
  onClick?: () => void;
};

type LeftMenuProps = {
  applicationName?: string; //наименование приложения
  userInfo?: string; //фио пользователя
  menuItems: MenuItem[];  //элементы меню
  onMenuItemClick?: (key: string) => void;
};

export const LeftMenu: React.FC<LeftMenuProps> = ({
  applicationName = "Наименование приложения",
  userInfo = "Информация о пользователе",
  menuItems,
  onMenuItemClick,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  const handleMenuClick = (key: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(key);
    }
    setVisible(false); // Закрыть меню после выбора
  };

  return (
    <>
      <Button
        type="primary"
        icon={visible ? <CloseOutlined /> : <MenuOutlined />}
        onClick={toggleDrawer}
      ></Button>
      <Drawer
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        open={visible}
        width={300}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "20px" }}
        >
          <Col>
            <div>{applicationName}</div>
          </Col>
          <Col>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
            />
          </Col>
        </Row>
        <div style={{ marginBottom: "20px" }}>
          <strong>{userInfo}</strong>
        </div>
        <Menu mode="vertical">
          {menuItems.map((item) => (
            <Menu.Item key={item.key} onClick={() => handleMenuClick(item.key)}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};
