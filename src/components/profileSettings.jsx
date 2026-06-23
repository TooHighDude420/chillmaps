import { useEffect, useState } from "react"
import databaseCallList from "../api";

function ProfileSettings({ cUser }) {
    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        databaseCallList.getUser().then((msg) => {
            console.log(msg)
            setUser(msg);
        })
    }, [])

    function handleUpdate(username, email, bio) {
        if (selectedFile) {
            let nor_name = selectedFile.name.replace(" ", "_");
            databaseCallList.uploadFile(`${Date.now()}.${nor_name}`, selectedFile).then((data) => {
                databaseCallList.genericInsert("Images", [
                    {
                        bucket: "Media",
                        path: data.path
                    }
                ]).then(() => {
                    databaseCallList.getLatest("Images").then((res) => {
                        databaseCallList.updateAvatar(user.id, res[0].ImageID).then((msg) => {
                        });
                    })
                });


                console.log(data)


            });
        }

        if (username != cUser[0].username) {
            databaseCallList.updateUsername(username, user.id).then((msg) => {
                console.log(msg)
            })
        }

        if (email != user.email) {
            databaseCallList.updateEmail(email).then((msg) => {
                console.log(msg)
            })
        }

        if (bio != cUser[0].bio) {
            databaseCallList.updateBio(bio, user.id).then((msg) => {
                console.log(msg)
            })
        }



    }

    return (
        <div className="w-full h-[70vh] max-h-[70vh] gap-y-5 overflow-y-scroll py-5 no-scrollbar flex flex-col items-center">
            {
                user ?
                    <form className="w-full h-full flex flex-col items-center" onSubmit={(e) => {
                        e.preventDefault();

                        let username = e.target.username.value;
                        let email = e.target.email.value;
                        let bio = e.target.bio.value;

                        handleUpdate(username, email, bio)
                    }}>
                        <label htmlFor="username">Username:</label>
                        <input className="bg-white rounded-2xl pl-2 text-black" type="text" name="username" id="username" defaultValue={cUser[0].username} />

                        <label htmlFor="email">E-mail:</label>
                        <input className="bg-white rounded-2xl pl-2 text-black" type="email" name="email" id="email" defaultValue={user.email} />

                        <label htmlFor="avatar">Avatar:</label>
                        <input className="bg-white rounded-2xl pl-2 text-black" type="file" name="avatar" id="avatar" onChange={(e) => {
                            setSelectedFile(e.target.files[0]);
                        }} />

                        <label htmlFor="bio">bio</label>
                        <input className="bg-white rounded-2xl pl-2 text-black" type="bio" name="bio" id="bio" defaultValue={cUser[0].bio} />

                        <button type="submit">Update!</button>
                    </form>
                    : <p>loading</p>
            }
        </div>
    )
}

export default ProfileSettings