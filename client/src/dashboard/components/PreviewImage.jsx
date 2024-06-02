import React from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";


export const PreviewImage = ({ selectedFile, setSelectedFile, validate }) => {
    return (
        <div className={selectedFile && !validate ? '' : 'hidden'}>
            <div className="flex justify-center pt-5" >
                <button
                    type="submit"
                    className={"bg-black p-2 ml-3 w-14 h-10 rounded-full text-white hover:bg-teal-400"}
                >Edit</button>
                <img className="pt-5 w-96 h-full" src={selectedFile && URL.createObjectURL(selectedFile)} alt={selectedFile?.name} />
                <IoCloseCircleOutline className="cursor-pointer" size={25} onClick={() => setSelectedFile()} />
            </div>
        </div>
    )
}
