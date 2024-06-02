import { api } from "./api";

export const commentOnPost = async ( token, postId, dataPost ) => {
    const { data } = await api.post(`/post/comment/create/${ postId }`, dataPost, {
        headers: {
            "x_token": token,
            "Content-Type": "multipart/form-data",
        }   
    });
    return data;
}

export const getCommentsByPostId = async ( token, postId ) => {      
    const { data } = await api.get(`/post/comment/getCommentsByPostId/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}


export const getComments = async ( token ) => {      
    const { data } = await api.get(`/post/comment/getAll`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}