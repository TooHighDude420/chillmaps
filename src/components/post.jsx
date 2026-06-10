function Post({title, description}) {
    return (
        <div className="w-full flex flex-col items-center">
            <p>{title}</p>
            <img src="https://placehold.co/600x400"></img>
            <p>{description}</p>
        </div>
    )
}

export default Post;