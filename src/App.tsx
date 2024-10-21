import React, { useState } from "react";
import { BreadCrumbs } from "./components/bread-crumbs";
import { LeftMenu } from "./components/left-menu";
import { RegisterView } from "./components/register-view";
import appStyles from "./app.module.css"; // Импортируем стили приложения

const crumbs = [
  { label: "Главная", href: "/" },
  { label: "Профиль", href: "/profile" },
  { label: "Настройки" },
];

const menuItems = [
  { key: "1", label: "Главная", onClick: () => console.log("Главная") },
  { key: "2", label: "Профиль", onClick: () => console.log("Профиль") },
  { key: "3", label: "Реестры", onClick: () => console.log("Реестры") },
  {
    key: "4",
    label: "Рабочие столы",
    onClick: () => console.log("Рабочие столы"),
  },
  { key: "5", label: "Настройки", onClick: () => console.log("Настройки") },
];

const columns = [
  { title: "Имя", dataIndex: "name", key: "name", width: 200 },
  { title: "Возраст", dataIndex: "age", key: "age", width: 100 },
  { title: "Адрес", dataIndex: "address", key: "address", width: 300 },
];

const dataSource = [
  { key: "1", name: "Иван Иванов", age: 32, address: "Москва" },
  { key: "2", name: "Петр Петров", age: 42, address: "Санкт-Петербург" },
  { key: "3", name: "Ольга Смирнова", age: 28, address: "Новосибирск" },
];

const App: React.FC = () => {
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({
    name: 200,
    age: 100,
    address: 300,
  });

  const handleColumnResize = (newWidths: { [key: string]: number }) => {
    setColumnWidths(newWidths);
    console.log("New column widths saved:", newWidths);
  };

  return (
    <>
      <div className={appStyles.header}>
        <LeftMenu
          applicationName="Тестовый стенд"
          userInfo="Иван Иванов"
          menuItems={menuItems}
        />
        <BreadCrumbs crumbs={crumbs} />
      </div>

      <div className={appStyles.content}>
        <RegisterView
          columns={columns}
          dataSource={dataSource}
          columnWidthData={columnWidths}
          onColumnResize={handleColumnResize}
        />
      </div>
    </>
  );
};

export default App;
