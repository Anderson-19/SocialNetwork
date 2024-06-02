import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { getBookmarksByUserId } from '../../api';
import { useUserStore } from '../../store';
import { Card } from '../components';

import './styles.css';

export const Bookmarks = () => {

  const [bookmarksByUser, setBookmarksByUser] = useState([]);
  const [changeOfInteraction, setChangeOfInteraction] = useState({
    likes: false,
    forwarded: false,
    bookmarks: false
  });
  const nav = useNavigate();

  const user = useUserStore(state => state.user);

  useEffect(() => {
    getBookmarksByUserId(user.token, user.uid)
      .then(res => setBookmarksByUser(res.bookmarks))
      .catch(console.log)
  }, [changeOfInteraction.likes, changeOfInteraction.forwarded, changeOfInteraction.bookmarks]);

  const interactionLikes = () => {
    setChangeOfInteraction({
      ...changeOfInteraction,
      likes: !changeOfInteraction.likes,
    });
  }

  const interactionForwarded = () => {
    setChangeOfInteraction({
      ...changeOfInteraction,
      forwarded: !changeOfInteraction.forwarded,
    });
  }

  const interactionBookmarks = () => {
    setChangeOfInteraction({
      ...changeOfInteraction,
      bookmarks: !changeOfInteraction.bookmarks,
    });
  }

  return (
    <div className="w-full h-full justify-center overflow-x-hidden overflow-y-scroll scroll-ui bg-white shadow-md border border-y-0 border-gray-800 sm:min-w-fit">
      <div className="flex">
        <div className="justify-start px-4 py-2 mx-2 cursor-pointer">
          <IoArrowBack size={25} onClick={() => nav(localStorage.getItem('pathHome'))} />
        </div>
        <div className="flex-1 mx-2">
          <h2 className="px-4 py-2 text-xl font-semibold text-black">Bookmarks</h2>
        </div>
        <div className="flex-1 px-4 py-2 mx-2" />
      </div>

      <hr className="border-gray-800" />

      {bookmarksByUser &&
        bookmarksByUser?.map((bookmark) => (
          <div key={bookmark.post_id} className={`${bookmark.user_id === user.uid ? 'hidden' : ''}`}>
            <Card
              key={bookmark.post_id}
              post={bookmark}
              interactionLikes={interactionLikes}
              interactionForwarded={interactionForwarded}
              interactionBookmarks={interactionBookmarks}
            />
            <div className="flex-1 px-4 py-2 mx-2" />
          </div>
        ))
      }
    </div>
  )
}
