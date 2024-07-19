const { Response, Request } = require('express');
const { v4 } = require('uuid');

const { io, getReceiverSocketId } = require("../socket/socket");
const { createConversation, getConversation, createMessage, getMessageId, addMessageToConversation, getConversations, getMessagesIds } = require('../database');

const sendMessage = async (req = request, res = response) => {
    try {
        const { message, conversationId } = req.body;
        const { senderId, receiverId } = req.params;

        const converId = v4();
        const messageId = v4();

        const conversation = await getConversation(conversationId);

        if (!conversationId || !conversation) {
            await createConversation(converId, senderId, receiverId, messageId);
            await createMessage(messageId, senderId, receiverId, message);

            const newMessage = await getMessageId(messageId);

            const receiverSocketId = getReceiverSocketId(receiverId);
                     
            io.emit("newMessage", newMessage.rows[0]);
            res.status(201).json(newMessage.rows[0]);
        }

        const messagesArray = conversation.rows[0]?.messages.replace('{', '[').replace('}', ']');

        if (!messagesArray) return;

        const messages = JSON.parse(messagesArray);
        messages.push(messageId);

        const addMesToConversation = await addMessageToConversation(messages, conversationId);
        const createMs = await createMessage(messageId, senderId, receiverId, message);

        Promise.all([addMesToConversation, createMs]);

        const newMessage = await getMessageId(messageId);
        const receiverSocketId = getReceiverSocketId(receiverId);

        io.emit("newMessage", newMessage.rows[0]);
        res.status(201).json(newMessage.rows[0]);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req = request, res = response) => {
    try {
        const { senderId, receiverId } = req.params;

        const conversations = await getConversations();

        const conversation = conversations.filter((items) =>
            (JSON.parse(items.participants.replace('{', '[').replace('}', ']'))[0] === senderId &&
                JSON.parse(items.participants.replace('{', '[').replace('}', ']'))[1] === receiverId) ||
            (JSON.parse(items.participants.replace('{', '[').replace('}', ']'))[0] === receiverId &&
                JSON.parse(items.participants.replace('{', '[').replace('}', ']'))[1] === senderId));

        if (!conversation[0]) return res.status(200).json([]);

        const conversationId = conversation[0]?.conversation_id;
        const arrayParticipants = conversation[0]?.participants.replace('{', '[').replace('}', ']');

        const messages = await getMessagesIds(senderId, receiverId);

        res.status(200).json({ conversationId, participants: arrayParticipants, messages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { sendMessage, getMessages };