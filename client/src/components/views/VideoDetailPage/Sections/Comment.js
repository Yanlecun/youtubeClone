import axios from 'axios';
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import SingleComment from "./SingleComment";


function Comment(props) {
    const user = useSelector(state => state.user) 
    const videoId = props.postId

    const [commentValue, setcommentValue] = useState("");
    const handleClick = event => {
        setcommentValue(event.currentTarget.value);
    };
    const onSubmit = event => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id, // REDUX사용
            postId: videoId
        }
        axios.post('api/comment/saveComment', variables)
        .then(response => {
            if(!response.data.success) {
                alert('댓글을 저장하지 못했습니다.');
            }
        })
    };
    return (
        <div>
            <br />
            <p> replise</p>
            <hr />
            <SingleComment />

            <form style={{display: 'flex'}} onsubmit >
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 작성해주세요"
                />
                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit} >댓글 작성</button>

            </form>
        </div>
    )
}

export default Comment
