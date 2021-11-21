import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:'',
    });
    const post = useSelector((state)=> currentId ? state.posts.find((p)=>p._id === currentId): null)

    useEffect(()=>{
        if(post) setPostData(post)
    },[post])

    const submitHandler = (e)=>{
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData))
        }
        else{
            dispatch(createPost(postData));
        }
        clearHandler()

    };
    const clearHandler = ()=>{
        setCurrentId(null)
        setPostData({creator:'', title:'', message:'', tags:'', selectedFile:''});
    }
    return (
     <Paper className={classes.paper}>
         <form autoCapitalize="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={submitHandler}>
             <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
             <TextField name="creator" outlined="true" label="Creator" fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData, creator:e.target.value})}/>
             <TextField name="title"  outlined="true" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}/>
             <TextField name="message"  outlined="true" label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}/>
             <TextField name="tags"  outlined="true" label="Tags (separeted by comma)" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})}/>
             <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
             <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
             <Button variant="contained" color="secondary" size="small" onClick={clearHandler} fullWidth>Clear</Button>
         </form>
     </Paper>
    )
}

export default Form
