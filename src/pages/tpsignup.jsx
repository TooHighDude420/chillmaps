import { useEffect, useState } from "react"
import databaseCallList from "../api"
import { useNavigate } from "react-router";

function TPSignUp() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function getuser() {
            let use = await databaseCallList.getUser();
            setUser(use);

            let exist = await databaseCallList.checkUsers(use.id);
            return exist;
        }

        async function check() {
            let ex = await getuser();

            if (ex) {
                navigate('/')

            }
        }

        if (!user) {
            check();
        }

    }, [])

    if (user) {
        return (
            <div>
                <form onSubmit={
                    async (e) => {
                        await databaseCallList.signUpTP(user, username);
                        navigate('/');
                    }
                }>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id="username" value={user.user_metadata.user_name} onChange={
                        (e) => {
                            setUsername(e.target.value);
                        }
                    } />

                    <button type="submit">continue</button>
                </form>
            </div>
        )
    }
}

export default TPSignUp