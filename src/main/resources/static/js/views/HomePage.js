import CreateView from "../createView.js";
import {getHeaders, isLoggedIn} from "../auth.js";
import {getUser} from "../auth.js";
import createView from "../createView.js";

let posts;
const catList = ["Tech", "Testing", "Coding", "Nature", "Gaming"];

export default function HomePage(props) {
    const postsHTML = generatePostsHTML(props.posts);
    const catHTML = generateCategoriesHTML();
    // save this for loading edits later
    posts = props.posts;
    if (!isLoggedIn()) {
        return `<header>
            <h1>Posts Page</h1>
        </header>
        <main>
              <h3>Lists of posts</h3>
            <div>
                ${postsHTML}   
            </div>`;
    } else {
        return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
              <h3>Lists of posts</h3>
            <div>
                ${postsHTML}   
            </div>
            <h3>Add a post</h3>
            <form>
                <div>
                    <label for="title">Title:</label><br>
                    <input id="title" name="title" class="form-control" type="text" placeholder="Enter title">
                    <div class="invalid-feedback">
                        Title cannot be blank.
                    </div>
                    <div class="valid-feedback">
                        Your title is ok!
                    </div>
                </div>
                <div>
                    <label for="content">Content:</label><br>
                    <textarea id="content" class="mb-1 form-control" name="content" rows="10" cols="50" placeholder="Enter content"></textarea>
                    <div class="invalid-feedback">
                        Content cannot be blank.
                    </div>
                    <div class="valid-feedback">
                        Content is ok!
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="categories">Categories (Hold <i class="fa-brands fa-windows"></i> or ⌘):</label><br>
                            <select class="form-select" name="categories" id="categories" multiple>
                                ${catHTML}
                            </select>
                        </div>
                    </div>
                    <button data-id="0" id="savePost" name="savePost" class="float-end mt-1 btn btn-primary">Save Post</button>
                </div>
            </form>
        </main>`
    }
}

function generateCategoriesHTML() {
    let cats;
    for (let i = 0; i < catList.length; i++) {
        cats += `<option class="categoryList" value=${i + 1}>${catList[i]}</option>`
    }
    return cats
}

function generatePostsHTML(posts) {
    let postsHTML = `
        <table class="table">
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Categories</th>
            <th scope="col">Author</th>
        </tr>
        </thead>
        <tbody>
    `;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        let categories = '';
        for (let j = 0; j < post.categories.length; j++) {
            categories += post.categories[j].name;
            if (j < post.categories.length - 1) {
                categories += ", "
            }
        }
        postsHTML += `<tr>
            <td>${post.title}</td>
            <td>${post.content}</td>
            <td>${categories}</td>
            <td>${post.author.userName}</td>
            `;
        let user = getUser();
        if (user.userName === post.author.userName || user.role === 'ADMIN') {
            postsHTML += `<td><button data-id=${post.id} class="btn btn-primary editPost">Edit</button></td>
            <td><button data-id=${post.id} class="btn btn-danger deletePost">Delete</button></td>
        </tr>`
        } else {
            postsHTML += `<td></td><td></td></tr>`
        }

    }
    postsHTML += `</tbody></table>`;
    return postsHTML;
}

export function postSetup() {
    setupSaveHandler();
    setupEditHandlers();
    setupDeleteHandlers();
    setupValidationHandlers();
}

function setupValidationHandlers() {
    let input = document.querySelector("#title");
    input.addEventListener("keyup", validateFields);
    input = document.querySelector("#content");
    input.addEventListener("keyup", validateFields);
}

function validateFields() {
    let isValid = true;
    let input = document.querySelector("#title");
    if (input.value.trim().length < 1) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        isValid = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }

    input = document.querySelector("#content");
    if (input.value.trim().length < 1) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        isValid = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }

    return isValid;
}

function setupEditHandlers() {
    // target all delete buttons
    const editButtons = document.querySelectorAll(".editPost");
    // add click handler to all delete buttons
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function (event) {
            // get the post id of the delete button
            const postId = parseInt(this.getAttribute("data-id"));
            loadPostIntoForm(postId);
        });
    }
}

function loadPostIntoForm(postId) {
    // go find the post in the posts data that matches postId
    const post = fetchPostById(postId);
    if (!post) {
        console.log("did not find post for id " + postId);
        return;
    }
    // load the post data into the form
    const titleField = document.querySelector("#title");
    const contentField = document.querySelector("#content");
    const categoriesField = document.querySelectorAll('.categoryList')
    const PostCats = post.categories
    console.log(PostCats);
    console.log(catList);
    //THIS DOES NOT WORK, DOES SOME WEIRD STUFF RIGHT NOW
    // NEED TO FIGURE OUT HOW TO SELECT SPECIFIC CATS FROM MULTISELECT TO ONLY CHANGE THOSE
    // SPECIFIC OPTIONS TO BE SELECTED
    // if matched cat is equal to option cat then make THAT cat selected?
    // for (let i = 0; i < PostCats.length; i++) {
    //     let catListCurrentCat = PostCats[i].name;
    //     console.log(catListCurrentCat);
    //     for (let j = 0; j < catList.length; j++) {
    //         console.log("MATCH TO: " + catList[j]);
    //         if (catList[j].toLowerCase() === PostCats[i].name.toLowerCase()) {
    //             console.log("Matched: " + catListCurrentCat);
    //             categoriesField[i].toggleAttribute('selected');
    //         }
    //     }
    // }
    // NEED TO PULL CATEGORIES FOR EDITING
    // Need to grab categories of selected post and push them in as selected cats for edit

    titleField.value = post.title;
    contentField.value = post.content;
    validateFields();
    const saveButton = document.querySelector("#savePost");
    saveButton.setAttribute("data-id", postId);
}

function fetchPostById(postId) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === postId) {
            return posts[i];
        }
    }
    // didn't find it so return something falsy
    return false;
}

function setupDeleteHandlers() {
    // target all delete buttons
    const deleteButtons = document.querySelectorAll(".deletePost");
    // add click handler to all delete buttons
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function (event) {
            // get the post id of the delete button
            const postId = this.getAttribute("data-id");
            deletePost(postId);
        });
    }
}

function deletePost(postId) {
    const request = {
        method: "DELETE",
        headers: getHeaders(),
    }
    const url = POST_API_BASE_URL + `/${postId}`;
    fetch(url, request)
        .then(function (response) {
            // TODO: check the response code
            CreateView("/posts");
        })
}


function setupSaveHandler() {
    // trying to push categories into new post but getting back [Object object] instead of the correct
    // value which I am able to log outside of the loop...
    // Making progress but js still wont read the objects properly
    //UPDATE: IT WORKS!
    const saveButton = document.querySelector("#savePost");
    saveButton.addEventListener("click", function (event) {
        validateFields();
        const values = Array.prototype.slice.call(document.querySelectorAll('#categories option:checked'), 0).map(function (v, i, a) {
            return v.value;
        });
        // TODO: refactor later to a separate function for hygiene
        // TODO: check the data-id for the save button
        const postId = parseInt(this.getAttribute("data-id"));
        // get the title and content for the new/updated post
        const titleField = document.querySelector("#title");
        const contentField = document.querySelector("#content");
        let categoriesList = [];
        for (let i = 0; i < values.length; i++) {
            categoriesList.push({id: values[i]})
        }
        console.log(categoriesList);
        // make the new/updated post object
        const post = {
            title: titleField.value,
            content: contentField.value,
            categories: categoriesList
        }
        // make the request
        const request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(post)
        }
        let url = POST_API_BASE_URL;
        // if we are updating a post, change the request and the url
        if (postId > 0) {
            request.method = "PUT";
            url += `/${postId}`;
        }
        fetch(url, request)
            .then(function (response) {
                // TODO: check the status code
                CreateView("/posts");
            })
    });
}
