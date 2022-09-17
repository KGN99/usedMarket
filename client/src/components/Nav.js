import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "scss/Nav.scss";
import { MenuOutlined } from "@ant-design/icons";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  return (
    <div className="nav_menu">
      <MenuOutlined onClick={onClick} />
      {isOpen ? (
        <div className="menu">
          <ul className="menu_list">
            <div className="list_name">전체 리스트</div>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=1");
                onClick();
              }}
            >
              여성의류
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=2");
                onClick();
              }}
            >
              남성의류
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=3");
                onClick();
              }}
            >
              신발
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=4");
                onClick();
              }}
            >
              가방
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=5");
                onClick();
              }}
            >
              시계/쥬얼리
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=6");
                onClick();
              }}
            >
              패션 액세서리
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=7");
                onClick();
              }}
            >
              디지털/가전
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=8");
                onClick();
              }}
            >
              스포츠/레저
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=9");
                onClick();
              }}
            >
              차량/오토바이
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=10");
                onClick();
              }}
            >
              가구/인테리어
            </li>
            <li
              onClick={() => {
                navigate("/contents/products/category?product_category=11");
                onClick();
              }}
            >
              기타
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
