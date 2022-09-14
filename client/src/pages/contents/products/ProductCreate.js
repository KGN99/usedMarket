import React, { useState } from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { Upload, notification, Select, Input, Radio, Button, Form } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "api";
import ImgCrop from "antd-img-crop";
import "scss/ProductCreate.scss";
import "antd/es/modal/style";
import "antd/es/slider/style";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

export default function ProductCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const { from: loginRequiredUrl } = location.state || {
    from: { pathname: "/" },
  };

  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [conditionValue, setConditionValue] = useState("used");
  const [exchangeValue, setExchangeValue] = useState("non_exchangeable");
  const [deliveryValue, setDeliveryValue] = useState("not_included");
  const [nameValue, setNameValue] = useState();

  const [categoryValue, setCategoryValue] = useState("기타");

  const [locationValue, setLocationValue] = useState();

  const [priceValue, setPriceValue] = useState();

  const [descValue, setDescValue] = useState();

  const [countValue, setQuantityValue] = useState(1);

  const conditionOnChange = (e) => {
    setConditionValue(e.target.value);
  };
  const deliveryOnChange = (e) => {
    setDeliveryValue(e.target.value);
  };

  const exchangeOnChange = (e) => {
    setExchangeValue(e.target.value);
  };
  const nameOnChange = (e) => {
    setNameValue(e.target.value);
  };
  const categoryOnChange = (e) => {
    setCategoryValue(e);
  };
  const locationOnChange = (e) => {
    setLocationValue(e.target.value);
  };
  const priceOnChange = (e) => {
    setPriceValue(e.target.value);
  };
  const descOnChange = (e) => {
    setDescValue(e.target.value);
  };
  const countOnChange = (e) => {
    setQuantityValue(e.target.value);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleFinish = async (fieldValues) => {
    const {
      product_name,
      product_category,
      trading_location,
      product_condition,
      exchange_or_not,
      delivery_included,
      product_price,
      product_desc,
      product_count,
    } = fieldValues;

    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_category", product_category);
    formData.append("trading_location", trading_location);
    formData.append("product_condition", product_condition);
    formData.append("exchange_or_not", exchange_or_not);
    formData.append("delivery_included", delivery_included);
    formData.append("product_price", product_price);
    formData.append("product_desc", product_desc);
    formData.append("product_count", product_count);
    fileList.forEach((file) => {
      formData.append("product_image", file.originFileObj);
    });

    try {
      const response = await axiosInstance.post(
        "/contents/products/",
        formData,
        {
          headers,
        }
      );
      console.log("success response :", response);
      navigate(loginRequiredUrl);
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
        }
      }
    }
  };

  return (
    <>
      <div>
        <hr size="1" color="#e8e8e8" />
        <Form onFinish={handleFinish} autoComplete={"false"}>
          <div className="product_create">
            <div className="basic_information">기본정보</div>
            <div className="product_form" style={{ height: "125px" }}>
              <p>상품이미지</p>
              <Form.Item name="product_image">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={() => {
                    return false;
                  }}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>제목</p>
              <Form.Item name="product_name">
                <Input
                  onChange={nameOnChange}
                  value={nameValue}
                  style={{ width: "500px", height: "40px", right: "30px" }}
                />
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>카테고리</p>
              <Form.Item name="product_category" initialValue={11}>
                <Select
                  style={{ width: "150px", height: "40px", right: "30px" }}
                  onChange={categoryOnChange}
                  value={categoryValue}
                  filterOption={false}
                >
                  <Select.Option value={11}>기타</Select.Option>
                  <Select.Option value={1}>여성의류</Select.Option>
                  <Select.Option value={2}>남성의류</Select.Option>
                  <Select.Option value={3}>신발</Select.Option>
                  <Select.Option value={4}>가방</Select.Option>
                  <Select.Option value={5}>시계/쥬얼리</Select.Option>
                  <Select.Option value={6}>패션 액세서리</Select.Option>
                  <Select.Option value={7}>디지털/가전</Select.Option>
                  <Select.Option value={8}>스포츠/레저</Select.Option>
                  <Select.Option value={9}>차량/오토바이</Select.Option>
                  <Select.Option value={10}>가구/인테리어</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>거래지역</p>
              <Form.Item name="trading_location">
                <Input
                  onChange={locationOnChange}
                  value={locationValue}
                  style={{ width: 500, height: 40, right: 30 }}
                  placeholder="거래지역을 입력해주세요."
                />
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>상태</p>
              <Form.Item name="product_condition" initialValue={"중고"}>
                <Radio.Group
                  onChange={conditionOnChange}
                  value={conditionValue}
                >
                  <Radio value={"중고"}>중고상품</Radio>
                  <Radio value={"새상품"}>새상품</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>교환</p>
              <Form.Item name="exchange_or_not" initialValue={"교환불가"}>
                <Radio.Group onChange={exchangeOnChange} value={exchangeValue}>
                  <Radio value={"교환불가"}>교환불가</Radio>
                  <Radio value={"교환가능"}>교환가능</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>배송비</p>
              <Form.Item
                name="delivery_included"
                initialValue={"배송비 미포함"}
              >
                <Radio.Group onChange={deliveryOnChange} value={deliveryValue}>
                  <Radio value={"배송비 미포함"}>배송비 미포함</Radio>
                  <Radio value={"배송비 포함"}>배송비 포함</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>가격</p>
              <Form.Item name="product_price">
                <Input
                  onChange={priceOnChange}
                  value={priceValue}
                  style={{ width: 250, height: 40, right: 30 }}
                  placeholder="숫자만 입력해주세요."
                />
              </Form.Item>
              <p style={{ marginRight: 0 }}>원</p>
            </div>
            <div className="product_form" style={{ height: 165 }}>
              <p>설명</p>
              <Form.Item name="product_desc">
                <Input.TextArea
                  onChange={descOnChange}
                  value={descValue}
                  style={{ width: 710, height: 130, marginLeft: -30 }}
                  showCount
                  maxLength={2000}
                />
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>수량</p>
              <Form.Item name="product_count" initialValue={1}>
                <Input
                  onChange={countOnChange}
                  value={countValue}
                  style={{ width: "250px", height: "40px", right: "30px" }}
                  placeholder="숫자만 입력해주세요."
                />
              </Form.Item>
              개
            </div>
            <div style={{ height: 165 }}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 850, height: 50 }}
                >
                  등록하기
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
