import { Link, useLocation } from "react-router";

import homeIco from '../assets/home.svg';
import chatIco from '../assets/chat.svg';
import postIco from '../assets/post.svg';
import mapIco from '../assets/map.svg';
import profileIco from '../assets/profile.svg';
import databaseCallList from "../api";
import { useEffect, useState } from "react";

function Navbar() {
    const [profilePic, setprofilePic] = useState(null);

    useEffect(() => {
        databaseCallList.getUser().then((msg) => {
            databaseCallList.getOwnUser(msg.id).then((data) => {
                databaseCallList.getFromStorage(data[0].Images.bucket, data[0].Images.path).then((mess) => {
                    setprofilePic(mess);
                })
            })
        })
    }, [])


    if (useLocation().pathname == "/login") {
        return (
            <div className="h-[10vh] w-full bg-[#021A1C]">

            </div>
        )
    } else {
        return (
            <div className="h-[10vh] w-full flex justify-around lg:justify-center items-center bg-[#092123] gap-x-[2vw] sticky bottom-0">
                <Link to={'/'}><img src={homeIco} className="size-16"></img></Link>
                <Link to={'/chat'}><img src={chatIco} className="size-16"></img></Link>
                <Link to={'/post'}><img src={postIco} className="size-16"></img></Link>
                <Link to={'/map'}><img src={mapIco} className="size-16"></img></Link>
                <Link to={'/profile'}><img src={profilePic ? profilePic : profileIco} className="size-16 rounded-full"></img></Link>
            </div>
        )
    }
}

export default Navbar;