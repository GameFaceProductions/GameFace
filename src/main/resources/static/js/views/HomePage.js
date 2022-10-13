import { getUser, getHeaders, isLoggedIn } from "../auth.js";
import createView from "../createView.js";

let posts;
let loggedInUser;

export default function HomePage(props) {

  loggedInUser = getUser();
  const postsHTML = generatePostsHTML(props.posts);
  posts = props.posts;
  console.log(props);

  const addPostHTML = generateAddPostHTML();

  return `
    <header style="text-align: center">
      <h1>Whats New:</h1>
    </header>
    <div class="container main-posts">
        <h3 style="text-align: center">News Feed:</h3>
        <div class="row">
          <div class="col add-post">
            ${addPostHTML}
          </div>
        </div>
        <div class="row">
            <div class="col home-post">
                <ol class="tweet-list">
                    ${postsHTML}  
                </ol>
            </div>
        </div>
        
      </li>
    </div>
    `;

}


function generatePostsHTML(posts) {
  let postsHTML = ``

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    let authorName = "";
    if (post.user) {
      authorName = post.author.userName;
    }

    postsHTML += `
        <li class="home-card">
            <div class="post-content">
                <div class="post-header">
                    <span class="fullname"><strong>${post.author.userName}</strong></span>
                    <span class="username"><strong>${post.author.userName}</strong></span>
                    <span class="username"><strong>${post.createdAt}</strong></span>
                </div>
                <a><img class="post-picture" src="https://picsum.photos/80/80" alt="profile pic"></a>
                <div class="post-text">
                    <p class="" lang="es" data-aria-label-part="0"><br>${post.content}</p>
                </div>
                <div class="post-footer">
                    <a class="post-footer-btn">
                        <i class="fa-regular fa-comment" aria-hidden="true"></i><span> 18</span>
                    </a>
                    <a class="post-footer-btn">
                        <i class="fa-regular fa-thumbs-up" aria-hidden="true"></i><span> 202</span>
                    </a>`;

    if(loggedInUser.role === "ADMIN" || loggedInUser.userName === post.author.userName) {
      postsHTML += `<button data-id=${post.id} class="btn btn-primary editPost">Edit</button>
                            <button data-id=${post.id} class="btn btn-danger deletePost">Delete</button>`;
    }
    postsHTML += `</div></div></li>`;

  }
  return postsHTML;
}


function generateAddPostHTML() {
  let addHTML = ``;

  if (!isLoggedIn()) {
    return addHTML;
  }

  addHTML = `<div class="add-form">
            <form>
                <div>
                    <label for="content">Share Your Thoughts!</label><br>
                    <textarea id="content" class="form-control" name="content" rows="5" cols="50" placeholder="What's on your mind"></textarea>
                    <div class="invalid-feedback">
                        Content cannot be blank.
                    </div>
                    <div class="valid-feedback">
                        Content is ok!
                    </div>
                </div>
                <button data-id="0" id="savePost" name="savePost" type="button" class="my-button button btn-primary">Share Post</button>
            </form></div>`;

  return addHTML;
}

export function postSetup() {
  setupSaveHandler();
  setupEditHandlers();
  setupDeleteHandlers();
  setupValidationHandlers();
  validateFields();
}

function setupValidationHandlers() {
  let input = document.querySelector("#content");
  input.addEventListener("keyup", validateFields);
}

function validateFields() {
  let isValid = true;

 let input = document.querySelector("#content");
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

  const contentField = document.querySelector("#content");
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
  };
  const url = POST_API_BASE_URL + `/${postId}`;
  fetch(url, request).then(function (response) {
    if (response.status !== 200) {
      console.log("fetch returned bad status: " + response.status);
      console.log(response.statusText);
      return;
    }
    createView("/home");
  });
}

function setupSaveHandler() {
  const saveButton = document.querySelector("#savePost");
  saveButton.addEventListener("click", function (event) {
    const postId = parseInt(this.getAttribute("data-id"));
    savePost(postId);
  });
}

function savePost(postId) {

  const contentField = document.querySelector("#content");

  if (!validateFields()) {
    return;
  }
  const post = {
    content: contentField.value
  };
  // make the request
  const request = {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(post),
  };
  let url = POST_API_BASE_URL;
  // if we are updating a post, change the request and the url
  if (postId > 0) {
    request.method = "PUT";
    url += `/${postId}`;
  }
  fetch(url, request).then(function (response) {
    if (response.status !== 200) {
      console.log("fetch returned bad status code: " + response.status);
      console.log(response.statusText);
      return;
    }
    // location.reload();
    createView("/home");
  });
}

//
