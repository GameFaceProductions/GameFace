import CreateView from "../createView.js"

let me;
export default function prepareUserHTML(props) {
    me = props.me;
    console.log(me);
    // make the user's original pw available somewhere in here
    return `
<div class="container">
    <div class="row">
    <h1 class="text-center">User Info</h1>
            <hr>
            <h5 id="username" class="text-center text-nowrap col-sm-12 col-xl-4">Username: ${me.userName}</h5>
            <h5 id="email" class="text-center text-nowrap col-sm-12 col-xl-4">Email: ${me.email}</h5>
            <h5 id="role" class="text-center text-nowrap col-sm-12 col-xl-4">Role: ${me.role} </h5>
            <hr>
            <form>
                <label for="oldpassword">Current password:</label>
                <input class="col-12" type="password" id="oldpassword" name="oldpassword">
                <br>
                <br>
                <label for="newpassword">New password:</label>
                <input class="col-12" type="password" id="newpassword" name="newpassword">
                <br>
                <br>
                <label for="confirmpassword">Confirm new password:</label>
                <input class="col-12" type="password" id="confirmpassword" name="confirmpassword">
                <br>
                <button id="toggleShowPassword" name="toggleShowPassword">Show Password?</button>
                <button class="mt-1 mb-1" id="updatePassword" name="updatePassword">Save New Password</button>
            </form>
            <hr>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Author</th>
                        <th scope="col">Categories</th>
                    </tr>
                </thead>
                <tbody id="tbInsert">
                </tbody>
            </table>
    </div>
</div>
    `;
}

export function prepareUserJS() {
    doTogglePasswordHandler();
    doSavePasswordHandler();
    showUserPosts();
}

function doSavePasswordHandler() {
    const button = document.querySelector("#updatePassword");
    button.addEventListener("click", function (event) {
        // grab the 3 password field values
        const oldPasswordField = document.querySelector('#oldpassword');
        const newPasswordField = document.querySelector('#newpassword');
        const oldPassword = oldPasswordField.value;
        const newPassword = newPasswordField.value;
        const request = {
            method: "PUT",
        }
        const url = `${USER_API_BASE_URL}/${me.id}/updatePassword?oldPassword=${oldPassword}&newPassword=${newPassword}`
        fetch(url, request)
            .then(function (response) {
                CreateView("/");
            });
    });
}

function doTogglePasswordHandler() {
    const button = document.querySelector("#toggleShowPassword");
    button.addEventListener("click", function (event) {
        // grab a reference to confirmpassword
        const oldPassword = document.querySelector("#oldpassword");
        const newPassword = document.querySelector("#newpassword");
        const confirmPassword = document.querySelector("#confirmpassword");
        if (confirmPassword.getAttribute("type") === "password") {
            confirmPassword.setAttribute("type", "text");
            oldPassword.setAttribute("type", "text");
            newPassword.setAttribute("type", "text");
        } else {
            confirmPassword.setAttribute("type", "password");
            oldPassword.setAttribute("type", "password");
            newPassword.setAttribute("type", "password");
        }
    });
}

function showUserPosts() {
    let tbInsert = document.getElementById('tbInsert');
    if (me.posts) {
        for (let i = 0; i < me.posts.length; i++) {
            tbInsert.innerHTML += `
        <tr>
        <td id="title">${me.posts[i].title}</td>
        <td id="content">${me.posts[i].content}</td>
        <td id="author">${me.userName}</td>
        <td class="categories"></td>
            </tr>`
        }
        let tdInsert = document.getElementsByClassName('categories');
        for (let j = 0; j < me.posts.length; j++) {
            if (me.posts[j].categories == null) {
                return;
            } else {
                console.log(me.posts[j].categories);
            }
            for (let i = 0; i < me.posts[j].categories.length; i++) {
                console.log(me.posts[j].categories[i].name)
                tdInsert[j].innerHTML += me.posts[j].categories[i].name;
                if (i < me.posts[j].categories.length - 1) {
                    tdInsert[j].innerHTML += ", ";
                }
            }
        }
    }
}