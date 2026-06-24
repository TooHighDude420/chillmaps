import { useEffect, useState } from "react";
import databaseCallList from "../api";
import Post from "../components/post";
import Skeleton from "react-loading-skeleton";
import { Navigate, useNavigate } from "react-router";


function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        databaseCallList.getLoggedIn().then(() => {
            navigate('/login');
        });
    })

    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState(allPosts);
    const [loading, setLoading] = useState(true);

    function filterPosts(search) {
        return allPosts.filter((item) => {
            return item.Users.username.includes(search)
                || item.title.toLowerCase().includes(search.toLowerCase())
                || item.description.toLowerCase().includes(search.toLowerCase())
        });
    }

    function getPosts() {
        databaseCallList.getPosts().then((data) => {
            setAllPosts(data);
            setPosts(data);
            setLoading(false);
        });
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-[90%] flex flex-col items-center">
                <div className="w-[90%]  flex flex-col items-center gap-y-4 py-2 no-scrollbar">
                    <div>
                        <input type="text" className="bg-white text-black rounded-2xl px-5" onChange={(e) => {
                            setPosts(filterPosts(e.target.value))
                        }} />
                    </div>
                    {/* displaying fetched posts */}
                    {loading ? <Skeleton width={"90vw"} height={"20vh"} /> :
                        posts.map((post, key) => (
                            <Post post={post} id={key} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;