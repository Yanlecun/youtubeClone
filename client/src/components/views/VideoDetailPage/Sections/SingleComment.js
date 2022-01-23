import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { useSelector} from 'react-redux'
import axios from 'axios';

const {Textarea } = Input;

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const user = useSelector(state => state.user);

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.CommentValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id, // REDUX사용
      postId: props.postId,
      responseTo : props.comment._id
    };

    axios.post("api/comment/saveComment", variables).then((response) => {
      if (!response.data.success) {
        alert("댓글을 저장하지 못했습니다.");
      }
      props.refreshComment(response.data.Comment)
      setCommentValue("")
    });
  };

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      답글 달기
    </span>
  ];

  return (
    <div>
      <Comment actions={actions} author={props.comment.writer.name} content={<p>{props.comment.content}</p>} avater={<Avatar src alt />} />
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <Textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="댓글을 작성해주세요"
          />
          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            댓글 작성
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
