import React, {useState, useEffect} from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import {Row, Col, Typography, Card, Avatar} from "antd";
import axios from "axios";
import moment from 'moment';

const {Title} = Typography;
const {Meta } = Card;

function LandingPage() {
  const [Videos, setVideos] = useState([]);
  // MongoDB에서 비디오 데이터 갖고 오기
  // 리액트훅 ; DOM이 load되자마자 호출되며, 끝에 ,[]) 꼬랑지 없으면 무한반복함
  // 클래스 방식에서는 componenetDidMount = () => {...}
  useEffect(() => {
    axios.get('/api/video/getVideos')
    .then(res => {
      if(!res.data.success) {
        alert('비디오 가져오기 실패!')
      }
      setVideos(res.data.videos);
    })
  }, [])
  // const renderCards = Videos.map((video,index) => {
  //   //duration은 seconds단위로 계산되어 있음
  //   var minutes = Math.floor(video.duration / 60);  
  //   var seconds = Math.floor((video.duration - minutes * 60));
  //   return <Col key={index} lg={6} mg={8} xs={24}>
  //     <a href={`/video/post/${video._id}`}> 
  //       <div style={{ position: 'relative'}}>
  //         <img style={{width: "100%"}} src={`http://localhost:5000/${video.Thumbnail}`} alt=""/>
  //         <div className="duration">
  //           <span>{minutes}:{seconds}</span>
  //         </div>
  //         <div className="duration"></div>
  //       </div>
  //     </a>
  //     <br />
  //     {/* Avatar = UserImage */}
  //     <Meta description="" title={video.title} avatar={
  //         <Avatar src={video.writer.image}/> 
  //     } />
  //     <span>{video.writer.name}</span>
  //     <span style={{marginLeft: "3rem"}}>{video.views}Views</span> - <span>{moment(video.createdAt).format("MM월 DD일 YY")}</span>
  //   </Col>
  // })  ;

  return (
    <React.Fragment>
      <NavBar />
      <div
        style={{
          width: "85%",
          margin: "3rem auto",
        }}
      >
        <Title level={2}>Recommended</Title>
        <hr />
        <Row gutter={[32, 16]}>
          {Videos &&
            Videos.map((video,index) => {
              var minutes = Math.floor(video.duration / 60);  
              var seconds = Math.floor((video.duration - minutes * 60));
              console.log(video)

              return <Col key={index} lg={6} mg={8} xs={24}>
                <a href={`/video/${video._id}`}> 
                  <div style={{ position: 'relative'}}>
                    <img style={{width: "100%"}} src={`http://localhost:5000/${video.thumbnail}`} alt=""/>
                    <div className="duration">
                      <span>{minutes}분 {seconds}초</span>
                    </div>
                  </div>
                </a>
                <br />
                <Meta description="" title={video.title} avatar={
                    <Avatar src={video.writer.image}/> 
                } />
                <span>{video.writer.name}</span><br/>
                <span style={{marginLeft: "3rem"}}> {video.views} Views </span> - <span>{moment(video.createdAt).format("MM월 DD일 YY")}</span>
              </Col>
            })}
          </Row>
        {/* <Row gutter={[32,16]}>
          {renderCards}
        </Row> */}
        
      </div>
    </React.Fragment>
  );
}

export default withRouter(LandingPage);
