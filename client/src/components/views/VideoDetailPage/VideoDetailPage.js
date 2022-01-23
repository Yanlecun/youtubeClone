import React, { useEffect, useState } from "react";
import { Row, Col, Avatar, Card, List } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import NavBar from "../NavBar/NavBar";


const { Meta } = Card;

function VideoDetailPage(props) {
  const [VideoDetails, setVideoDetails] = useState([null]);
  const [CommentList, setCommentList] = useState([]);

  // App.js에서 라우팅에 videoId를 이용해서 쉽게 읽어올 수 있음
  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (!res.data.success) {
        alert("비디오 가져오기 실패!");
      }
      setVideoDetails(res.data.video);
    });


    axios.post('/api/comment/getComments', variable)
      .then(res => {

        if(res.data.success) {
          setCommentList(res.data.comments)
        } else {
          alert('코멘트 정보를 가져오는 것을 실패하였음')
        }
      })
  }, []);
  
  const videoId = props.match.params.videoId;
  const variable = { videoId};
  const refreshComment = (newComment) => {
    setCommentList(CommentList.concat(newComment))
  }


  if (VideoDetails.writer) {
    const subscribeButton = VideoDetails.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe userTo={VideoDetails.writer._id} />
    );
    return (
      <div>
        <NavBar />
        <Row gutter={[16, 32]}>
          <Col lg={18} xs={24}>
            <div style={{ width: "100%", padding: "3rem 4rem" }}>
              <video
                style={{ width: "100%", height: "50%" }}
                src={`http://localhost:5000/${VideoDetails.filePath}`}
                controls
              />

              <List.Item actions={[subscribeButton]}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={VideoDetails.writer && VideoDetails.writer.image}
                    />
                  }
                  title={VideoDetails.title}
                  description={VideoDetails.description}
                />
              </List.Item>

              {/* Comment */}
              <Comment commentList={CommentList} refreshComment={refreshComment} postId = {videoId} />
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo id={variable} />
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default withRouter(VideoDetailPage);
