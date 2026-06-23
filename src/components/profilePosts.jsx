import { useEffect, useState } from "react"

import Post from "./post";
import databaseCallList from "../api";

function ProfilePosts({ user }) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        console.log(user)
        databaseCallList.getPostsWithId(user[0].UserID).then((msg) => {
            setPosts(msg);
            console.log(msg)
        });
    }, []);

    return (
        <div className="w-full gap-y-5 flex flex-col items-center">
            {posts ?
                posts.map((post, key) => {
                    return (
                        <Post post={post} id={key} />
                    )
                })
                : <p>Loading</p>
            }
        </div>
    )
}

export default ProfilePosts