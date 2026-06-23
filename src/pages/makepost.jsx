import { Navigate, useNavigate } from "react-router";
import databaseCallList from "../api";
import testFile from "../assets/hero.png";
import { useEffect, useState } from "react";

function insertPost() {
    let title = document.getElementById("posttitle").value;
    let description = document.getElementById("postdesc").value;

    if (title == "" || description == "") {
        alert("please enter title and description");
        return;
    } else {
        return { title, description };
    }
}


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

    function testUpload({ title, description }) {
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
        <>
            <div>
                <input type="text" id="posttitle" placeholder="enter title"></input>
                <input type="text" id="postdesc" placeholder="enter description"></input>

                <input type="file" id="upload" onChange={(event) => { onFileChange(event) }} />

                {selectedFile == null ?
                    <p>Please select a file</p>
                    : <button onClick={() => testUpload(insertPost())}>Post</button>}
            </div>
        </>
    )
}

export default MakePost;