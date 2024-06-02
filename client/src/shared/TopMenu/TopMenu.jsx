import { useEffect, useState } from 'react';

import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../api';

export const TopMenu = ({ user }) => {

    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState([]);
    const [users, setUsers] = useState([]);
    const [text, setText] = useState("");
    const nav = useNavigate();

    const filterUsers = (finished) => {
        let result = search.filter((user) => {
            if (user?.name.toString().toLowerCase().includes(finished.toLowerCase())) return user;
        });
        setUsers(result);
        setText(finished);
    }

    const searchByUser = (finished) => filterUsers(finished);

    useEffect(() => {
        getUsers()
            .then((res) => setSearch(res.users))
            .catch(console.log)
    }, [])

    return (
        <div className=" border-b px-5 py-1 flex justify-between items-center">
            <span> {/* <img src={Logo} alt="" /> */}</span>

            <div className=" w-1/2 relative focus-within:shadow-lg" >

                <div className="flex items-center w-full focus-within:border px-3 py-2 focus-within:border-b-0">
                    <IoSearchOutline className="h-5 stroke-slate-300 mr-5" />
                    <input
                        type="text"
                        placeholder="Search....."
                        className=" w-full outline-none placeholder:text-slate-300 font-semibold"
                        onChange={(e) => searchByUser(e.target.value)}
                        name="text"
                        onClick={() => showSearch ? setShowSearch(false) : setShowSearch(true)}
                    />
                </div>

                <div className={`absolute w-full border bg-white ${showSearch ? 'block' : 'hidden'}`} x-show="search">
                    <div className="flex flex-col border-b">
                        {
                            (search.length > 0 && text.length > 2) &&
                            users?.map((userSearch) => (
                                <div
                                    key={userSearch.user_id}
                                    className="px-4 py-1 flex flex-row w-full hover:bg-slate-100 cursor-pointer"
                                    onClick={() => {
                                        nav(`/profile/${userSearch.username}`, { state: { user_id: userSearch.user_id } });
                                        setShowSearch(false);
                                        setText("");
                                    }}>
                                    <img src={userSearch.avatar} className="h-10 w-10 rounded-full" alt="" />
                                    <p key={userSearch.user_id} className="text-sm font-medium mt-2 ml-2 text-slate-600"> {userSearch.name} {userSearch.lastname}</p>
                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>

            <div className="flex space-x-4 items-center cursor-pointer"></div>
        </div>
    )
}
