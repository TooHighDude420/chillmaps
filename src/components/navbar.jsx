import { Link } from "react-router";

import homeIco from '../assets/home.svg';
import chatIco from '../assets/chat.svg';
import postIco from '../assets/post.svg';
import mapIco from '../assets/map.svg';
import profileIco from '../assets/profile.svg';

function Navbar() {
    return (
        <div className="h-[10vh] w-full flex justify-around lg:justify-center items-center bg-[#092123] gap-x-[2vw] sticky bottom-0">
            <Link to={'/'}><img src={homeIco} className="size-16"></img></Link>
            <Link to={'/chat'}><img src={chatIco} className="size-16"></img></Link>
            <Link to={'/post'}><img src={postIco} className="size-16"></img></Link>
            <Link to={'/map'}><img src={mapIco} className="size-16"></img></Link>
            <Link to={'/profile'}><img src={profileIco} className="size-16"></img></Link>
        </div>
    )
}

export default Navbar;