
import { api } from "./api";

export const register = async ( user ) => {
    const { data } = await api.post('/auth/register', user);
    return data;
}

export const logIn = async ( user ) => {
    const { data } = await api.post('/auth/logIn', user);
    return data;
}

export const logout = async ( user ) => {
    const { data } = await api.post('/auth/logout', user);
    return data;
}