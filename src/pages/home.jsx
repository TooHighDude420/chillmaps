import { useEffect, useState } from "react";
import databaseCallList from "../api";
import Post from "../components/post";

function Home() {
    const [posts, setPosts] = useState([]);

    // fetch post from database
    useEffect(() => {
        databaseCallList.read(setPosts);
    }, []);

    return (
        <div className="w-full max-h-[80vh] flex flex-col items-center">
            <div className="w-[90%] flex flex-col items-center">
                <div className="w-[90%] overflow-y-scroll max-h-[80vh] flex flex-col items-center">
                    {/* displaying fetched posts */}
                    {posts.map((post, key) => (
                        <Post key={key} title={post.title} description={post.description} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;