
import { IoSendOutline } from "react-icons/io5";
import { useUserStore } from "../../../store";

export const ChatUsers = ({ users }) => {

    const { user } = useUserStore(state => state)

    return (
        <div className="h-full w-96 bg-slate-50 border-r flex flex-col">
            <div className="h-16 border-b px-4 flex items-center justify-center space-x-4">
                <div className="px-4 py-4 border-b-4 border-b-blue-500">Contacts</div>
            </div>
            <div className="h-full">
                {
                    users?.map((u) => (
                        <div
                            key={u.email}
                            className={`px-5 py-4 flex items-center ${user.uid === u.user_id ? 'hidden' : 'cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100'}`}>
                            <img src={u.avatar}
                                className="h-12 w-12 border-2 border-white rounded-full" alt="" />
                            <div className="ml-4">
                                <p className="text-md font-semibold text-slate-600 m-0 p-0">{u.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
