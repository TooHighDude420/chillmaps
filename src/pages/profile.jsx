import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

import ProfilePosts from "../components/profilePosts";
import ProfileSettings from "../components/profileSettings";
import profilePic from "../assets/profile.svg"
import databaseCallList from "../api";

function Profile() {
    const navigate = useNavigate();

    const [cUser, setCUser] = useState(null);
    const [user, setUser] = useState(null);
    const [page, setPage] = useState("posts");
    const [img, setImg] = useState("");

    if (!databaseCallList.getLoggedIn()) {
        return navigate("/login")
    }

    function showPosts() {

    }

    useEffect(() => {
        databaseCallList.getUser().then((msg) => {
            setUser(msg);
            databaseCallList.getOwnUser(msg.id).then((mess) => {
                setUser(mess);

                if (mess[0].Images) {
                    databaseCallList.getFromStorage(mess[0].Images.bucket, mess[0].Images.path).then((image) => {
                        setImg(image);
                    });
                }
            });
        });
    }, [])

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-[90%] h-[50vh] rounded-b-2xl flex flex-col justify-between bg-[#0a2a2d]">
                <div className="h-[10vh] w-full flex justify-center items-center text-3xl py-2">
                    {cUser ? <p>{cUser[0].username}</p> : <p> </p>}
                </div>
                <div className="h-[30vh] w-full flex justify-center items-center">
                    <div className="flex w-[90%] h-full just items-center">
                        <div className="w-[20%] h-full ">
                            <img className="h-full w-full rounded-full size-8 px-3" src={img ? img : profilePic}></img>
                        </div>
                        <div className="w-[80%] p-5 rounded-2xl text-2xl h-full bg-[#0e3b3f]">
                            <p>{cUser ? cUser[0].bio : "test"}</p>
                        </div>
                    </div>
                </div>
                <div className="h-[10vh] w-full flex gap-x-5 py-2 justify-center items-center">
                    <button id="posts" className="h-[80%] w-[10%] rounded-2xl bg-amber-800" onClick={() => { setPage("posts") }}>posts</button>
                    <button id="settings" className="h-[80%] w-[10%] rounded-2xl bg-amber-800" onClick={() => { setPage("settings") }}>settings</button>
                    <button className="h-[80%] w-[10%] rounded-2xl bg-amber-800" onClick={() => {
                        databaseCallList.logOff().then(() => {
                            navigate('/')
                        });
                    }}>logout</button>
                </div>
            </div>
            <div className="overflow-y-scroll w-[80%] h-[80vh] py-6 no-scrollbar">
                {user ?
                    page == "posts" ? <ProfilePosts user={user} /> : <ProfileSettings cUser={cUser} user={user} />
                    : <p></p>
                }
            </div>


        </div>
    )
}

export default Profile