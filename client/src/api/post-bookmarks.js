import { api } from "./api";

export const addBookmark = async ( token, postId, userBookmarkId ) => {      
    const { data } = await api.post(`/post/bookmark/addBookmark/${ postId }/${ userBookmarkId }`, {} ,{
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const deleteBookmark = async ( token, postId, postBookmarkId ) => {      
    const { data } = await api.delete(`/post/bookmark/deleteBookmark/${ postId }/${ postBookmarkId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getBookmarksByUserId = async ( token, userId ) => {      
    const { data } = await api.get(`/post/bookmark/getBookmarksByUserId/${ userId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getBookmarksByPostId = async ( token, postId ) => {      
    const { data } = await api.get(`/post/bookmark/getBookmarksByPostId/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}