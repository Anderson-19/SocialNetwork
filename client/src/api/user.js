
import { api } from "./api";

export const getUsers = async () => {      
    const { data } = await api.get(`/user/getAll`);
    return data;
}

export const getUserById = async (userId, token) => {      
    const { data } = await api.get(`/user/get/${userId}`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const getFollowersAndFollowing = async (token, userId) => {      
    const { data } = await api.get(`/user/getFollow/${userId}`, {
        headers: {
            'x_token': token
        }
    });
    return data;
}

export const editUser = async ( user ) => {
    const { data } = await api.put(`/user/edit/${ user.uid }`, user, {
        headers: {
            'x_token': user.token,
        }
    });
    return data;
}

export const changeAvatarUser = async ( user, dataImage ) => {
    const { data } = await api.post(`/user/changeAvatar/${ user.uid }/${ user.avatar?.split('/')[9] }`, dataImage, {
        headers: {
            "x_token": user.token,
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}

export const changeBannerUser = async ( user, token, dataImage ) => {
    const { data } = await api.post(`/user/changeBanner/${ user.uid }/${ user.banner?.split('/')[9] }`, dataImage, {
        headers: {
            "x_token": token,
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}

export const followUser = async ( user, followerId, followingId ) => {
    const { data } = await api.put(`/user/follow/${ followingId }`, { followerId }, {
        headers: {
            'x_token': user.token,
        }
    });
    return data;
}

export const unFollow = async ( user, userId, followingId ) => {
    const { data } = await api.delete(`/user/unFollow/${ userId }/${ followingId }`, {
        headers: {
            'x_token': user.token,
        }
    });
    return data;
}