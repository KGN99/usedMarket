import React, { useState, useCallback } from "react";
import { Form, Input, Button, notification, message, Upload } from "antd";
import { useSelector } from "react-redux";
import { getUserData } from "utils/storage/Cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance, useAxios } from "api";
import {
  LoadingOutlined,
  PlusOutlined,
  FrownOutlined,
} from "@ant-design/icons";

import "scss/Signup.scss";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

export default function ProfileUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from: loginRequiredUrl } = location.state || {
    from: { pathname: "/" },
  };
  const { accessToken } = useSelector((state) => state.token);
  const logedUserPk = getUserData();
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [userNameValue, setUserNameValue] = useState();
  const [fieldErrors, setFieldErrors] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  //닉네임 유효성 검사
  const validateUsername = useCallback((_, value) => {
    if (!value) {
      return Promise.reject(new Error("사용자 이름을 입력해주세요!"));
    }
    if (/\s/.test(value)) {
      return Promise.reject(
        new Error("사용자 이름에는 공백을 포함 할 수 없습니다!")
      );
    }
    let nicknameLength = 0;
    for (let i = 0; i < value.length; i += 1) {
      const char = value.charAt(i);
      if (escape(char).length > 4) {
        nicknameLength += 2;
      } else {
        nicknameLength += 1;
      }
    }
    if (nicknameLength < 2 || nicknameLength >= 20) {
      return Promise.reject(
        new Error("한글1~10자, 영문 및 숫자 2~20자까지 입력가능합니다!")
      );
    }
    const regExp = /[^a-zA-Z0-9가-힣_]/;
    if (regExp.test(value)) {
      return Promise.reject(
        new Error("한글, 영문, 숫자, _ 만 사용할 수 있습니다!")
      );
    }
    return Promise.resolve();
  }, []);

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

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleFinish = async (fieldValues) => {
    const {
      username,
      avatar: { fileList },
    } = fieldValues;

    const formData = new FormData();
    formData.append("username", username);
    fileList.forEach((file) => {
      formData.append("avatar", file.originFileObj);
    });

    try {
      const response = await axiosInstance.put(
        `/accounts/profile/${logedUserPk}/update`,
        formData,
        {
          headers,
        }
      );
      navigate(-1);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        setFieldErrors(
          Object.entries(fieldsErrorMessages).reduce(
            (acc, [fieldName, errors]) => {
              acc[fieldName] = {
                validateStatus: "error",
                help: errors.join(" "),
              };
              return acc;
            },
            {}
          )
        );
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

  const [{ data, loading, error }, refetch] = useAxios({
    url: `/accounts/profile/${logedUserPk}/update`,
    headers,
  });
  if (data) {
    return (
      <div className="signup_field">
        <p style={{ marginLeft: "160px", fontSize: 25 }}>회원정보 수정</p>

        <Form onFinish={handleFinish} autoComplete={"false"}>
          <Form.Item label="아바타 이미지" name="avatar">
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => {
                return false;
              }}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label="사용자 이름"
            name="username"
            initialValue={data.username}
            rules={[{ validator: validateUsername }]}
            hasFeedback
            {...fieldErrors.username}
          >
            <Input
              value={userNameValue}
              style={{ width: "200px", float: "left", marginLeft: 12 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginLeft: "150px" }}
              htmlType="submit"
              type="primary"
            >
              회원정보 수정
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
