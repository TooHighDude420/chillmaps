import profile from "../assets/profile.svg";

function ChatItem({ username, clickEvent }) {
    return (
        <div className="w-[90%] min-h-[10%] max-h-[10%] bg-[#011416] flex justify-center items-center gap-x-6 pointer-events-auto" onClick={() => { clickEvent() }}>
            <img src={profile} className="size-8" alt="profileDummy"></img>
            <p className="max-w-[50%] min-w-[50%] overflow-hidden">{username}</p>
        </div>
    )
}

export default ChatItem