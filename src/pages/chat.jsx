import { useEffect, useState } from "react";

import ChatItem from "../components/chatItem";
import ChatPage from "../components/chatPage";

function Chat() {
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
        }
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