import databaseCallList from "../api";

function insertPost() {
    let title = document.getElementById("posttitle").value;
    let description = document.getElementById("postdesc").value;

    console.log(title, description)

    if (title == "" || description == "") {
        alert("please enter title and description");
    } else {
        databaseCallList.create(title, description);
    }
}

function MakePost() {
    return (
        <>
            <div>
                <form>
                    <input type="text" id="posttitle" placeholder="enter title"></input>
                    <input type="text" id="postdesc" placeholder="enter description"></input>

                    <button type="submit" onClick={() => insertPost()}>Post</button>
                </form>
            </div>
        </>
    )
}

export default MakePost;