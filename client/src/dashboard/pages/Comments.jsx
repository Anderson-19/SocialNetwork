import { useEffect, useState } from 'react'

import { commentOnPost, getCommentsByPostId } from '../../api';
import { useUserStore } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, PreviewImage } from '../components';
import { IoImagesOutline, IoArrowBack } from 'react-icons/io5';

import { useForm } from 'react-hook-form';
import { validateFile } from '../../helpers';

import './styles.css';

export const Comments = () => {

    const [commentsByPost, setCommentsByPost] = useState([]);
    const [reloadComments, setReloadComments] = useState(false);
    const [validate, setValidate] = useState('');
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [changeOfInteraction, setChangeOfInteraction] = useState({
        likes: false,
        forwarded: false,
        bookmarks: false
    });
    const { state, pathname } = useLocation();
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors }, resetField } = useForm();
    const user = useUserStore(state => state.user);

    const onSubmit = async (data) => {
        const formData = new FormData();
        setReloadComments(false);

        if (data.file && data.content) {
            formData.append("file", data.file[0]);
            formData.append("content", data.content);
            const { ok } = await commentOnPost(user.token, pathname ? pathname.split('/').at(-1) : state.post.post_id, formData);
            if (!ok) return;
            methodReset(ok);
        } else if (data.file[0]) {
            formData.append("file", data.file[0]);
            const { ok } = await commentOnPost(user.token, pathname ? pathname.split('/').at(-1) : state.post.post_id, formData);
            if (!ok) return;
            methodReset(ok);
        } else {
            const { ok } = await commentOnPost(user.token, pathname ? pathname.split('/').at(-1) : state.post.post_id, { content: data.content });
            if (!ok) return;
            methodReset(ok);
        }

    }

    useEffect(() => {
        if (state === null && !state.post) return;

        getCommentsByPostId(user.token, pathname ? pathname.split('/').at(-1) : state.post.post_id)
            .then(res => setCommentsByPost(res.comments))
            .catch(console.log)

    }, [pathname, state, reloadComments, changeOfInteraction.likes, changeOfInteraction.forwarded, changeOfInteraction.bookmarks]);

    const methodReset = (reload) => {
        resetField('content');
        resetField('file');
        setReloadComments(reload);
    }

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
                    <h2 className="px-4 py-2 text-xl font-semibold text-black">Comments</h2>
                </div>
                <div className="flex-1 px-4 py-2 mx-2" />
            </div>
            <hr className="border-gray-800" />

            <div>
                {(state !== null && state.post) &&
                    (
                        <Card
                            post={state.post}
                            interactionLikes={interactionLikes}
                            interactionForwarded={interactionForwarded}
                            interactionBookmarks={interactionBookmarks}
                        />
                    )
                }
            </div>

            <hr className="border-gray-800" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="m-2 w-10 py-1">
                        <img className="inline-block h-10 w-10 rounded-full" src={user.avatar} alt="Avatar" />
                    </div>
                    <div className="flex-1 px-2 pt-2 mt-2">
                        <textarea
                            className=" bg-transparent text-gray-400 font-medium text-lg w-full"
                            rows={4}
                            cols={50}
                            placeholder="Comment"
                            {...register("content", { minLength: 10, maxLength: 150 })}
                            name="content"
                        />
                        {errors.content?.type === 'minLength' && <span style={{ color: "red" }}>;inimum 10 letters</span>}
                        {errors.content?.type === 'maxLength' && <span style={{ color: "red" }}>Maximun 150 letters</span>}
                    </div>
                </div>

                <hr className="border-gray-800" />

                <PreviewImage selectedFile={selectedFile} setSelectedFile={setSelectedFile} validate={validate} />

                <div className="flex">
                    <div className="w-10"></div>
                    <div className="flex items-center cursor-pointer">
                        <div className="flex-1 text-center px-1 py-1 m-2">
                            <label className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-200 hover:text-blue-300">
                                <IoImagesOutline size={25} />
                                <input
                                    id="upload"
                                    type="file"
                                    className="hidden"
                                    onInput={(e) => {
                                        setSelectedFile(e.target.files[0]);
                                        setValidate(validateFile(e.target.files[0].name))
                                    }}
                                    {...register("file")}
                                />
                                {selectedFile && <span className="ml-2 text-black">{selectedFile.name}</span>}
                            </label>
                            {validate && <span style={{ color: "red" }}>{validate}</span>}
                        </div>
                    </div>

                    <div className="flex-1">
                        <button type="submit" className={validate ? 'hidden' : `bg-blue-600 hover:bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded-full mr-8 float-right`}>
                            Comment On
                        </button>
                    </div>
                </div>
            </form>

            <hr className="border-gray-800" />
            <div>
                {
                    (state !== null) &&
                    commentsByPost?.map(comment => (
                        <div key={comment.post_comment_id}>
                            <Card
                                post={comment}
                                interactionLikes={interactionLikes}
                                interactionForwarded={interactionForwarded}
                                interactionBookmarks={interactionBookmarks}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
