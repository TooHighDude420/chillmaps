import { useEffect, useState } from "react";
import databaseCallList from "../api";
import Post from "../components/post";
import LoadScreen from "../components/loadscreen";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch post from database
    useEffect(() => {
        databaseCallList.read().then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-[90%] flex flex-col items-center">
                <div className="w-[90%]  flex flex-col items-center gap-y-4 no-scrollbar">
                    {/* displaying fetched posts */}
                    {loading ? <Skeleton width={"90vw"} height={"20vh"}/> :
                        posts.map((post, key) => (
                            <Post key={key} title={post.title} description={post.description} />
                        ))
                    }
                    <LoadScreen />

                </div>
            </div>
        </div>
    )
}

export default Home;