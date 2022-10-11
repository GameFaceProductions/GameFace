import {getUser} from "../auth.js";

let posts;

export default function ProfilePage(props) {

    let user = getUser();
    let postHTML = generateUserPosts(props.posts);
    posts = props.posts;
    console.log(user)


    return `
        <header>
            <h1>Profile Page</h1>
        </header>
        <main>
            <div class="cover-image"></div>
            <div>
            ${user.userName}
            </div>
            <div>
            ${postHTML}
            </div>
        </main>
    `;
}

function generateUserPosts(posts) {
    let userPosts = ``
    let currentUser = getUser().userName;

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        if (post.author.userName === currentUser) {

            userPosts += `
                <div class="postCard">
                    <div><a>${post.author.userName}</a></div>
                    <div>${post.title}</div>
                    <div>${post.content}</div>
                    <div><p id="time">${post.createdAt}</p></div>
                </div>
                `;
        }
    }
    return userPosts
}