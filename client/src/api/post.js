
import { api } from "./api";

export const createPost = async ( token, dataPost ) => {
    const { data } = await api.post('/post/create', dataPost, {
        headers: {
            "x_token": token,
            "Content-Type": "multipart/form-data",
        }   
    });
    return data;
}

export const deletePost = async ( token, postId ) => {      
    const { data } = await api.delete(`/post/delete/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getPosts = async ( token) => {      
    const { data } = await api.get(`/post/getAll/`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getPostsOfFollowings = async ( token ) => {      
    const { data } = await api.get(`/post/getPostsOfFollowings`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getPostsByUserId = async ( token, userId ) => {      
    const { data } = await api.get(`/post/getPostsByUserId/${ userId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getPostById = async ( token, postId ) => {      
    const { data } = await api.get(`/post/getPostByPostId/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}


