import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_HOST } from "utils/Constants";
import { getUserData } from "utils/storage/Cookie";
import {
  HeartFilled,
  EyeFilled,
  ClockCircleFilled,
  FrownOutlined,
} from "@ant-design/icons";
import "scss/ProductDetail.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance, useAxios } from "api";
import { Button, notification } from "antd";
import SimpleImageSlider from "react-simple-image-slider";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export default function ProductDetail({ product }) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [fieldErrors, setFieldErrors] = useState({});
  const logedUserPk = getUserData();
  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [{ data, loading, error }, refetch] = useAxios({
    url: `/contents/products/${params.id}/`,
    headers,
  });
  if (data) {
    const {
      id,
      writer,
      product_name,
      product_price,
      product_condition,
      exchange_or_not,
      trading_location,
      product_desc,
      images,
      product_count,
      created_at,
    } = data;

    const { id: user_id, username, avatar_url } = writer;
    const slider_images = images.map((image) => ({
      url: API_HOST + image.product_image,
    }));
    const deleteOnClick = async () => {
      if (window.confirm("정말 삭제합니까?")) {
        try {
          const response = await axiosInstance.delete(
            `/contents/products/${id}`,
            {
              headers,
            }
          );
          console.log("success response :", response);
          navigate("/");
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
      } else {
        alert("취소합니다.");
      }
    };
    return (
      <div className="product_detail_main">
        <hr style={{ width: "100%" }} size="1" color="#000000" />
        <div style={{ display: "flex" }}>
          <div className="img-wrapper">
            <SimpleImageSlider
              width={400}
              height={400}
              images={slider_images}
              showBullets={true}
              showNavs={true}
            />
          </div>
          <div className="product_related">
            <div className="product_related_first">
              <div>{product_name}</div>
              <div>{product_price}&nbsp;원</div>
            </div>
            <hr style={{ width: "100%" }} size="1" color="#bbbbbb" />
            <div className="product_related_second" style={{ display: "flex" }}>
              <div style={{ marginRight: 15 }}>
                <HeartFilled />
                &nbsp;&nbsp; 추후 구현 &nbsp;&nbsp; |&nbsp;&nbsp;
                <EyeFilled />
                &nbsp;&nbsp; 추후 구현 &nbsp;&nbsp;|&nbsp;&nbsp;
                <ClockCircleFilled />
                &nbsp;&nbsp;
                <span>{moment(created_at).fromNow()}</span>
              </div>
            </div>
            <div className="product_related_third" style={{ display: "flex" }}>
              <p style={{ width: 80 }}>&bull;상품상태&nbsp;&nbsp;</p>
              {product_condition}
            </div>
            <div style={{ display: "flex" }}>
              <p style={{ width: 80 }}>&bull;교환여부&nbsp;&nbsp;</p>
              {exchange_or_not}
            </div>
            <div style={{ display: "flex" }}>
              <p style={{ width: 80 }}>&bull;거래지역&nbsp;&nbsp;</p>
              {trading_location}
            </div>
            <div className="product_related_button">
              {parseInt(logedUserPk) === user_id ? (
                <div>
                  <Button
                    style={{
                      marginTop: 20,
                      marginRight: 20,
                      backgroundColor: "#dddddd",
                      width: 180,
                      height: 53,
                      fontSize: 20,
                      color: "white",
                    }}
                    onClick={() => navigate(`update`)}
                  >
                    수정하기
                  </Button>
                  <Button
                    style={{
                      marginTop: 20,
                      backgroundColor: "orange",
                      width: 180,
                      height: 53,
                      fontSize: 20,
                      color: "white",
                    }}
                    onClick={deleteOnClick}
                  >
                    삭제하기
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    style={{
                      marginTop: 20,
                      marginRight: 20,
                      backgroundColor: "#dddddd",
                      width: 180,
                      height: 53,
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    <HeartFilled />찜
                  </Button>
                  <Button
                    style={{
                      marginTop: 20,
                      backgroundColor: "orange",
                      width: 180,
                      height: 53,
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    채팅하기
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr style={{ width: "100%" }} size="1" color="#000000" />
        <div className="product_detail_bottom">
          <p>상품정보</p>
          <hr style={{ width: "100%" }} size="1" color="#dddddd" />
          <div className="product_desc">{product_desc}</div>
          <div>{product_count}</div>
        </div>
        <hr style={{ width: "100%" }} size="1" color="#000000" />
        <div className="product_detail_bottom">
          <p>댓글</p>
          <hr style={{ width: "100%" }} size="1" color="#dddddd" />
          <div className="comment"></div>
        </div>
      </div>
    );
  }
}
