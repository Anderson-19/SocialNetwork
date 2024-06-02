import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IoHeartOutline,
    IoChatbubbleOutline,
    IoBookmarkOutline,
    IoSync,
    IoEllipsisVerticalSharp
} from 'react-icons/io5'

import { dayAndMonth } from "../../helpers";
import { useUserStore } from '../../store';
import {
    addBookmark,
    addForwarded,
    addLike,
    deleteBookmark,
    deleteForwarded,
    deletePost,
    disLike,
    getBookmarksByPostId,
    getCommentsByPostId,
    getForwardedByPostId,
    getLikesByPostId,
    getUserById
} from '../../api';
import { ModalComment } from '.';

export const Card = ({ post, interactionLikes, interactionForwarded, interactionBookmarks, setDeleteOnePost, deleteOnePost }) => {

    const [showDrowDown, setShowDrowDown] = useState(false);
    const [modalComment, setModalComment] = useState(false);
    const [forwardedByPost, setForwardedByPost] = useState([]);
    const [likesByPost, setLikesByPost] = useState([]);
    const [bookmarksByPost, setBookmarksByPost] = useState([]);
    const [commentsByPost, setCommentsByPost] = useState([]);
    const nav = useNavigate();
    const user = useUserStore(state => state.user);

    const isLike = likesByPost?.find(like => like.pl_uid === user.uid && like.post_id === post.post_id);
    const isForwarded = forwardedByPost?.find(forwarded => forwarded.pf_uid === user.uid && forwarded.post_id === post.post_id);
    const isBookmark = bookmarksByPost?.find(bookmark => bookmark.pb_uid === user.uid && bookmark.post_id === post.post_id);

    useEffect(() => {
        getLikesByPostId(user.token, post?.post_comment_id ? post.post_comment_id : post.post_id)
            .then(res => setLikesByPost(res.likes))
            .catch(console.log)
    }, [likesByPost, setLikesByPost, isLike]);

    useEffect(() => {
        getForwardedByPostId(user.token, post?.post_comment_id ? post.post_comment_id : post.post_id)
            .then(res => setForwardedByPost(res.forwarded))
            .catch(console.log)
    }, [forwardedByPost, setForwardedByPost, isForwarded]);

    useEffect(() => {
        getBookmarksByPostId(user.token, post?.post_comment_id ? post.post_comment_id : post.post_id)
            .then(res => setBookmarksByPost(res.bookmarks))
            .catch(console.log)
    }, [bookmarksByPost, setBookmarksByPost, isBookmark]);

    useEffect(() => {
        getCommentsByPostId(user.token, post?.post_comment_id ? post.post_comment_id : post.post_id)
            .then(res => setCommentsByPost(res.comments))
            .catch(console.log)
    }, [commentsByPost, setCommentsByPost]);

    const closeModalComment = () => setModalComment(false);

    return (
        <ul className="list-none cursor-pointer">
            <li>
                <article className="hover:bg-gray-50 bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-shrink-0 p-4 pb-0">
                        <a className="flex-shrink-0 group block">
                            <div className="flex items-center" onClick={() => nav(`/profile/${post.username}`, { state: { user_id: post.user_id } })}>
                                <div>
                                    <img className="inline-block h-10 w-10 rounded-full" src={post.avatar} alt="" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-base leading-6 font-medium text-black cursor-pointer">
                                        {post.name} {post.lastname}
                                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150 ml-2">
                                            @{post.username} . {dayAndMonth(post.created_at || post.date)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="pl-16">
                        <p className="text-base width-auto font-medium text-black flex-shrink" onClick={() => nav(`/comments/${post.post_comment_id ? post.post_comment_id : post.post_id}`, { state: { post: post } })}>
                            {post.content}
                        </p>

                        {
                            post.img && (
                                <div className="md:flex-shrink pr-6 pt-3" onClick={() => nav(`/comments/${post.post_comment_id ? post.post_comment_id : post.post_id}`, { state: { post: post } })}>
                                    <img className="m-auto w-96 h-full" src={post.img} alt="" />
                                </div>
                            )
                        }

                        <div className="flex items-center py-4 px-6 mb-2">
                            <div
                                onClick={() => setModalComment(true)}
                                className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out cursor-pointer">
                                <IoChatbubbleOutline className="mr-2" size={25} />
                                {commentsByPost?.length ?? 0}
                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-green-400 transition duration-350 ease-in-out cursor-pointer">

                                <IoSync
                                    className={`${isForwarded ? 'text-green-400 mr-2' : 'mr-2'}`}
                                    size={25}
                                    onClick={() => {
                                        if (isForwarded) {
                                            interactionForwarded();
                                            deleteForwarded(user.token, post.post_comment_id ? post.post_comment_id : post.post_id, isForwarded.forwarded_id);
                                        } else {
                                            interactionForwarded();
                                            addForwarded(user.token, post.post_comment_id ? post.post_comment_id : post.post_id, post.user_id);
                                        }
                                    }}
                                />
                                {forwardedByPost?.length ?? 0}

                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-red-600 transition duration-350 ease-in-out cursor-pointer">

                                <IoHeartOutline
                                    className={`${isLike ? 'text-red-600 mr-2' : 'mr-2'}`}
                                    size={25}
                                    onClick={() => {
                                        if (isLike) {
                                            interactionLikes();
                                            disLike(user.token, post.post_comment_id ? post.post_comment_id : post.post_id, isLike.post_like_id);
                                        } else {
                                            interactionLikes();
                                            addLike(user.token, post.post_comment_id ? post.post_comment_id : post.post_id, post.user_id);
                                        }
                                    }}
                                />
                                {likesByPost?.length ?? 0}

                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out cursor-pointer">

                                <IoBookmarkOutline
                                    className={`${isBookmark ? 'text-blue-600 mr-2' : 'mr-2'}`}
                                    size={25}
                                    onClick={() => {
                                        if (isBookmark) {
                                            interactionBookmarks();
                                            deleteBookmark(user.token, post.post_comment_id ? post.post_comment_id : post.post_id, isBookmark.post_bookmark_id);
                                        } else {
                                            interactionBookmarks();
                                            addBookmark(user.token, post.post_comment_id ? post.post_comment_id : post.post_id, post.user_id);
                                        }
                                    }}
                                />
                                {bookmarksByPost?.length ?? 0}
                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out cursor-pointer">
                                <a onClick={() => setShowDrowDown(!showDrowDown)}>
                                    <IoEllipsisVerticalSharp className="mr-2" size={25} />

                                    <div className={` ${showDrowDown ? 'flex items-center justify-center bg-gray-100' : 'hidden'}`}>
                                        <div className="relative inline-block text-left">
                                            <div className="origin-top-left absolute left-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2">
                                                <a
                                                    onClick={() => {
                                                        setDeleteOnePost(!deleteOnePost);
                                                        deletePost(user.token, post.post_comment_id ? post.post_comment_id : post.post_id);
                                                    }}
                                                    className={`${post.user_id === user.uid ? 'block px-4 py-2 text-sm text-red-500 hover:bg-red-100 rounded-md cursor-pointer' : 'hidden'}`}
                                                >
                                                    Delete
                                                </a>
                                                <a
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md"
                                                    onClick={() => {
                                                        interactionBookmarks();
                                                        addBookmark(user.token, post.post_comment_id ? post.post_comment_id : post.post_id, post.user_id);
                                                    }}
                                                >Bookmark</a>

                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div >

                    </div >
                </article >
            </li >
            <ModalComment isSideModalComment={modalComment} closeModalComment={closeModalComment} post={post} />
        </ul >

    )
}
