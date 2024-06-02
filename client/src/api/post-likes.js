import { api } from "./api";

export const addLike = async ( token, postId, userLikeId ) => {      
    const { data } = await api.post(`/post/like/addLike/${ postId }/${ userLikeId }`, {} ,{
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const disLike = async ( token, postId, postLikeId ) => {      
    const { data } = await api.delete(`/post/like/disLike/${ postId }/${ postLikeId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getLikesByUserId = async ( token, userId ) => {      
    const { data } = await api.get(`/post/like/getLikesByUserId/${ userId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getLikesByPostId = async ( token, postId ) => {      
    const { data } = await api.get(`/post/like/getLikesByPostId/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}