import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "utils/storage/Cookie";
import { Input, Space } from "antd";
import { useDispatch } from "react-redux";
import Nav from "./Nav";
import {
  DollarCircleOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "scss/Header.scss";
import { DELETE_TOKEN } from "utils/store/Auth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 스토어 Access Token 정보
  const { accessToken, expireTime } = useSelector((state) => state.token);
  const logedUserPk = getUserData();

  // 로컬스토리지 데이터 조회시 시간 초과하면 초기화
  if (expireTime < new Date().getTime()) {
    dispatch(DELETE_TOKEN());
  }

  const onSearch = (value) => {
    navigate(`/contents/products/search?search=${value}`);
  };
  return (
    <div>
      <div className="top_bar" style={{ marginTop: 20, marginBottom: -15 }}>
        <div className="top_bar_right">
          <Space>
            {accessToken ? (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/accounts/logout")}
              >
                <p>로그아웃</p>
              </div>
            ) : (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/accounts/login")}
              >
                <p>로그인/회원가입</p>
              </div>
            )}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`accounts/${logedUserPk}`)}
            >
              <p>내상점</p>
            </div>
          </Space>
        </div>
      </div>
      <hr size="1" color="#e8e8e8" />

      <div className="header">
        <div className="logo" style={{ cursor: "pointer" }}>
          <p onClick={() => navigate("/")}>중고거래</p>
          <div className="nav">
            <Nav />
          </div>
        </div>
        <div className="search">
          <Input.Search
            name="searchText"
            placeholder="검색어 입력"
            size="large"
            style={{ width: 400 }}
            onSearch={onSearch}
          />
        </div>
        <div className="top_nav">
          <Space>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/contents/products/create")}
            >
              <DollarCircleOutlined />
              판매하기
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`accounts/${logedUserPk}`)}
            >
              <UserOutlined />
              내상점
            </div>
            <div style={{ cursor: "pointer" }}>
              <MessageOutlined />
              채팅목록
            </div>
          </Space>
        </div>
      </div>
      <hr size="1" color="#e8e8e8" />
      <Outlet />
    </div>
  );
}
