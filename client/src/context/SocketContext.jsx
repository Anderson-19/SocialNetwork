import { createContext, useState, useEffect, useContext } from "react";
import { useUserStore } from "../store";
import io from "socket.io-client";

const SocketContext = createContext();
//const URL = 'https://socialnetwork-server-production.up.railway.app';
export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useUserStore(state => state);

	useEffect(() => {
		if (user) {
			const socket = io(import.meta.env.VITE_API_URL, {
				query: {
					userId: user.uid,
				},
			});

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [user, setSocket]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
