import { use, useEffect, useState } from "react";
import databaseCallList from "../api";

function Post({ title, description, media, user }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        databaseCallList.getFromStorage(media.bucket, media.path).then((img) => {
            setImage(img);
        })
    });

    return (
        <div className="w-full flex flex-col items-center bg-[#010f10] rounded-3xl lg:w-[50%]">
            <div className="flex justify-center items-center h-[5vh] w-[90%]">
                <div className="flex justify-around w-full">
                    <b>{title}</b>
                    {user.username}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <img className="w-[80%] rounded-3xl" src={image}></img>
            </div>
            <div className="flex justify-center items-center h-[5vh]">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Post;