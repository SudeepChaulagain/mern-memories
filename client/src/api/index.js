import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

//posts urls
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const createPost = (newPost)=> API.post('/posts', newPost)
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost)
export const deletePost = (id)=> API.delete(`/posts/${id}`)
export const likePost = (id)=> API.patch(`/posts/${id}/likePost`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

//auth urls
export const signIn = (formData)=> API.post('/user/signin', formData)
export const signUp = (formData)=> API.post('/user/signup', formData)