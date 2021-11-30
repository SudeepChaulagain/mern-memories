import React, {useState, useRef} from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import {commentPost} from '../../actions/posts'
import useStyles from './styles'
const Comment = ({post}) => {
    const classes = useStyles()
    const dispatch=  useDispatch()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const commentRef = useRef()

    const user = JSON.parse(localStorage.getItem('profile'))

    const commentHandler = async () =>{
       const newComments =  await dispatch(commentPost(post._id, `${user?.result?.name}: ${comment}`))
       setComment('')
       setComments(newComments)
    }
    if(commentRef.current){
        commentRef?.current.scrollIntoView({behavior:'smooth'})
    }
  
    return (
        <div>
          <div className={classes.commentsOuterContainer}>
              <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {comments?.map((comment, index)=>(
                    <Typography key={index} gutterBottom variant="subtitle1">
                        <strong>{comment.split(': ')[0]}</strong>&nbsp;
                        {comment.split(': ') [1]} 
                    </Typography>
                ))}
                <div ref={commentRef}/>

              </div>
              <div style={{width:'70%'}}>
                  <Typography gutterBottom variant="h6">Write a comment</Typography>
                  <TextField fullWidth rows={4} variant="outlined" label="Comment" value={comment} multiline onChange={(e)=> setComment(e.target.value)}/>
                  <br/>
                  <Button style={{marginTop: '10px'}} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={commentHandler}>
                      Comment
                  </Button>
              </div>
          </div>  
        </div>
    )
}

export default Comment
