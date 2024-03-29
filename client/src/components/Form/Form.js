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
        title:'',
        message:'',
        tags:'',
        selectedFile:'',
    });
    const post = useSelector((state)=> currentId ? state.posts.posts.find((p)=>p._id === currentId): null)

    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(()=>{
        if(post) setPostData(post)
    },[post])

    const submitHandler = (e)=>{
        e.preventDefault()
        if (currentId) {
            dispatch(updatePost(currentId, postData))
            clearHandler()
        }
        else{
            dispatch(createPost({...postData, name:user?.result?.name}))
            clearHandler()
        }
        clearHandler()

    };
    const clearHandler = ()=>{
        setCurrentId(null)
        setPostData({title:'', message:'', tags:'', selectedFile:''})
    }

    if (!user?.result?.name) {
        return  (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">Please Sign In to create your own memories and like others memories!</Typography>
            </Paper>
        )
    }
    return (
     <Paper className={classes.paper} elevation={6}>
         <form autoCapitalize="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={submitHandler}>
             <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
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
