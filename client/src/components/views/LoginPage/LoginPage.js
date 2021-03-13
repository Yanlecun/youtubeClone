import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';
import {Button, Typography  } from 'antd';

const {Title} = Typography ;

function LoginPage(props) {
    const dispatch = useDispatch();   

    const [Email, setEmail] = useState("") ;
    const [Password, setPassword] = useState("") ;

    const onEmilHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            email: Email,
            password: Password
        }
        // action을 갖고 reducers로 이동 후(index.js에 store정의 있음) Landing이 완료되면 시작 페이지로 이동
        dispatch(loginUser(body))                      //const dispatch = useDispatch(); 
            // return {...state, loginSuccess: action.payload}; 
            .then(res => {
                console.log(res)
            if(res.payload.loginSuccess) {
                //리액트의 페이지 이동 방법
                props.history.push('/')
            } else {
                alert('Error');
            }
        });
    }

    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: '100%', height: '100vh', flexDirection:'column'}}>
        <Title level={2}>Sign In</Title>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
               <label>Email</label>
               <input type="email" value={Email} onChange={onEmilHandler}/>
               <label>Password</label>
               <input type="Password" value={Password} onChange={onPasswordHandler}/>
               <br />
               <Button htmlType="submit">
                   Login
                </Button> 
            </form>
            <a href="/register" style={{marginTop: '20px', color: '#595959', fontSize: '10px'}}>
                Sign Up
            </a>
        </div>
    )
}
export default withRouter(LoginPage)
