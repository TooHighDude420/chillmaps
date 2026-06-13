import { use, useEffect, useState } from "react";
import databaseCallList from "../api";

function Post({ title, description, media }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (media) {
            databaseCallList.genericGetById("Images", "ImageID", media).then((data) => {
                databaseCallList.getFromStorage(data[0].bucket, data[0].path).then((img) => {
                    setImage(img);
                })
            })
        }
    }, [media])

    return (
        <div className="w-full flex flex-col items-center bg-[#010f10] rounded-3xl lg:w-[50%]">
            <div className="flex justify-center items-center h-[5vh]">
                <p><b>{title}</b></p>
            </div>
            <div className="flex justify-center items-center">
                <img className="w-[80%] rounded-3xl" src={image}></img>
                <p>{media}</p>
            </div>
            <div className="flex justify-center items-center h-[5vh]">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Post;