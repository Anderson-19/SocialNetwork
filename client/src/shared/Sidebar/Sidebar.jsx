import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
    IoHomeOutline,
    IoNotificationsOutline,
    IoSendOutline,
    IoBookmarkOutline,
    IoPersonOutline,
    IoHeartOutline
} from 'react-icons/io5';

import { useUIStore, useUserStore } from '../../store';

export const Sidebar = () => {

    const [profile, setProfile] = useState(false);
    const nav = useNavigate();
    const location = useLocation();
    const { openModalPost, setTypePost } = useUIStore(state => state);
    const user = useUserStore(state => state.user);

    const selectPage = (page) => {
        if (location.pathname === `/${page}`) {
            localStorage.setItem('pathHome', '/home');
            return 'text-blue-500';
        }

        return 'text-slate-700';
    }

    return (
        <div className="h-full lg:mx-10 pt-10 max-sm:w-0 md:min-w-fit max-[770px]:hidden">
            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('home')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => { setProfile(false); nav('/home'); }}>
                <IoHomeOutline size={25} />
                <p className="ml-3">Home</p>
            </div>

            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('messages')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => { setProfile(false); nav('/messages'); }}>
                <IoSendOutline size={25} />
                <p className="ml-3">Messages</p>
            </div>

            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('bookmarks')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => { setProfile(false); nav('/bookmarks'); }}>
                <IoBookmarkOutline size={25} />
                <p className="ml-3">Bookmarks</p>
            </div>

            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('likes')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => { setProfile(false); nav('/likes'); }}>
                <IoHeartOutline size={25} />
                <p className="ml-3">Likes</p>
            </div>

            <div
                className={`${profile ? 'mt-4 py-1.5 text-lg font-medium text-blue-500 hover:text-blue-500 group cursor-pointer flex justify-start' : 'mt-4 py-1.5 text-lg font-medium text-slate-700 hover:text-blue-500 group cursor-pointer flex justify-start'}`}
                onClick={() => {
                    setProfile(true);
                    nav(`/profile/${ user.username }`, { state: { user_id: user.uid } });
                }}
            >
                <IoPersonOutline size={25} />
                <p className="ml-3">Profile</p>
            </div>

            <div className="mt-4 py-1.5 text-lg font-medium text-slate-700 hover:text-blue-500">
                <button
                    onClick={() => { setTypePost("post"); openModalPost(); }}
                    className="bg-blue-600 md:px-14 py-1 md:py-2 font-semibold text-white rounded-full hover:bg-blue-500 border border-white hover:border-transparent">
                    Post
                </button>
            </div>

            <div
                className="absolute cursor-pointer" style={{ bottom: '2rem' }}
                onClick={() => {
                    setProfile(false);
                    nav(`/profile/${ user.username }`, { state: { user_id: user.uid } })
                }}>
                <div className="flex bg-gray-200 hover:bg-gray-50 rounded-full px-4 py-3 mt-12 mr-2">
                    <div className="flex flex-shrink-0 group items-center">
                        <div>
                            <img className="inline-block h-10 w-10 rounded-full" src={user.avatar} alt="" />
                        </div>
                        <div className="ml-3">
                            <p className="text-base leading-6 font-medium text-black">
                                {user.name} {user.lastname}
                            </p>
                            <p className="text-sm leading-5 font-medium text-gray-600 group-hover:text-gray-300 transition ease-in-out duration-150">
                                @{user.username}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
