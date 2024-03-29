import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from "@material-ui/core";
import ChipInput from 'material-ui-chip-input';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const classes = useStyles()
  const query = useQuery()
  const searchQuery = query.get('searchQuery')
  const page = query.get('page') || 1

  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   dispatch(getPosts())
  // }, [dispatch, currentId])

  const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
          searchPost()
      }
  }

  const handleAddChip = (tag) =>{
      setTags([...tags, tag])
  }

  const handleDeleteChip = (chip)=>{
      setTags(tags.filter((tag)=> tag !== chip))
  }

  const searchPost = ()=>{
      if (search.trim() || tags) {
          dispatch(getPostsBySearch({search, tags: tags.join(',')}))
          navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      }
      else{
          navigate('/')
      }
  }
  return (
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            jusify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
                <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" color="primary">Search</Button>
            </AppBar>
           
              <Form setCurrentId={setCurrentId} currentId={currentId} />
              {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Paginate page={page}/>
                </Paper>
              )}
          </Grid>
          </Grid>
        </Container>
      </Grow>
  );
};

export default Home;
