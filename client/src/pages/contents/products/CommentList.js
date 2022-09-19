import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Alert } from "antd";
import { axiosInstance, useAxios } from "api";
import Comment from "./Comment";

export default function CommentList({ product }) {
  const [commentContent, setCommentComment] = useState("");

  const { accessToken } = useSelector((state) => state.token);
  const headers = { Authorization: `Bearer ${accessToken}` };

  const formData = new FormData();
  formData.append("message", commentContent);

  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `/contents/products/${product.id}/comments/`,
    headers,
  });

  const handleCommentSave = async () => {
    const apiUrl = `/contents/products/${product.id}/comments/`;

    console.group("handleCommentSave");
    try {
      const response = await axiosInstance.post(apiUrl, formData, { headers });
      setCommentComment("");
      refetch();
    } catch (error) {
      console.log(error.response);
    }

    console.groupEnd();
  };

  return (
    <div>
      {commentList && commentList.length === 0 && (
        <Alert
          type="warning"
          message="댓글이 없습니다."
          style={{ marginBottom: 30 }}
        />
      )}
      <div style={{ marginBottom: 30 }}>
        {commentList &&
          commentList.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
      <Input.TextArea
        style={{ marginBottom: ".5em" }}
        value={commentContent}
        onChange={(e) => setCommentComment(e.target.value)}
      />
      <Button
        block
        type="primary"
        disabled={commentContent.length === 0}
        onClick={handleCommentSave}
      >
        댓글 쓰기
      </Button>
    </div>
  );
}
