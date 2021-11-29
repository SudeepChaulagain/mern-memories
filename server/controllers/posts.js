import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

export const getPosts = async (req, res)=>{
   try {
       const postMessages = await PostMessage.find();
       res.status(200).json(postMessages);

   } catch (error) {
       res.status(404).json({message: error.message})
   }
}

export const createPost = async (req, res) =>{
 const post = req.body;
 const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
  try {
     await newPost.save();
     res.status(201).json(newPost);
     
  } catch (error) {
      res.status(409).json({message: error.message});

      
  }
}

export const updatePost = async (req, res)=>{
  const {id: _id} = req.params

  const post = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No such post exists with id: ${_id}`)

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
  
  res.status(200).json(updatedPost)
}

export const deletePost = async (req, res) =>{
  const {id: _id} = req.params
  
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No such post exists with id: ${_id}`)

  await PostMessage.findByIdAndRemove(_id)

  res.status(200).json({message: 'Post removed successfully!'})
}

export const likePost = async (req, res)=>{
  console.log(req.userId)
  const {id: _id} = req.params
  
  if (!req.userId) {
    return res.status(403).json({message: "Unauthenticated!"})
  }

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No such post exists with id: ${_id}`)

  const post = await PostMessage.findById(_id)

  const index = post.likes.findIndex((id)=> id === String(req.userId))

  if (index === -1) {
    post.likes.push(req.userId)
  }
  else{
    post.likes = post.likes.filter((id)=> id !== String(req.userId))
  }

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post , {new: true})

  res.status(200).json(updatePost)

}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
      const title = new RegExp(searchQuery, "i");

      const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]})

      res.status(200).json(posts)
  } catch (error) {    
      res.status(404).json({ message: error})
  }
}

export const getPost = () =>{
  
}