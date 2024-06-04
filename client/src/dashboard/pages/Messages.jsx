import { useEffect, useState, useRef } from "react";
import { getFollowersAndFollowing, getMessages, getUsers, sendMessage } from "../../api";
import { IoSendOutline } from "react-icons/io5";
import { useConversation, useUserStore } from "../../store";
import { useForm } from "react-hook-form";
import { extractTime } from "../../helpers";
import { useSocketContext } from "../../context/SocketContext";

import "./styles.css";

export const Messages = () => {

  const [users, setUsers] = useState();
  const [userChat, setUserChat] = useState();
  const { messages, setMessages, setSelectedConversation, selectedConversation } = useConversation(state => state);
  const { register, handleSubmit, resetField } = useForm();

  const { user } = useUserStore(state => state);
	const { socket } = useSocketContext();

  const onSubmit = async (data) => {

    if (!data.message) return;

    await sendMessage(data.message, user.uid, userChat?.user_id, selectedConversation);
    setMessages([...messages, data.message]);
    resetField("message");
  }

  useEffect(() => {
    getFollowersAndFollowing(user.token, user.uid)
      .then(res => setUsers(res))
      .catch(console.log)
  }, [userChat, setUserChat]);

  useEffect(() => {
    getMessages(user.uid, userChat?.user_id)
      .then((res) => {
        setMessages([]);
        setSelectedConversation(res.conversationId);
        setMessages(res.messages);
      })
      .catch(console.log)
  }, [userChat, setUserChat, messages ])

  useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);

  const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  return (
    <div className="h-full w-full flex items-center justify-center">

      <div className="h-full w-96 bg-slate-50 border-r flex flex-col">
        <div className="h-16 border-b px-4 flex items-center justify-center space-x-4">
          <div className="px-4 py-4 border-b-4 border-b-blue-500">Contacts</div>
        </div>
        <div className="h-full">
          {
            users?.followings?.map((u) => (
              <div
                key={u.email}
                onClick={() => setUserChat(u)}
                className={`px-5 py-4 flex items-center ${user.uid === u.user_id ? 'hidden' : 'cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100'}`}
              >
                <img src={u.avatar}
                  className={`h-12 w-12 border-2 ${ u.connected ? 'border-green-300' : 'border-white' } rounded-full`} alt="" />
                <div className="ml-4">
                  <p x-text="user.name" className="text-md font-semibold text-slate-600 m-0 p-0">{u.name}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className={`${user.uid ? 'visible h-full flex flex-col w-full' : 'invisible'} `}>

        <div className={`${userChat ? "h-16 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm" : "hidden"} `} >
          <div className="flex items-center">
            <img className="h-10 w-10 overflow-hidden rounded-full"
              src={userChat?.avatar}
              alt="" />
            <p className="font-semibold ml-3 text-slate-600">{userChat?.name} {userChat?.lastname}</p>
          </div>
        </div>

        <div className="overflow-x-hidden overflow-y-scroll scroll-ui flex flex-col">

          <div className={`${userChat ? "h-full px-10 py-4" : "hidden"}`}>

            {
              messages?.map((message) => (
                <div key={message?.message_id}>

                  <div className={`w-full flex ${user.uid === message?.receiver_id ? 'justify-start' : 'justify-end'} mt-3`}>
                    <div className="w-1/2 ">
                      <div className={`flex ${user.uid === message?.receiver_id ? "bg-white" : "bg-light"}`}>
                        <p className="font-semibold mr-3 text-sm text-slate-600">{message?.name} {message?.lastname}<span
                          className="text-slate-400 text-xs"> {extractTime(message?.createdAt)}</span></p>

                        <img className="h-5 w-5 overflow-hidden rounded-full"
                          src={message?.avatar}
                          alt="" />
                      </div>

                      <div className={`mt-3 w-full ${user.uid === message?.receiver_id ? 'bg-blue-50' : 'bg-blue-500'} p-4 rounded-b-xl rounded-tl-xl`} >
                        <p className={`text-sm ${user.uid === message?.receiver_id ? 'text-black' : 'text-white'}`}>
                          {message?.message?.replace('"', '').replace('"', '')}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>

              ))
            }
          </div>
        </div>


        <div className={`${userChat ? "h-1/4" : "hidden"}`}>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5 py-3">
            <div className="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 focus-within:border-slate-300 rounded-lg">
              <input
                type="text"
                className="w-full px-3 bg-transparent outline-none placeholder:text-slate-400"
                {...register("message")}
                placeholder="Type your message" />
              <div className="flex items-center space-x-4">
                <button type="submit">
                  <IoSendOutline size={20} />
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}
