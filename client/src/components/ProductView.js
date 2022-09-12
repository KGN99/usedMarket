import React from "react";
import { Card } from "antd";
import { API_HOST } from "utils/Constants";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function Product({ product }) {
  const navigate = useNavigate();
  const { id, product_name, images, product_price, created_at } = product;
  const onClick = () => {
    navigate(`/contents/products/${id}`);
  };
  return (
    <div>
      <Card
        style={{ height: 300, width: 155, marginRight: 15, marginTop: 15 }}
        className="product_card"
        hoverable
        onClick={onClick}
        cover={
          <img
            src={API_HOST + images[0].product_image}
            alt={product_name}
            style={{ height: 200, width: 154 }}
          />
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
