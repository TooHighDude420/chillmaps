import { useEffect } from "react"

function ChatPage({ username, messages }) {
    useEffect(() => {
        let lastIndex = messages.length - 1;
        let lastMessage = document.getElementById(`message-${lastIndex}`);
        let messageBox = document.getElementById("newMessage");

        messageBox.value = "";
        lastMessage.scrollIntoView({ behavior: "instant" });
    }, [messages]);

    return (
        <div className="w-full h-full">
            {/* header with username */}
            <div className="w-full h-[10%] flex justify-center items-center bg-[#020d0f] sticky top-0">
                <p>{username}</p>
            </div>

            {/* main chat */}
            <div className="w-full h-[80%] pl-5 pr-5 flex flex-col gap-y-5 py-5 overflow-y-scroll no-scrollbar scroll-smooth">
                {
                    messages.map((message, key) => {
                        return (
                            <div key={key} id={`message-${key}`} className={message.username == username ? "flex flex-col items-start" : "flex flex-col items-end"}>
                                <p className={
                                    message.username == username ?
                                        "bg-green-950 py-3 px-5 rounded-full max-w-[40%]"
                                        : "bg-green-900 py-3 px-5 rounded-full max-w-[40%]"}>{message.message}</p>
                            </div>
                        )
                    })
                }
            </div>

            {/* message box */}
            <div className="h-[10%] w-full flex justify-center items-center">
                <div className="w-[90%] h-[80%] bg-green-900 rounded-full flex justify-center items-center">
                    <input className="w-[90%] focus:outline-0" type="text" id="newMessage" placeholder="type your message here" onKeyDown={(key) => {
                        if (key.key == "Enter") {
                            let newMessage = document.getElementById("newMessage");
                            newMessage.value = ""
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default ChatPage