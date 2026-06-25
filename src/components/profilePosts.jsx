import { useEffect, useState } from "react"

import Post from "./post";
import databaseCallList from "../api";

function ProfilePosts({ cUser }) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        databaseCallList.getPostsWithId(cUser[0].UserID).then((msg) => {
            setPosts(msg);
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