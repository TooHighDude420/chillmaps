import { useEffect, useState } from "react"
import databaseCallList from "../api";
import { useNavigate } from "react-router";

function ProfileSettings({ cUser, user }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate()

    function handleUpdate(username, email, bio) {
        let active = 0;
        let done = 0;

        if (selectedFile) {
            active++;

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
                            done++;
                            if (done == active) {
                                navigate('/')
                            }
                        });
                    })
                });
            });
        }

        if (username != cUser[0].username) {
            active++;
            databaseCallList.updateUsername(username, user.id).then((msg) => {
                done++;
                if (done == active) {
                    navigate('/')
                }
            })
        }

        if (email != user.email) {
            active++;
            databaseCallList.updateEmail(email).then((msg) => {
                done++;

                if (done == active) {
                    navigate('/')
                }
            })
        }

        if (bio != cUser[0].bio) {
            active++;
            databaseCallList.updateBio(bio, user.id).then((msg) => {
                done++;
                if (done == active) {
                    navigate('/')
                }
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

                        <button type="submit" id="update">Update!</button>
                    </form>
                    : <p>loading</p>
            }
        </div>
    )
}

export default ProfileSettings