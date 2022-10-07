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
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
              <h3>Lists of posts</h3>
            <div>
                ${postsHTML}   
            </div>
            ${addPostHTML}
        </main>
    `;
}

function generateAddPostHTML() {
  let addHTML = ``;

  if (!isLoggedIn()) {
    return addHTML;
  }

  addHTML = `<h3>Add a post</h3>
            <form>
                <div>
                    <label for="title">Title</label><br>
                    <input id="title" name="title" class="form-control" type="text" placeholder="Enter title">
                    <div class="invalid-feedback">
                        Title cannot be blank.
                    </div>
                    <div class="valid-feedback">
                        Your title is ok!
                    </div>
                </div>
                
                <div>
                    <label for="content">Content</label><br>
                    <textarea id="content" class="form-control" name="content" rows="5" cols="50" placeholder="Enter content"></textarea>
                    <div class="invalid-feedback">
                        Content cannot be blank.
                    </div>
                    <div class="valid-feedback">
                        Content is ok!
                    </div>
                </div>
                  <div class="valid-feedback">
                        Content is ok!
                    </div>  
                    <div class="valid-feedback">
                         <label for="date">Posted:</label>
                        <input type="date" id="date" name="trip-start" />
                    </div> 
                <button data-id="0" id="savePost" name="savePost" type="button" class="my-button button btn-primary">Save Post</button>
            </form>`;

  return addHTML;
}

function generatePostsHTML(posts) {
  let postsHTML = `
        <table class="table">
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Author</th>
            <th scope="col">Posted:</th>
        </tr>
        </thead>
        <tbody>
    `;
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    let authorName = "";
    if (post.user) {
      authorName = post.author.userName;
    }

    postsHTML += `<tr>
            <td>${post.title}</td>
            <td>${post.content}</td>
            <td>${post.author.userName}</td>
            <td><p id="time">${post.createdAt}</p></td>
            `;

    console.log(loggedInUser.role);
    console.log(loggedInUser.userName);
    //only admins and author of post can edit/delete it
    if (loggedInUser.role === "ADMIN" || loggedInUser.user === post.user) {
      postsHTML += `<td><button data-id=${post.id} class="btn btn-primary editPost">Edit</button></td>
            <td><button data-id=${post.id} class="btn btn-danger deletePost">Delete</button></td>`;
    } else {
      postsHTML += `<td></td><td></td>`;
    }
    postsHTML += `</tr>`;
  }
  postsHTML += `</tbody></table>`;
  return postsHTML;
}

export function postSetup() {
  setupSaveHandler();
  setupEditHandlers();
  setupDeleteHandlers();
  setupValidationHandlers();
  validateFields();
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
  const titleField = document.querySelector("#title");
  const contentField = document.querySelector("#content");

  if (!validateFields()) {
    return;
  }
  const post = {
    title: titleField.value,
    content: contentField.value,
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
