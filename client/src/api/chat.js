
import { api } from "./api";

export const sendMessage = async ( message, senderId, receiverId, conversationId ) => {
    const { data } = await api.post(`/messages/send/${ senderId }/${ receiverId }`, { message: JSON.stringify(message), conversationId}, 
    {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return data;
}

export const getMessages = async (  senderId, receiverId, ) => {
    const { data } = await api.get(`/messages/${ senderId }/${ receiverId }`);
    return data;
}