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
            videoId
        }
        axios.post('/api/comment/saveComment', variables)
        .then(response => {

            if(!response.data.success) {
                alert('댓글을 저장하지 못했습니다.');
            }
            setcommentValue("")
            props.refreshComment(response.data.result)
        })
    };
    return (
        <div>
            <br />
            <p> 답글</p>
            <hr />
            {props.commentList && props.commentList.map((comment,index) => {
                (!comment.responseTo &&
                <SingleComment comment={comment} postId={props.postId} refreshComment={props.refreshComment} />
                )
            })}
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
