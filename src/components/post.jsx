function Post({ title, description }) {
    return (
        <div className="w-full flex flex-col items-center bg-[#010f10] rounded-3xl lg:w-[50%]">
            <div className="flex justify-center items-center h-[5vh]">
                <p><b>{title}</b></p>
            </div>
            <div className="flex justify-center items-center">
                <img className="w-[80%] rounded-3xl" src="https://placehold.co/400x600"></img>
            </div>
            <div className="flex justify-center items-center h-[5vh]">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Post;