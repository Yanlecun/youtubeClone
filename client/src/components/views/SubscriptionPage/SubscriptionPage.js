import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { Row, Col, Typography, Card, Avatar } from "antd";
import axios from "axios";
import moment from "moment";
import video from "fluent-ffmpeg/lib/options/video";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Videos, setVideos] = useState([]);
  useEffect(() => {
      const subscriptionVariables = {
          userFrom : localStorage.getItem('userId')
      }

    axios
      .post("/api/video/getSubscriptionVideos", subscriptionVariables) // 조건을 가지고 데이터를 가지고 올 경우 property를 담아서 요청해야함
      .then((res) => {
        if (!res.data.success) {
          alert("비디오 가져오기 실패!");
        }
        setVideos(res.data.videos);
      });
  }, []);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col key={index} lg={6} mg={8} xs={24}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt=""
            />
            <div className="duration">
              <span>
                {minutes}분 {seconds}초
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          description=""
          title={video.title}
          avatar={<Avatar src={video.writer.image} />}
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views} Views </span> -{" "}
        <span>{moment(video.createdAt).format("MM월 DD일")}</span>
      </Col>
    );
  });
  return (
    <React.Fragment>
      <NavBar />
      <div
        style={{
          width: "85%",
          margin: "3rem auto",
        }}
      >
        <Title level={2}>Subscribed</Title>
        <hr />

        <Row gutter={[32, 16]}>{renderCards}</Row>
      </div>
    </React.Fragment>
  );
}

export default withRouter(SubscriptionPage);
