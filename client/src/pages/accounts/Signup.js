import React, { useState, useCallback } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "api";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import "scss/Signup.scss";

export default function Signup() {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

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

  //비밀번호 유효성 검사
  const validatePassword = useCallback((_, value) => {
    // eslint-disable-next-line
    const regExp =
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-z]{1,50})(?=.*[A-Z]{1,50}).{8,50}$/; /* eslint-disable-line */
    if (!value) {
      return Promise.reject(new Error("비밀번호를 입력해주세요!"));
    }
    if (!regExp.test(value)) {
      return Promise.reject(
        new Error(
          "비밀번호는 8~50자이며 영문 소문자, 영문 대문자, 숫자, 특수문자를 모두 포함해야 합니다!"
        )
      );
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values) => {
    async function fn() {
      const { email, password1, password2, username } = values;

      setFieldErrors({});

      const data = { email, password1, password2, username };

      try {
        await axiosInstance.post("/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        navigate("/accounts/login");
      } catch (error) {
        if (error.response) {
          console.error(error.response);
          notification.open({
            message: "회원가입 실패",
            description: "회원가입 정보를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMessages } = error.response;
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
        }
      }
    }
    fn();
  };

  return (
    <div className="signup_field">
      <p style={{ marginLeft: "160px" }}>회원가입</p>
      <Form onFinish={onFinish} autoComplete={"false"}>
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해주세요!" },
            { type: "email", message: "이메일 형식에 맞게 입력해주세요!" },
          ]}
          hasFeedback
          {...fieldErrors.email}
        >
          <Input style={{ width: "240px", float: "right" }} />
        </Form.Item>
        <Form.Item
          label="사용자 이름"
          name="username"
          rules={[{ required: true, validator: validateUsername }]}
          hasFeedback
          {...fieldErrors.username}
        >
          <Input style={{ width: "240px", float: "right" }} />
        </Form.Item>
        <Form.Item
          label="비밀번호   "
          name="password1"
          rules={[{ required: true, validator: validatePassword }]}
        >
          <Input.Password style={{ width: "240px", float: "right" }} />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="password2"
          dependencies={["password1"]}
          rules={[{ required: true }]}
          {...fieldErrors.non_field_errors}
        >
          <Input.Password style={{ width: "240px", float: "right" }} />
        </Form.Item>

        <Form.Item>
          <Button style={{ marginLeft: "150px" }} htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
