import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };

  return (
    <div>
      <div
        style={{
          fontSize: 25,
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        잘못 된 요청입니다.
      </div>
      <div
        style={{
          fontSize: 25,
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <a onClick={onClick}>홈으로 돌아가기</a>
      </div>
    </div>
  );
}
