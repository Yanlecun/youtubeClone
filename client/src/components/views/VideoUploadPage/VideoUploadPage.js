import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from 'react-redux'
import { withRouter} from 'react-router-dom'
const { TextArea } = Input;
const { Title } = Typography;



const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 3, label: "Music" },
  { value: 4, label: "Game" },
];
function VideoUploadPage(props) {
  const user = useSelector(state => state.user);

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

  const [FilePath, setFilePath] = useState("");
  const [Duaration, setDuaration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    // console.log(file)해보면 내가 올린 동영상에 대한 정보가 담겨 있음
    formData.append("file", files[0]);
    // 파일 보낼 때 헤더에 content-type를 보내줘야 오류가 안 남
    axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      if (!res.data.success) {
        alert("비디오 업로드 실패");
      }
      let variable = {
        url: res.data.url,
        fileName: res.data.fileName,
      };
      //썸네일 얻어오기
      axios.post("/api/video/thumbnail", variable).then((res) => {
        if (!res.data.success) {
          alert("썸네일 생성 실패");
        }
        setDuaration(res.data.fileDuaration);
        setThumbnailPath(res.data.url);
      });
    });
  };


  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      // 리덕스에 저장된 유저 데이터를 읽어오기 위해 redux의 useSelector사용
      // user에 저장 후에 읽어오기
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      parivacy: Private,
      filePath: FilePath, 
      category: Category,
      duration: Duaration,
      thumbnail: ThumbnailPath,
    }
    axios.post('/api/video/uploadvideo', variables)
      .then(res => {
        if(!res.data.success) alert('비디오 업로드에 실패')
        message.success("비디오 업로드 성공!")
        setTimeout(() => {
          props.history.push('/')
        }, 3000)
      })
  }
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBotton: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop zone */}
          {/* multiple은 한 번에 여러개 o/x, maxSize는 최대 크기 */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgrey",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
          {ThumbnailPath && 
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="thumbnail"
              />
            </div>
          }
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {/* 익명함수 {}말고 ()쓰는 거 주의 */}
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default withRouter(VideoUploadPage);
