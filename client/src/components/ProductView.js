import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";
import { axiosInstance } from "api";
import { API_HOST } from "utils/Constants";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/ko";
import "scss/ProductView.scss";

moment.locale("ko");

export default function Product({ product }) {
  const navigate = useNavigate();
  const { id, product_name, images, product_price, created_at } = product;
  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };
  const onClick = () => {
    async function productViewAdd() {
      try {
        const method = "POST";
        const response = await axiosInstance({
          url: `/contents/products/${id}/views/`,
          method,
          headers,
        });
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          const { status, data: fieldsErrorMessages } = error.response;
          if (typeof fieldsErrorMessages === "string") {
            notification.open({
              message: "서버 오류",
              description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
              icon: <FrownOutlined style={{ color: "#ff3333" }} />,
            });
          } else {
          }
        }
      }
    }
    productViewAdd();
    navigate(`/contents/products/${id}`);
  };

  return (
    <div>
      <Card
        style={{ height: 270, width: 155, marginRight: 15, marginTop: 15 }}
        className="product_card"
        hoverable
        onClick={onClick}
        cover={
          <div className="img-wrapper">
            <img src={API_HOST + images[0].product_image} alt={product_name} />
          </div>
        }
      >
        <Card.Meta
          title={product_name}
          style={{ textAlign: "left", fontSize: 20 }}
        />
        <p style={{ textAlign: "left", marginTop: 2, fontSize: 20 }}>
          {product_price} 원
        </p>
        <p style={{ textAlign: "left", marginTop: -23 }}>
          {moment(created_at).fromNow()}
        </p>
      </Card>
    </div>
  );
}
