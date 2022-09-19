import React from "react";
import { API_HOST } from "utils/Constants";
import { Avatar, Comment as AntdComment, Tooltip } from "antd";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export default function Comment({ comment }) {
  const {
    author: { username, avatar_url },
    message,
    created_at,
    updated_at,
  } = comment;

  return (
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
  );
}
