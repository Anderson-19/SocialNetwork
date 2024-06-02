
const dataBase = require("./dataBase");

const db = new dataBase();

const createConversation = async (conversationId, senderId, receiverId, messageId) => {
    const query = 'INSERT INTO conversations (conversation_id,participants,messages,"createdAt") VALUES ($1,$2,$3,NOW())';
    return await db.pool.query(query, [conversationId, `{"${senderId}","${receiverId}"}`, `{"${messageId}"}`]);
}

const addMessageToConversation = async (messages, conversationId) => {
    const query = 'UPDATE conversations SET messages=$1 WHERE conversation_id=$2';
    return await db.pool.query(query, [messages, conversationId]);
}

const getConversation = async (conversationId) => {
    const query = 'SELECT * FROM conversations WHERE conversation_id=$1';
    return await db.pool.query(query, [conversationId]);
}

const getConversations = async () => {
    const query = 'SELECT * FROM conversations';
    return (await db.pool.query(query)).rows;
}

const createMessage = async (messageId, senderId, receiverId, message) => {
    const query = 'INSERT INTO messages (message_id,sender_id,receiver_id,message,"createdAt") VALUES ($1,$2,$3,$4,NOW())';
    return await db.pool.query(query, [messageId, senderId, receiverId, message]);
}

const getMessageId = async (messageId) => {
    const query = 'SELECT * FROM messages WHERE message_id=$1';
    return await db.pool.query(query, [messageId]);
}

const getMessagesIds = async (senderId, receiverId) => {
    const query = `
            SELECT m.message_id, m.sender_id, m.receiver_id, m.message, m."createdAt", u.user_id, u.name, u.lastname, u.username, u.email, u.avatar FROM messages AS m
            INNER JOIN users AS u ON u.user_id=m.sender_id 
            WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$3 AND receiver_id=$4)
        `;
    return (await db.pool.query(query, [senderId, receiverId, receiverId, senderId])).rows;
}

module.exports = { createConversation, addMessageToConversation, getConversation, getConversations, createMessage, getMessageId, getMessagesIds }
