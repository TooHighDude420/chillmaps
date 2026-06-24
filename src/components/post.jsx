import { use, useEffect, useRef, useState } from "react";
import databaseCallList from "../api";
import licon from '../assets/like.png';
import full_licon from '../assets/like_full.png';
import commicon from '../assets/comment.png';

function Post({ post, id }) {
    const [image, setImage] = useState(null);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        databaseCallList.getFromStorage(post.Images.bucket, post.Images.path).then((img) => {
            setImage(img);
        });

        databaseCallList.getComments(post.postID).then((com) => {
            setComments(com);
        });

        databaseCallList.getLikes(post.postID).then((msg) => {
            setLikes(msg.likes);
        });

        databaseCallList.getUser().then((usr) => {
            setUser(usr);
        });
    }, []);

    function handleLike() {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);

            databaseCallList.unlikePost(post.postID)
        } else {
            setLikes(likes + 1);
            setLiked(true);

            databaseCallList.likePost(post.postID);
        }
    }

    function handleComment() {
        const commentSec = document.getElementById(`commentsec${id}`);
        commentSec.classList.toggle("hidden");
    }

    return (
        <div className="w-full flex flex-col pb-2 items-center bg-[#010f10] rounded-3xl lg:w-[50%]">
            <div className="flex justify-center items-center h-[5vh] w-[90%]">
                <div className="flex justify-around w-full">
                    <b>{post.title}</b>
                    {post.Users.username}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <img className="w-[80%] rounded-3xl" src={image}></img>
            </div>
            <div className="flex justify-center items-center h-[5vh]">
                <p>{post.description}</p>
            </div>

            <div className="flex w-full justify-center items-center gap-x-5 pb-2">
                <div className="flex w-fit gap-x-2 justify-center items-center">
                    <button onClick={handleLike} id={`likebtn${id}`}>
                        <img src={liked ? full_licon : licon} className="size-8" />
                    </button>

                    <p>{likes}</p>
                </div>

                <div className="flex w-fit gap-x-2 justify-center items-center">
                    <button onClick={handleComment}  id={`commentbtn${id}`}>
                        <img src={commicon} className="size-8 rotate-z-90" />
                    </button>

                    <p>{comments.length}</p>
                </div>
            </div>

            <div className="hidden h-fit max-h-[50vh] w-full flex flex-col justify-between items-center" id={`commentsec${id}`}>
                <div className="flex w-[90%] flex-col items-center py-2 bg-[#043236] rounded-2xl">
                    {comments.length > 0 ?
                        comments.map((com) => {
                            return (
                                <div className="w-full px-5 flex justify-between gap-x-5 overflow-y-scroll no-scrollbar">
                                    <p>{com.Users.username}:</p>
                                    <p>{com.comment}</p>
                                </div>
                            )
                        })
                        : <p>no comments</p>}
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();

                    databaseCallList.genericInsert("comments", [
                        {
                            post_id: post.postID,
                            comment: e.target[`comment${id}`].value,
                            user_id: user.id
                        }
                    ]).then();
                }}>
                    <div className="flex gap-x-4 py-2">
                        <input type="text" id={`comment${id}`} className="bg-white rounded-2xl pl-5 text-black" />
                        <button type="submit" id={`commentsub${id}`}>comment</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Post;