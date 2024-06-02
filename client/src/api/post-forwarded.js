import { api } from "./api";

export const addForwarded = async ( token, postId, userForwardedId ) => {      
    const { data } = await api.post(`/post/forwarded/addForwarded/${ postId }/${ userForwardedId }`, {} ,{
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const deleteForwarded = async ( token, postId, postForwardedId ) => {      
    const { data } = await api.delete(`/post/forwarded/deleteForwarded/${ postId }/${ postForwardedId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getForwardedByUserId = async ( token, userId ) => {      
    const { data } = await api.get(`/post/forwarded/getForwardedByUserId/${ userId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getForwardedByPostId = async ( token, postId ) => {      
    const { data } = await api.get(`/post/forwarded/getForwardedByPostId/${ postId }`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}
