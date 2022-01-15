import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom"
import axios from "axios";

function SideVideo(props) {
  console.log(props.id)

  const [sideVideos, setsideVideos] = useState([]);
  // MongoDB에서 비디오 데이터 갖고 오기
  // 리액트훅 ; DOM이 load되자마자 호출되며, 끝에 ,[]) 꼬랑지 없으면 무한반복함
  // 클래스 방식에서는 componenetDidMount = () => {...}
  useEffect(() => {
    axios.get("/api/video/getVideos")
    .then((res) => {
      if (!res.data.success) {
        alert("비디오 가져오기 실패!");
      }
      setsideVideos(res.data.videos);
    });
  }, []);
  // 여러 개의 카드들이 필요하니 map메소드 사용
  const renderSideVideo = '';
  return (
    <React.Fragment>
      <div style={{margin: '3rem'}}>
        {sideVideos && sideVideos.map((video, index) => {
          var minutes = Math.floor(video.duration / 60);
          var seconds = Math.floor(video.duration - minutes * 60);
          if(video._id === props.id.videoId)  return;
          return (
            <div style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}>
              <div style={{ width: "40%", marginRight: "1rem" }}>
                <a href={`/video/${video._id}`}>
                  <img
                      style={{ width: "100%", height: "100%" }}
                      src={`http://localhost:5000/${video.thumbnail}`}
                      alt="thumbNail"
                    />
                </a>
              </div>
              <div style={{ width: "85%"}}>
                  <a href style={{color: 'grey'}}>
                    <span style={{ fontSize: "1rem", color: "#000" }}>{video.title}</span><br />
                    <span>{video.writer.name}</span><br />
                    <span> {video.views} views</span><br />
                    <span>0{minutes} : 0{seconds}</span>
                  </a>
              </div>
            </div>
            )
          })}
      </div>
    </React.Fragment>)
}
export default withRouter(SideVideo);
