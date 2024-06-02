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
import { useState } from 'react';


export const FloatingSidebar = () => {

    const [profile, setProfile] = useState(false);
    const nav = useNavigate();
    const location = useLocation();
    const { openModalPost, setTypePost } = useUIStore(state => state);
    const user = useUserStore(state => state.user);

    const tabSelected = 'text-indigo-600 dark:bg-sky-900 dark:text-sky-50';
    const tabOnly = 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800';

    const selectPage = (page) => {
        if (location.pathname === `/${page}`) return tabSelected;

        return tabOnly;
    }

    return (
        <div
            className="relative dark:bg-slate-900 sm:w-auto md:w-0 min-[770px]:hidden"
        >
            <nav
                className="z-20 flex shrink-0 grow-0 justify-around border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-3/4 -translate-y-64 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border"
            >
                <div
                    onClick={() => {
                        setProfile(true);
                        nav(`/profile/${user.username}`, { state: { user_id: user.uid } });
                    }}
                    className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${ profile ? tabSelected : tabOnly} cursor-pointer`}
                >
                    <IoPersonOutline size={25} />
                    <small className="text-center text-xs font-medium"> Profile </small>
                </div>

                <a
                    href="/likes"
                    onClick={() => setProfile(false)}
                    className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${selectPage('likes')} cursor-pointer`}
                >
                    <IoHeartOutline size={25} />
                    <small className="text-center text-xs font-medium"> Likes </small>
                </a>

                <a
                    href="/bookmarks"
                    onClick={() => setProfile(false)}
                    className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${selectPage('bookmarks')} cursor-pointer`}
                >
                    <IoBookmarkOutline size={25} />
                    <small className="text-center text-xs font-medium"> Bookmarks </small>
                </a>

                <a
                    href="/messages"
                    onClick={() => setProfile(false)}
                    className={`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 ${selectPage('messages')} cursor-pointer`}
                >
                    <IoSendOutline size={25} />
                    <small className="text-center text-xs font-medium"> Messages </small>
                </a>

                <hr className="dark:border-gray-700/60" />

                <a
                    href="/home"
                    onClick={() => setProfile(false)}
                    className={`flex h-16 w-16 flex-col items-center justify-center gap-1 ${selectPage('home')} cursor-pointer`}
                >
                    <IoHomeOutline size={25} />
                    <small className="text-xs font-medium">Home</small>
                </a>
            </nav>

        </div>
    )
}
