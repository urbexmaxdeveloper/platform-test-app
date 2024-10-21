import React from "react";
import { Breadcrumb } from "antd";

type Crumb = {
  label: string;
  href?: string;
};

type BreadCrumbsProps = {
  crumbs: Crumb[]; //массив "крошек", лейбл и опционально ссылка
  separator?: React.ReactNode; //разделитель
  className?: string; //дополнительные стили
};

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  crumbs,
  separator = "/",
  className = "",
}) => {
  return (
    <Breadcrumb separator={separator} className={className}>
      {crumbs.map((crumb, index) => (
        <Breadcrumb.Item key={index}>
          {crumb.href ? (
            <a href={crumb.href}>{crumb.label}</a>
          ) : (
            <span>{crumb.label}</span>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
