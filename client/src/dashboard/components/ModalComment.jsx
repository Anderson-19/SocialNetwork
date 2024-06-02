import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseCircleOutline, IoImagesOutline } from 'react-icons/io5';

import { useUserStore } from '../../store';
import { commentOnPost } from '../../api';
import { LoadingIcon } from '../../shared';
import { validateFile } from '../../helpers';
import { PreviewImage } from './PreviewImage'

export const ModalComment = ({ isSideModalComment, closeModalComment, post }) => {

    const [selectedFile, setSelectedFile] = useState();
    const [validate, setValidate] = useState('');
    const { register, handleSubmit, formState: { errors }, resetField } = useForm();
    const user = useUserStore(state => state.user);

    const onSubmit = async (data) => {
        const formData = new FormData();

        if (selectedFile && data.content) {
            formData.append("file", selectedFile);
            formData.append("content", data.content);
            const { ok } = await commentOnPost(user.token, post?.post_id, formData);
            if (!ok) return;
            methodReset();
        } else if (selectedFile) {
            formData.append("file", selectedFile);
            const { ok } = await commentOnPost(user.token, post?.post_id, formData);
            if (!ok) return;
            methodReset();
        } else {
            const { ok } = await commentOnPost(user.token, post?.post_id, { content: data.content });
            if (!ok) return;
            methodReset();
        }

    }

    const methodReset = () => {
        resetField('content');
        setSelectedFile('');
        closeModalComment();
    }

    return (
        <div className={`${isSideModalComment ? 'fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen w-screen transition-all' : 'hidden'}`}>
            <div className="border border-blue-500 modal-container bg-white w-4/12 max-[770px]:w-7/12 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">

                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between pb-3">
                            <div className=" cursor-pointer z-50" onClick={() => { closeModalComment(); setSelectedFile(""); }}>
                                <IoCloseCircleOutline size={30} />
                            </div>
                            <p className="text-2xl font-bold text-gray-500">Comment</p>
                            <div>
                                <button
                                    type="submit"
                                    className={validate ? 'hidden' : "px-4 bg-black p-2 ml-3 rounded-full text-white hover:bg-teal-400"}

                                >{isSideModalComment ? 'Save' : <LoadingIcon />}</button>
                            </div>
                        </div>

                        <div className="w-full">


                            <div className="">
                                <label className="text-md text-gray-600">Content</label>
                                <textarea
                                    {...register("content", { minLength: 10, maxLength: 150 })}
                                    name="content"
                                    className="p-6 w-full border-2 border-gray-300 mb-5 rounded-md"
                                />
                                {errors.content?.type === 'minLength' && <span style={{ color: "red" }}>Minimum 10 letters</span>}
                                {errors.content?.type === 'maxLength' && <span style={{ color: "red" }}>Maximun 150 letters</span>}
                            </div>

                            <PreviewImage selectedFile={selectedFile} setSelectedFile={setSelectedFile} validate={validate} />

                            <div className="flex">
                                <div className="w-25"></div>
                                <div className="flex items-center cursor-pointer">
                                    <div className="flex-1 text-center px-1 py-1 m-2">
                                        <label className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-200 hover:text-blue-300">
                                            <IoImagesOutline size={25} />
                                            <input
                                                id="upload"
                                                type="file"
                                                className="hidden"
                                                onChange={(event) => {
                                                    setSelectedFile(event.target.files[0]);
                                                    setValidate(validateFile(event.target.files[0]?.name));
                                                }}
                                            />
                                            <span className="ml-2 text-black">{selectedFile?.name}</span>
                                        </label>
                                        {validate && <span style={{ color: "red" }}>{validate}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
