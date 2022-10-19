import { getUser, getHeaders, isLoggedIn } from "../auth.js";
import createView from "../createView.js";

let posts;
let loggedInUser;
let comments;

export default function HomePage(props) {
  comments = props.comments
  loggedInUser = getUser();
  posts = props.posts;
  console.log(comments);
  console.log(posts);
  const postsHTML = generatePostsHTML(props.posts);
  const addPostHTML = generateAddPostHTML();
  // const commentsHTML = generateCommentsHTML();
  //Return basic view of Homepage no matter if logged in or not:
  return `
<!--    <header style="text-align: center">-->
<!--      <h1>What's New!</h1>-->
<!--    </header>-->
    <div class="container home">
      <h3 style="text-align: center">Featured Highlights</h3>
      <div class="highlights">
        <div class="highlights">Highlights</div>
      </div>
      <div class="col add-post">
          ${addPostHTML}
      </div>
      <div class="row">
        <br>
<!--            <div class="row">-->
<!--            </div>-->
<!--            <div class="row">--
           </div>-->
          <div class="col profile-col">
            <!-- Left column -->
            <div class="profile-header">
              <!-- Bio -->
              <h3 class="bio"><a>Bio<a></h3>
              <h2 class="profile-element"><a>@${loggedInUser.gamer_tag}</a></h2>
              <p class="profile-element profile-website">Web Developer</p>
              <button class="btn btn-outline-dark chat-btn" data-mdb-ripple-color="dark">Chat with ${loggedInUser.userName}</button>
            </div>
          </div>
<!--          middle colum-->
           <div class="col-6 home-post">
              <ol class="tweet-list">
                  ${postsHTML}  
              </ol>
              
          </div>
            <!-- The right column will start here -->
          <div class="col right-col">
            <div class="content-panel">
              <div class="panel-header">
                <h4>Favorite Games</h4>
              </div>
            </div>
          </div>
        </div>
    `;
}
//Shows up first in newsfeed:
function generateAddPostHTML() {
  let addHTML = ``;
  //user has to be logged in to add post:
  if (!isLoggedIn()) {
    return addHTML;
  }
  addHTML = `
        <div class="add-form">
          <form>
              <div>
                  <label for="content"></label>
                  <textarea id="content" class="form-control" name="content" rows="5" cols="50" placeholder="What's on your mind"></textarea>
                  <div class="invalid-feedback">
                      Content cannot be blank.
                  </div>
                  <div class="valid-feedback">
                      Content is ok!
                  </div>
              </div>
              <button data-id="0" id="savePost" name="savePost" type="button" class="my-button button btn-primary">Share Post</button>
          </form>
        </div>`;

  return addHTML;
}

function generatePostsHTML(posts) {
  let postsHTML = ``

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    // const commentsHTML = generateCommentsHTML();
    let authorName = "";
    //sets value of authorName variable:
    if (post.user) {
      authorName = post.author.userName;
    }
    //generates all posts:
    postsHTML +=`
    <li class="home-card">
        <div class="post-content">
            <div class="post-header">
                <span class="fullname"><strong>${post.author.userName}</strong></span>
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
              </a>
            `;
    //Conditional concats the edit/delete buttons to postsHTML and shows only for authors of post or admin:
    if(loggedInUser.role === "ADMIN" || loggedInUser.userName === post.author.userName) {
      postsHTML += `<button data-id=${post.id} class="btn btn-primary editPost">Edit</ion-icon>
      <button data-id=${post.id} class="btn btn-danger deletePost">Delete</button>`;
    }
    //This concats the closing tags of the main postsHTML and adds comment box:
    postsHTML += `
    </div></li><div class="row">
        <div class="col-10 comment add-post">
            <form>
              <div>
                  <label for="comment"></label>
<!--                  <input type="text" placeholder="Say Something!" id="comment-box">-->
                  <input class="input-comments" type="text" placeholder="Say Something!" id="comment-box">
              </div>
              <button id="comment-btn" data-id=${post.id} name="saveComment" type="button" class="my-button button btn-primary save-comment-btn">Comment</button>
            </form>
          <!--End Comment-->
        </div><!--End col -->
      </div><!-- End row -->`;
    }
  return postsHTML;
}


// function generateCommentsHTML() {
//   let commentsHTML = ``;
//   //user has to be logged in to add post:
//   if (!isLoggedIn()) {
//     return commentsHTML;
//   }
//   commentsHTML = `
//       <div class="row">
//         <div class="col-10 comment add-post">
//             <form>
//               <div>
//                   <label for="comment"></label>
// <!--                  <input type="text" placeholder="Say Something!" id="comment-box">-->
//                   <input class="input-comments" type="text" placeholder="Say Something!" id="comment-box">
//               </div>
//               <button name="saveComment" type="button" class="my-button button btn-primary save-comment-btn">Comment</button>
//             </form>
//           <!--End Comment-->
//         </div><!--End col -->
//       </div><!-- End row -->`;
//   return commentsHTML;
// }

export function postSetup() {
  setupSaveHandler();
  setupEditHandlers();
  setupDeleteHandlers();
  postCommentValue();
  // setupValidationHandlers();
  // validateFields();
  // setupCommentHandler();
  // savePostComment();
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
  console.log(saveButton);
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
//Post comments functionality:
//only works for one button
function postCommentValue () {
  const commentBtns = document.querySelector("#comment-btn");
    commentBtns.addEventListener("click", function (event) {
      const commentTests = document.querySelector("#comment-box").value;
      const postId = commentBtns.getAttribute("data-id");

      fetch('http://localhost:8080/api/postcomments/postcomment/' + postId, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(commentTests
        ),
      })
          .then(function (response) {
            return response.json()
          })
          .then(function (data) {
            console.log(data)
          })
          .catch(error => console.error('Error:', error)
          )
    });
}




