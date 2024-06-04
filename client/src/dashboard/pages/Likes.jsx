import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { getLikesByUserId } from '../../api';
import { useUserStore } from '../../store';
import { Card } from '../components';

import './styles.css';

export const Likes = () => {

  const [likesByUser, setLikesByUser] = useState([]);
  const [changeOfInteraction, setChangeOfInteraction] = useState({
    likes: false,
    forwarded: false,
    bookmarks: false
  });
  const nav = useNavigate();
  const user = useUserStore(state => state.user);

  useEffect(() => {
    getLikesByUserId(user.token, user.uid)
      .then(res => setLikesByUser(res.likes))
      .catch(console.log)
  }, [changeOfInteraction.likes, changeOfInteraction.forwarded, changeOfInteraction.bookmarks]);

  console.log(likesByUser.length);

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
    <div className="w-full h-full justify-center overflow-x-hidden overflow-y-scroll scroll-ui bg-white shadow-md border border-y-0 border-gray-800">
      <div className="flex">
        <div className="justify-start px-4 py-2 mx-2 cursor-pointer">
          <IoArrowBack size={25} onClick={() => nav(localStorage.getItem('pathHome'))} />
        </div>
        <div className="flex-1 mx-2">
          <h2 className="px-4 py-2 text-xl font-semibold text-black">Likes</h2>
        </div>
        <div className="flex-1 px-4 py-2 mx-2" />
      </div>

      <hr className="border-gray-800" />

      {likesByUser.length > 0 ? (
        likesByUser?.map((like) => (
          <div key={like.post_id} className={`${like.user_id === user.uid ? 'hidden' : ''}`}>
            <Card
              key={like.post_id}
              post={like}
              interactionLikes={interactionLikes}
              interactionForwarded={interactionForwarded}
              interactionBookmarks={interactionBookmarks}
            />
          </div>
        ))
      ) : (
        <div className="text-center mt-36">
          <p className="text-4xl mb-4">You don't have likes yet</p>
          <p>When you like any post it appears here.</p>
        </div>
      )
      }
    </div>
  )
}
