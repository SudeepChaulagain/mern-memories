import React from 'react'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'

const Posts = ({setCurrentId}) => {
    const classes = useStyles()
    const posts = useSelector((state)=> state.posts);

    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post)=>(
                    <Grid item xs={12} sm={6} md={6}>
                        <Post key={post._id} post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
       
    )
}

export default Posts
