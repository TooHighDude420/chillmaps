import { useEffect, useState } from "react";

import ChatItem from "../components/chatItem";
import ChatPage from "../components/chatPage";
import databaseCallList from "../api";
import { Navigate } from "react-router";

function Chat() {
    if (!databaseCallList.getLoggedIn()) {
        return <Navigate to={"/login"} />
    }

    const mockData = [
        {
            "user": "testUser",
            "messages": [
                { "username": "testUser", "message": "hey" },
                { "username": "testUser", "message": "wanna hangout later?" },
                { "username": "Admin", "message": "hey, no i dont have time" },
                { "username": "Admin", "message": "i have a lot of work to do" },
                { "username": "testUser", "message": "hey" },
                { "username": "testUser", "message": "wanna hangout later?" },
                { "username": "Admin", "message": "hey, no i dont have time" },
                { "username": "Admin", "message": "i have a lot of work to do" }
            ]
        },
        {
            "user": "mom",
            "messages": [
                { "username": "mom", "message": "hey" },
                { "username": "mom", "message": "what do you want for dinner?" },
                { "username": "Admin", "message": "lasagna sounds good" }
            ]
        },
        {
            "user": "Naomi",
            "messages": [
                { "username": "Naomi", "message": "Heeeyyyy" },
                { "username": "Naomi", "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                { "username": "Admin", "message": "Ik kies een andere" }
            ]
        },
    ]

    const [activeChat, setActiveChat] = useState([]);

    return (
        <div className="w-full flex h-[80vh]">
            <div className="w-[20%] max-h-full py-2 gap-y-2 overflow-y-scroll flex flex-col items-center no-scrollbar">
                {mockData.map((chat, key) => {
                    return <ChatItem key={key} username={chat.user} clickEvent={() => setActiveChat([mockData[key]])} />
                })}
            </div>

            <div className="w-[80%] bg-[#021314]">
                {Object.keys(activeChat) > 0 ?
                    <div className="w-full flex items-center justify-center h-[10%]"><p>no active chat</p></div> :
                    activeChat.map((chat) => {
                        return <ChatPage username={chat.user} messages={chat.messages} />
                    })
                }
            </div>
        </div>
    )
}

export default Chat