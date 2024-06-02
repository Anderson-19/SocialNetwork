import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useConversation = create(
	persist(
		(set, get) => ({
			selectedConversation: null,
			messages: [''],

			setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
			setMessages: (messages) => set({ messages })
		}),
		{
			name: "conversation-storage",
		}
	)
);
