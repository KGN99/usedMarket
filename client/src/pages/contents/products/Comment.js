import React, { useState } from "react";
import { API_HOST } from "utils/Constants";
import { useSelector } from "react-redux";
import { getUserData } from "utils/storage/Cookie";
import { axiosInstance } from "api";
import { Avatar, Input, Button, Comment as AntdComment, Tooltip } from "antd";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export default function Comment({ comment }) {
  const [commentContent, setCommentComment] = useState("");
  const logedUserPk = getUserData();
  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };

  const {
    id: comment_id,
    author: { id: author_id, username, avatar_url },
    product: { id: product_id },
    message,
    created_at,
    updated_at,
  } = comment;

  const formData = new FormData();
  formData.append("message", commentContent);

  const commentUpdateOnClick = async () => {
    const apiUrl = `/contents/products/${product_id}/comments/${comment_id}/`;
    try {
      const response = await axiosInstance.put(apiUrl, formData, { headers });
      setCommentComment("");
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  const commentDeleteOnClick = async () => {
    if (window.confirm("정말 삭제합니까?")) {
      const apiUrl = `/contents/products/${product_id}/comments/${comment_id}/`;
      try {
        const response = await axiosInstance.delete(apiUrl, formData, {
          headers,
        });
        window.location.reload();
      } catch (error) {
        console.log(error.response);
      }
    } else {
      alert("취소합니다.");
    }
  };

  const actions = [
    <div>
      <Input onChange={(e) => setCommentComment(e.target.value)} />
      <Button
        type="primary"
        disabled={commentContent.length === 0}
        htmlType="submit"
        onClick={commentUpdateOnClick}
      >
        댓글 수정
      </Button>
    </div>,
    <div style={{ marginLeft: -60 }}>
      <Button type="primary" htmlType="submit" onClick={commentDeleteOnClick}>
        삭제
      </Button>
    </div>,
  ];

  return (
    <>
      {parseInt(logedUserPk) === author_id ? (
        <AntdComment
          actions={actions}
          author={username}
          avatar={<Avatar src={API_HOST + avatar_url} alt={username} />}
          content={message}
          datetime={
            <Tooltip title={moment().format(created_at)}>
              <span>{moment(updated_at).fromNow()}</span>
            </Tooltip>
          }
        />
      ) : (
        <AntdComment
          author={username}
          avatar={<Avatar src={API_HOST + avatar_url} alt={username} />}
          content={message}
          datetime={
            <Tooltip title={moment().format(created_at)}>
              <span>{moment(updated_at).fromNow()}</span>
            </Tooltip>
          }
        />
      )}
    </>
  );
}
