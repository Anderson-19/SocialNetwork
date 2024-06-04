import { useEffect, useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useUserStore } from '../../store'
import { createPost, getPostsOfFollowings, getPosts } from '../../api';
import { Card, PreviewImage } from '../components';

import { getComments } from '../../api/post-comments';
import { validateFile } from '../../helpers';

import './styles.css';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [validate, setValidate] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const { register, handleSubmit, formState: { errors }, resetField } = useForm();
  const { pathname } = useLocation();

  const [changeOfInteraction, setChangeOfInteraction] = useState({
    likes: false,
    forwarded: false,
    bookmarks: false
  });

  const user = useUserStore(state => state.user);

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.file[0] && data.content) {
      formData.append("file", data.file[0]);
      formData.append("content", data.content);
      const { ok } = await createPost(user.token, formData);
      if (!ok) return;
      resetField('content');
      setSelectedFile();
    } else if (data.file[0]) {
      formData.append("file", data.file[0]);
      const { ok } = await createPost(user.token, formData);
      if (!ok) return;
      setSelectedFile();
      resetField('content');
    } else {
      const { ok } = await createPost(user.token, { content: data.content });
      if (!ok) return;
      resetField('content');
    }
  }

  useEffect(() => {
    getPostsOfFollowings(user.token)
      .then((res) => setPosts(res.posts))
      .catch(console.log)
  }, [changeOfInteraction.likes, changeOfInteraction.forwarded, changeOfInteraction.bookmarks]);

  useEffect(() => {
    getPosts(user.token)
      .then((res) => setAllPosts(res.posts))
      .catch(console.log)
  }, [changeOfInteraction.likes, changeOfInteraction.forwarded, changeOfInteraction.bookmarks]);

  useEffect(() => {
    getComments(user.token)
      .then((res) => setComments(res.comments))
      .catch(console.log)
  }, []);

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
    <div className="w-full h-full justify-center overflow-x-hidden overflow-y-scroll scroll-ui shadow-md border border-y-0 border-gray-800">

      <hr className="border-gray-800" />
      <div className="flex">

        <div className="flex-1 mx-2">
          <h2 className="px-4 py-2 text-xl font-semibold text-black">Home</h2>
        </div>
        <div className="flex-1 px-4 py-2 mx-2" />
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
              placeholder="Write something that you are thinking about"
              {...register("content", { minLength: 10, maxLength: 150 })}
              name="content"
            />
            {errors.content?.type === 'minLength' && <span style={{ color: "red" }}>Minimum 10 letters</span>}
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
                  name="file"
                  {...register('file')} />
                {selectedFile && <span className="ml-2 text-black">{selectedFile.name}</span>}
              </label>
              {validate && <span style={{ color: "red" }}>{validate}</span>}
            </div>
          </div>

          <div className="flex-1">
            <button type="submit" className={validate ? 'hidden' : `bg-blue-600 hover:bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded-full mr-8 float-right`}>
              Postear
            </button>
          </div>
        </div>
      </form>

      <hr className="border-gray-800" />

      {posts.length > 0 ? (
        posts?.map((post) => (
          <div key={post.post_id} className={`${post.user_id === user.uid ? 'hidden' : ''}`}>
            <Card
              post={post}
              interactionLikes={interactionLikes}
              interactionForwarded={interactionForwarded}
              interactionBookmarks={interactionBookmarks}
            />
          </div>
        ))
      ) : (
        <>
          {allPosts.length > 0 ? (
            allPosts?.map((post) => (
              <div key={post.post_id} className={`${post.user_id === user.uid ? 'hidden' : ''}`}>
                <Card
                  post={post}
                  interactionLikes={interactionLikes}
                  interactionForwarded={interactionForwarded}
                  interactionBookmarks={interactionBookmarks}
                />
              </div>
            ))
          ) : (
            <div className="text-center mt-36">
              <p className="text-4xl mb-4">You don't have post yet</p>
              <p>When you publish any post it appears here.</p>
            </div>
          )}
        </>
      )}

    </div>
  )
}
