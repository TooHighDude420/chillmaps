import { Navigate, useNavigate } from "react-router";
import databaseCallList from "../api";
import testFile from "../assets/hero.png";
import { useEffect, useState } from "react";

function MakePost() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);


    if (!databaseCallList.getLoggedIn()) {
        return navigate("/login")
    }

    useEffect(() => {
        databaseCallList.getUser().then((msg) => {
            setUser(msg)
        })
    })

    function onFileChange(event) {
        setSelectedFile(event.target.files[0]);
    }

    function testUpload(title, description) {
        let nor_name = selectedFile.name.replace(" ", "_");
        databaseCallList.uploadFile(`${Date.now()}.${nor_name}`, selectedFile).then((data) => {
            databaseCallList.genericInsert("Images", [
                {
                    bucket: "Media",
                    path: data.path
                }
            ]).then(() => {
                databaseCallList.getLatest("Images").then((data) => {
                    databaseCallList.genericInsert("posts", [
                        {
                            title: title,
                            description: description,
                            ImageID: data[0].ImageID,
                            userID: user.id
                        }
                    ]);
                });
            });
        });
    }

    return (
        <form className="w-full h-[80vh] flex justify-center items-center" onSubmit={
            (e) => {
                e.preventDefault();

                let title;
                let description;

                title = e.target.posttitle.value;
                description = e.target.postdesc.value;

                testUpload(title, description)
            }
        }>
            <div className="w-[70%] h-[70%] flex flex-col justify-around items-center bg-[#0a2a2d] rounded-2xl p-3">
                <div className="w-full flex flex-col items-center">
                    <label htmlFor="posttitle" className="text-2xl">Title</label>
                    <input type="text" name="posttitle" id="posttitle" placeholder="enter title" className="bg-white text-black rounded-2xl pl-2 text-xl" required></input>
                </div>

                <div className="w-full flex flex-col items-center">

                    <label htmlFor="postdesc" className="text-2xl">Description</label>
                    <input type="text" name="postdesc" id="postdesc" placeholder="enter description" className="bg-white text-black rounded-2xl pl-2 text-xl" required></input>
                </div>

                <div className="w-full flex flex-col items-center">
                    <label htmlFor="upload" className="text-2xl">Upload file</label>
                    <input type="file" name="upload" id="upload" className="bg-white text-black rounded-2xl pl-2 text-xl" onChange={(event) => { onFileChange(event) }} />

                </div>

                {selectedFile == null ?
                    <p>Please select a file</p>
                    : <button className="w-[10%] bg-[#032327] rounded-full p-1" type="submit">Post</button>}
            </div>
        </form>
    )
}

export default MakePost;