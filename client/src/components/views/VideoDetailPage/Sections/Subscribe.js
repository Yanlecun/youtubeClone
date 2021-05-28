import axios from "axios";
import React,{useEffect, useState} from "react";
import {withRouter} from "react-router-dom"

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)
  //const [UserTo, setUserTo] = useState(null)
  console.log(props.userTo)

  useEffect(() => {
    let variable = { userTo: props.userTo };
    axios.post("/api/subscribe/subscribeNumber", variable)
        .then((res) => {
            if (!res.data.success) alert("구독자수 얻기 실패!");
            setSubscribeNumber(res.data.subscribeNumber)
        });

    let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem("userId")}
    axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(res => {
          if(!res.data.success) alert('정보 받아오지 못 했습니다.')
          
          setSubscribed(res.data.subscribed)
        })
        
  }, [props]);  
  const onSubscribe = () => {

    let variable = {
      userTo : props.userTo,
      userFrom: localStorage.getItem("userId")
    }
    if(Subscribed) {
      axios.post('/api/subscribe/unsubscribe',variable)
        .then(res => {
          if(!res.data.success) alert("구독취소 실패")
            setSubscribeNumber(SubscribeNumber -1)
            setSubscribed(!Subscribed)
        })
    } else {
      axios.post('/api/subscribe/subscribing',variable)
        .then(res => {
          if(!res.data.success) alert("구독하기 실패")
          setSubscribeNumber(SubscribeNumber +1)
          setSubscribed(!Subscribed)
        })
    }
  }
  return (
    <div>
      <button
        style={{
          backgroundColor: Subscribed? "#AAAAAA": "#CC0000",
          borderRadius: "4px",
          color: "white",
          padding: "10px 4px",
          fontWeight: "500",
          textTransform: "uppercase",
          fontSize: "1rem",
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'subscribe'}
      </button>
    </div>
  );
}

export default withRouter(Subscribe);
