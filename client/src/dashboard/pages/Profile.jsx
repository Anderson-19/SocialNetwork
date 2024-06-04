import React, { useEffect, useState } from 'react';

import {
  IoArrowBack,
  IoCalendarOutline,
  IoGiftOutline,
  IoLinkOutline,
  IoLocationOutline
} from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { useConversation, useUIStore, useUserStore } from '../../store';
import { followUser, getFollowersAndFollowing, getForwardedByUserId, getLikesByUserId, getPostsByUserId, getUserById, logout, unFollow } from '../../api';
import { Card, ModalUser } from '../components';
import { month } from '../../helpers';

export const Profile = () => {

  const [data, setData] = useState();
  const [posts, setPosts] = useState([]);
  const [deleteOnePost, setDeleteOnePost] = useState(false);
  const [follow, setFollow] = useState();
  const [likes, setLikes] = useState([]);
  const [forwarded, setForwarded] = useState([]);
  const [changeOfInteraction, setChangeOfInteraction] = useState({
    likes: false,
    forwarded: false,
    bookmarks: false,
  });
  const [section, setSection] = useState('posts');

  const { state, pathname } = useLocation();
  const nav = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const { setMessages, setSelectedConversation } = useConversation(state => state);
  const { isSideModalPost, isSideModalEditUser, openModalEditUser } = useUIStore(state => state);
  const user = useUserStore(state => state.user);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getUserById(user.uid, user.token)
          .then(res => setData(res))
          .catch(console.log);
      } else {
        getUserById(state?.user_id, user.token)
          .then(res => setData(res))
          .catch(console.log);
      }
    } else {
      getUserById(user.uid, user.token)
        .then(res => setData(res))
        .catch(console.log);
    }
  }, [isSideModalEditUser, state, setDeleteOnePost, deleteOnePost]);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getPostsByUserId(user.token, user.uid)
          .then(res => setPosts(res.posts))
          .catch(console.log);
      } else {
        getPostsByUserId(user.token, state?.user_id)
          .then(res => setPosts(res.posts))
          .catch(console.log);
      }
    } else {
      getPostsByUserId(user.token, user.uid)
        .then(res => setPosts(res.posts))
        .catch(console.log);
    }
  }, [isSideModalPost, isSideModalEditUser, state, setDeleteOnePost, deleteOnePost]);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getFollowersAndFollowing(user.token, user.uid)
          .then(res => setFollow(res))
          .catch(console.log)
      } else {
        getFollowersAndFollowing(user.token, state?.user_id)
          .then(res => setFollow(res))
          .catch(console.log)
      }
    } else {
      getFollowersAndFollowing(user.token, user.uid)
        .then(res => setFollow(res))
        .catch(console.log)
    }
  }, [state, setDeleteOnePost, deleteOnePost]);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getLikesByUserId(user.token, user.uid)
          .then(res => setLikes(res.likes))
          .catch(console.log)
      } else {
        getLikesByUserId(user.token, state?.user_id)
          .then(res => setLikes(res.likes))
          .catch(console.log)
      }
    } else {
      getLikesByUserId(user.token, user.uid)
        .then(res => setLikes(res.likes))
        .catch(console.log)
    }
  }, [state, setDeleteOnePost, deleteOnePost]);

  useEffect(() => {
    if (state !== null) {
      if (state?.user_id === user.uid) {
        getForwardedByUserId(user.token, user.uid)
          .then(res => setForwarded(res.forwarded))
          .catch(console.log)
      } else {
        getForwardedByUserId(user.token, state?.user_id)
          .then(res => setForwarded(res.forwarded))
          .catch(console.log)
      }
    } else {
      getForwardedByUserId(user.token, user.uid)
        .then(res => setForwarded(res.forwarded))
        .catch(console.log)
    }
  }, [state, setDeleteOnePost, deleteOnePost]);

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

    <div className="w-full h-full pt-2 justify-center overflow-x-hidden overflow-y-scroll scroll-ui">
      <div>
        <hr className="border-gray-800" />

        <section className="border border-y-0 border-gray-800">

          <div>
            <div className="flex bg-gray-100">
              <div className="justify-start px-4 py-2 mx-2 cursor-pointer">
                <IoArrowBack size={25} onClick={() => nav(localStorage.getItem('pathHome'))} />
              </div>
              <div className="mx-2">
                <h2 className="mb-0 text-xl font-bold text-black">{data?.name} {data?.lastname}</h2>
                <p className="mb-0 w-48 text-xs text-gray-400">{posts?.length} Posts</p>
              </div>

              <button
                onClick={() => {
                  logout(user);
                  setUser({ uid: '', name: '', email: '', lastname: '', username: '', avatar: '', password: '', token: '', isLogged: false });
                  setMessages([]);
                  setSelectedConversation('');
                  nav('/');
                }}
                className={`${state?.user_id === user.uid ? 'h-1/2 whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-2 mt-2 ml-auto' : 'hidden'}`} >
                Log Out
              </button>

            </div>

            <hr className="border-gray-800" />
          </div>

          <div>
            <div className="w-full flex bg-cover bg-no-repeat bg-center cursor-pointer" style={{ height: '200px', backgroundImage: `url(${data?.banner})` }}>
            </div>
            <div className="p-4 bg-gray-100">
              <div className="relative flex w-full">

                <div className="flex flex-1">
                  <div style={{ marginTop: '-6rem' }}>
                    <div style={{ height: '9rem', width: '9rem' }} className="md rounded-full relative avatar cursor-pointer">
                      <img style={{ height: '9rem', width: '9rem' }} className="md rounded-full relative border-4 border-gray-900" src={data?.avatar} alt="" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={openModalEditUser}
                    className={`${state?.user_id === user.uid ? 'max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto' : 'hidden'}`}>
                    Edit Profile
                  </button>
                  {
                    (follow?.followers && state !== null)
                      && follow?.followers?.find((f) => f.follower_id === user.uid) ? (
                      <button
                        onClick={async () => unFollow(user, user.uid, state?.user_id)}
                        className="max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                      >
                        Following
                      </button>
                    ) : state?.user_id !== user.uid && (
                      <button
                        className="bg-blue-600 font-semibold py-2 px-4 text-white rounded-full hover:bg-blue-500 border border-white hover:border-transparent"
                        onClick={() => followUser(user, user.uid, state?.user_id)}
                      >
                        Follow
                      </button>
                    )
                  }
                </div>
              </div>

              <div className="space-y-1 justify-center w-full mt-3 ml-3">

                <div>
                  <h2 className="text-xl leading-6 font-bold text-black">{data?.name} {data?.lastname}</h2>
                  <p className="text-sm leading-5 font-medium text-gray-600">@{data?.username}</p>
                </div>
                <div className="flex">
                  <IoLocationOutline size={20} className="mt-5" /> <p className="text-8px mt-5 font-medium text-gray-800"> Maracaibo, Venezuela</p>
                  <IoCalendarOutline size={20} className="mt-5 ml-4" /> <p className="text-8px mt-5 font-medium text-gray-800 ml-2"> Joined {month(data?.created_at)}</p>
                  <IoGiftOutline size={20} className="mt-5 ml-4" /> <p className="text-8px mt-5 font-medium text-gray-800 ml-2"> Born {month(data?.birthdate)}</p>
                </div>

                <div className="mt-3">
                  <p className="text-black leading-tight mb-4">{data?.biography}</p>
                  {/* <div className="text-gray-600 flex">
                    <IoLinkOutline size={20} /><span><a href="https://ricardoribeirodev.com/personal/" className="leading-5 ml-1 text-blue-400">www.RicardoRibeiroDEV.com</a></span>
                  </div> */}
                </div>

                <div className="flex justify-start w-full divide-x divide-solid">

                  <div className="text-center px-3 cursor-pointer hover:underline" onClick={() => setSection("followings")}>
                    <span className="font-bold text-black">
                      {follow?.followings.length ?? 0}
                    </span>
                    <span className="text-gray-600"> Followings</span>
                  </div>

                  <div className="text-center px-3 cursor-pointer hover:underline" onClick={() => setSection("followers")}>
                    <span className="font-bold text-black">
                      {follow?.followers.length ?? 0}
                    </span>
                    <span className="text-gray-600"> Followers</span>
                  </div>

                </div>
              </div>
            </div>
            <div className="bg-gray-100">
              <nav className="flex flex-col justify-center sm:flex-row">
                <button onClick={() => setSection("posts")} className={`px-6 block hover:text-blue-500 focus:outline-none ${section === "posts" && "text-blue-500 border-blue-500"} border-b-2 font-medium`}>
                  <span> posts</span>
                </button>
                <button onClick={() => setSection("followings")} className={`py-4 px-6 block hover:text-blue-500 focus:outline-none ${section === "followings" && "text-blue-500 border-blue-500"} border-b-2 font-medium`}>
                  <span> Followings</span>
                </button>
                <button onClick={() => setSection("followers")} className={`py-4 px-6 block hover:text-blue-500 focus:outline-none ${section === "followers" && "text-blue-500 border-blue-500"} border-b-2 font-medium`}>
                  <span> Followers</span>
                </button>
                <button onClick={() => setSection("likes")} className={`py-4 px-6 block hover:text-blue-500 focus:outline-none ${section === "likes" && "text-blue-500 border-blue-500"} border-b-2 font-medium`}>
                  <span> Likes</span>
                </button>
                <button onClick={() => setSection("forwarded")} className={`py-4 px-6 block hover:text-blue-500 focus:outline-none ${section === "forwarded" && "text-blue-500 border-blue-500"} border-b-2 font-medium`}>
                  <span> Forwarded</span>
                </button>
              </nav>
            </div>
          </div>
          <hr className="border-gray-200" />

          {
            section === "posts" && (
              <>
                {posts.length > 0 ? (
                  posts?.map(post => <Card
                    key={post.post_id}
                    post={post}
                    interactionLikes={interactionLikes}
                    interactionForwarded={interactionForwarded}
                    interactionBookmarks={interactionBookmarks}
                    setDeleteOnePost={setDeleteOnePost}
                    deleteOnePost={deleteOnePost}
                  />)
                ) : (
                  <div className="text-center mt-36">
                    <p className="text-4xl mb-4">{ state?.user_id === user.uid ? "You don't have post yet" : "Don't have post yet"}</p>
                    { state?.user_id === user.uid && <p>When you publish any post it appears here.</p>}
                  </div>
                )
                }
                {
                  forwarded &&
                  forwarded.map(forwarded => <Card
                    key={forwarded.post_id}
                    post={forwarded}
                    interactionLikes={interactionLikes}
                    interactionForwarded={interactionForwarded}
                    interactionBookmarks={interactionBookmarks}
                    setDeleteOnePost={setDeleteOnePost}
                    deleteOnePost={deleteOnePost}
                  />)
                }
              </>

            )
          }

          {
            section === "likes" && (
              <>
                {
                  likes.length > 0 ? (
                    likes?.map(like => <Card
                      key={like.post_id}
                      post={like}
                      interactionLikes={interactionLikes}
                      interactionForwarded={interactionForwarded}
                      interactionBookmarks={interactionBookmarks}
                      setDeleteOnePost={setDeleteOnePost}
                      deleteOnePost={deleteOnePost}
                    />)
                  ) : (
                    <div className="text-center mt-36">
                      <p className="text-4xl mb-4">{ state?.user_id === user.uid ? "You don't have likes yet" : "Don't have likes yet"}</p>
                      { state?.user_id === user.uid && <p>When you like any post it appears here.</p> }
                    </div>
                  )
                }
              </>
            )
          }

          {
            section === "forwarded" && (
              <>
                {
                  forwarded.length > 0 ? (
                    forwarded.map(forwarded => <Card
                      key={forwarded.post_id}
                      post={forwarded}
                      interactionLikes={interactionLikes}
                      interactionForwarded={interactionForwarded}
                      interactionBookmarks={interactionBookmarks}
                      setDeleteOnePost={setDeleteOnePost}
                      deleteOnePost={deleteOnePost}
                    />)
                  ) : (
                    <div className="text-center mt-36">
                      <p className="text-4xl mb-4">{ state?.user_id === user.uid ? "You don't have forwarded post yet": "Don't have forwarded post yet"}</p>
                      { state?.user_id === user.uid && <p>When you forwarded any post it appears here.</p> }
                    </div>
                  )
                }
              </>

            )
          }

          {
            section === "followings" && (
              <div className="py-10">
                {
                  follow?.followings.length > 0 ? (
                    follow?.followings?.map((following) => (
                      <div
                        key={following.following_id}
                        className="hover:bg-gray-100 bg-white cursor-pointer"
                        onClick={() => nav(`/profile/${following.username}`, { state: { user_id: following.user_id } })}
                      >
                        <div className="flex items-start px-4 py-6">
                          <img className="w-12 rounded-full object-cover mr-4 shadow" src={following.avatar} alt="avatar" />
                          <div className="">
                            <div className="flex items-center justify-between">
                              <h2 className="text-lg font-semibold text-gray-900">{following.name} {following.lastname}</h2>
                              <button
                                onClick={() => nav(`/profile/${following.username}`, { state: { user_id: following.user_id } })}
                                className={`${following.user_id === user.uid ? 'hidden' : 'cursor-pointer max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto'}`}
                              >
                                Visit profile
                              </button>
                            </div>
                            <p className="text-gray-700 text-sm mb-4">@{following.username}</p>

                            <p className="text-gray-700 text-md">
                              {following.biography ? following.biography : 'Esté usuario no tiene biografía, si quiere más información sobre el usuario entre en su perfil'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center mt-36">
                      <p className="text-4xl mb-4">{ state?.user_id === user.uid ? "You aren't following to anyone yet" : "Is not following anyone yet" }</p>
                      { state?.user_id === user.uid && <p>When you follow someone, they will appear here.</p> }
                    </div>
                  )
                }
              </div>
            )
          }

          {
            section === "followers" && (
              <div className="py-10">
                {
                  follow?.followers.length > 0 ? (

                    follow?.followers?.map((follower) => (
                      <div
                        key={follower.follower_id}
                        className="hover:bg-gray-100 bg-white cursor-pointer"
                        onClick={() => nav(`/profile/${follower.username}`, { state: { user_id: follower.user_id } })}
                      >
                        <div className="flex items-start px-4 py-6">
                          <img className="w-12 rounded-full object-cover mr-4 shadow" src={follower.avatar} alt="avatar" />
                          <div className="">
                            <div className="flex items-center justify-between">
                              <h2 className="text-lg font-semibold text-gray-900">{follower.name} {follower.lastname}</h2>
                              <button
                                onClick={() => nav(`/profile/${follower.username}`, { state: { user_id: follower.user_id } })}
                                className={`${follower.user_id === user.uid ? 'hidden' : 'max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto'}`}
                              >
                                Visit profile
                              </button>
                            </div>
                            <div className="flex">
                              <p className="text-gray-700 text-sm mb-4">@{follower.username}</p>
                              <div className="rounded-md bg-slate-500 px-3 py-1.5 ml-2 uppercase text-white">
                                <p className="font-sans text-sm font-medium capitalize leading-none text-white antialiased">
                                  Follows you
                                </p>
                              </div>
                            </div>

                            <p className="text-gray-700 text-md">
                              {follower.biography ? follower.biography : 'Esté usuario no tiene biografía, si quiere más información sobre el usuario entre en su perfil'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center mt-36">
                      <p className="text-4xl mb-4">{ state?.user_id === user.uid ? "You aren't follower to anyone yet" : "Is not follower to anyone yet" }</p>
                      { state?.user_id === user.uid && <p>When you follow someone, they will appear here.</p> }
                    </div>
                  )
                }
              </div>
            )
          }

        </section>
      </div>
      <ModalUser userData={data} state={state} />
    </div >
  )
}
