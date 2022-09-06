import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "api";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import "scss/Signup.scss";

export default function PasswordChange() {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };

  //비밀번호 유효성 검사
  const validatePassword = useCallback((_, value) => {
    const regExp = // eslint-disable-next-line
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-z]{1,50})(?=.*[A-Z]{1,50}).{8,50}$/;
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
      const { old_password, new_password1, new_password2 } = values;

      setFieldErrors({});

      const data = { old_password, new_password1, new_password2 };
      try {
        await axiosInstance.post(`accounts/password/change/`, data, {
          headers,
        });

        notification.open({
          message: "비밀번호 변경 성공",
          description: "내 상점으로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        navigate(`/`);
      } catch (error) {
        if (error.response) {
          console.error(error.response);
          notification.open({
            message: "비밀번호 변경 실패",
            description: "비밀번호 정보를 확인해주세요.",
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
          label="현재 비밀번호"
          name="old_password"
          rules={[{ validator: validatePassword }]}
          {...fieldErrors.old_password}
        >
          <Input.Password style={{ width: "240px", float: "right" }} />
        </Form.Item>
        <Form.Item
          label="새 비밀번호"
          name="new_password1"
          rules={[{ validator: validatePassword }]}
          {...fieldErrors.new_password1}
        >
          <Input.Password style={{ width: "240px", float: "right" }} />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="new_password2"
          dependencies={["password"]}
          rules={[{ required: true, message: "비밀번호를 재입력 해주세요!!" }]}
          {...fieldErrors.new_password2}
        >
          <Input.Password style={{ width: "240px", float: "right" }} />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ marginLeft: "150px" }}
            htmlType="submit"
            type="primary"
          >
            비밀번호 변경
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
