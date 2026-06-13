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
    const [selectedFile, setSelectedFile] = useState(null);

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
                            ImageID: data[0].ImageID
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