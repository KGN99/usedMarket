import React, { useState } from "react";
import { getUserData } from "utils/storage/Cookie";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API_HOST } from "utils/Constants";
import { Upload, notification, Select, Input, Radio, Button, Form } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance, useAxios } from "api";
import "scss/ProductCreate.scss";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

export default function ProductUpdate({ data }) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
    product_category,
    created_at,
  } = data;
  const { id: user_id } = writer;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const logedUserPk = getUserData();
  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [conditionValue, setConditionValue] = useState(product_condition);
  const [exchangeValue, setExchangeValue] = useState(exchange_or_not);
  const [nameValue, setNameValue] = useState(product_name);
  const [categoryValue, setCategoryValue] = useState(product_category);
  const [locationValue, setLocationValue] = useState(trading_location);
  const [priceValue, setPriceValue] = useState(product_price);
  const [descValue, setDescValue] = useState(product_desc);
  const [countValue, setQuantityValue] = useState(product_count);
  const [fileList, setFileList] = useState([
    images.map((image) => ({
      uid: image.id,
      name: image.id,
      status: "done",
      url: API_HOST + image.product_image,
    })),
  ]);
  const conditionOnChange = (e) => {
    setConditionValue(e.target.value);
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
      product_name: form_product_name,
      product_category: form_product_category,
      trading_location: form_trading_location,
      product_condition: form_product_condition,
      exchange_or_not: form_exchange_or_not,
      product_price: form_product_price,
      product_desc: form_product_desc,
      product_count: form_product_count,
    } = fieldValues;

    const formData = new FormData();
    formData.append("product_name", form_product_name);
    formData.append("product_category", form_product_category);
    formData.append("trading_location", form_trading_location);
    formData.append("product_condition", form_product_condition);
    formData.append("exchange_or_not", form_exchange_or_not);
    formData.append("product_price", form_product_price);
    formData.append("product_desc", form_product_desc);
    formData.append("product_count", form_product_count);
    fileList.forEach((file) => {
      formData.append("product_image", file.originFileObj);
    });
    try {
      const response = await axiosInstance.put(
        `/contents/products/${params.id}/`,
        formData,
        {
          headers,
        }
      );
      navigate(`/contents/products/${params.id}`);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        if (fieldsErrorMessages) {
          notification.open({
            message: "서버 오류",
            description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        } else {
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
              <Form.Item name="product_name" initialValue={product_name}>
                <Input
                  onChange={nameOnChange}
                  value={nameValue}
                  style={{ width: "500px", height: "40px", right: "30px" }}
                />
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>카테고리</p>
              <Form.Item
                name="product_category"
                initialValue={product_category}
              >
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
              <Form.Item
                name="trading_location"
                initialValue={trading_location}
              >
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
              <Form.Item
                name="product_condition"
                initialValue={product_condition}
              >
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
              <Form.Item name="exchange_or_not" initialValue={exchange_or_not}>
                <Radio.Group onChange={exchangeOnChange} value={exchangeValue}>
                  <Radio value={"교환불가"}>교환불가</Radio>
                  <Radio value={"교환가능"}>교환가능</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="product_form" style={{ height: 60 }}>
              <p>가격</p>
              <Form.Item name="product_price" initialValue={product_price}>
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
              <Form.Item name="product_desc" initialValue={product_desc}>
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
              <Form.Item name="product_count" initialValue={product_count}>
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
