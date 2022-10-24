import { getUser, getHeaders, isLoggedIn } from "../auth.js";
import createView from "../createView.js";

let posts;
let loggedInUser;
let postFetch;

export default function HomePage(props) {
  loggedInUser = getUser();
  postFetch = props.posts;
  posts = postFetch.reverse();
  const postsHTML = generatePostsHTML(props.posts);
  const addPostHTML = generateAddPostHTML();

  return `
    <div class="container home">
      <h3 style="text-align: center">Featured Highlights</h3>
      <div class="highlights">
        <div class="highlights">Highlights</div>
      </div>
      <div class="col add-post">
          ${addPostHTML}
      </div>
      <h3 style="text-align: center">Newsfeed</h3>
      <div class="row"><br>
          <div class="col profile-col">
          <!-- Left column -->
          <div class="profile-header">
            <!-- Bio -->
            <img src="${loggedInUser.avatar_url}" class="navbar-avatar rounded-circle" referrerpolicy="no-referrer" style="text-align: center;">
            <h3 class="bio"><a>Bio<a></h3>
            <h2 class="profile-element"><a>@${loggedInUser.gamerTag}</a></h2>
            <p class="profile-element profile-website">Web Developer</p>
<!--            <button class="btn btn-outline-dark chat-btn" data-mdb-ripple-color="dark">Chat with ${loggedInUser.userName}</button>-->
          </div>
        </div>
    <!-- middle colum-->
        <div class="col-6 home-post">
          <ol class="tweet-list">
              ${postsHTML}  
          </ol>
        </div>
    <!-- The right column will start here -->
        <div class="col devFavoritesDiv right-col">
          <div class="content-panel gameCardsDiv">
            <div id="devFavoritesList" class="panel-header">
              <h4 class="text-center">Favorite Games</h4>
            </div>
          </div>
        </div>
    </div>`;
}

//Shows up first in newsfeed:
function generateAddPostHTML() {
  let addHTML = ``;

  addHTML = `
    <div class="highlights">
      <form>
          <div class="add-form">
            <label for="content"></label>
            <textarea id="content" class="form-control" name="content" rows="5" cols="40" placeholder="  What's on your mind"></textarea>
          <button data-id="0" id="savePost" name="savePost" type="button" class="my-button btn btn-primary">Post</button>
      </form>
    </div>`;

  return addHTML;
}

function generatePostsHTML(posts) {
  let postsHTML = ``;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let authorName = "";
    //sets value of authorName variable:
    if (post.user) {
      authorName = post.author.userName;
    }

    postsHTML += `
    <li class="home-card">
        <div class="post-content">
            <div class="post-header">
                <span class="fullname"><strong>${post.author.userName}</strong></span>
                <span class="username"><strong>${post.createdAt}</strong></span>
            </div>
            <a><img class="post-picture" src="${post.author.avatar_url}" alt="profile pic"></a>
            <div class="post-text">
                <p class="" lang="es" data-aria-label-part="0"><br>${post.content}</p>
            </div>
            <div class="post-footer">
              <a class="post-footer-btn">
                  <i class="fa-regular fa-comment" aria-hidden="true"></i><span>${post.postComments.length}</span>
              </a>
              <a class="post-footer-btn">
                  <i class="fa-regular fa-thumbs-up" aria-hidden="true"></i><span>${post.likes.length}</span>
              </a>
               <!--This button is for collapsable comment input-->
              <button data-id="${post.id}" class="btn btn-primary collapse-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseComment-${post.id}" aria-expanded="false" aria-controls="collapseComment">Comment</button>
              <br>
            `;
    //Conditional concats the edit/delete buttons to postsHTML and shows only for authors of post or admin:
    if (
      loggedInUser.role === "ADMIN" ||
      loggedInUser.userName === post.author.userName
    ) {
      postsHTML += `<button data-id=${post.id} class="btn btn-primary editPost">Edit</ion-icon>
              <button data-id=${post.id} class="btn btn-danger deletePost">Delete</button>`;
    }
    //Closes posts/home divs and concat collapsable comment form:
    postsHTML += `</div></li>
            <div class="row collapse" id="collapseComment-${post.id}">
              <div class="col-10 comment">
                <form>
                  <div>
                    <label for="comment"></label>
                    <input class="input-comments add-form" type="text" placeholder="Say Something!" id="comment-box-${
                      post.id
                    }">
                  </div>
                <!--This button is for saving/pushing comment to backend-->
                  <button data-id=${
                    post.id
                  } name="saveComment" type="button" class="my-button button btn-primary save-comment">Comment</button>
                </form>
                ${createPostCommentHTML(post)}
              </div><!--End col -->
            </div>`;
  }
  return postsHTML;
}

function createPostCommentHTML(posts) {
  return `
    <div class="comment-section home-card">
        ${commentsSection(posts)}
    </div>`;
}

function commentsSection(posts) {
  let html = ``;
  for (let i = 0; i < posts.postComments.length; i++) {
    html += `<div>${posts.postComments[i].content}</div>`;
  }
  return html;
}

export function postSetup() {
  setupSaveHandler();
  setupEditHandlers();
  setupDeleteHandlers();
  postCommentValue();
  showDevFavorites();
}

function showDevFavorites() {
  let devFavorites = [
    {
      name: "DayZ",
      url: "https://cdn.cloudflare.steamstatic.com/steam/apps/221100/header.jpg?t=1664545942",
    },
    {
      name: "Portal",
      url: "https://cdn.cloudflare.steamstatic.com/steam/apps/400/header.jpg?t=1663691797",
    },
    {
      name: "Black Ops 3",
      url: "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/header.jpg?t=1646763462",
    },
    {
      name: "Luigi's Mansion",
      url: "https://upload.wikimedia.org/wikipedia/en/5/5e/Lmbox.jpg",
    },
    {
      name: "WoW",
      url: "https://upload.wikimedia.org/wikipedia/en/6/65/World_of_Warcraft.png",
    },
    {
      name: "Mx Bikes",
      url: "https://cdn.akamai.steamstatic.com/steam/apps/655500/capsule_616x353.jpg?t=1645550702",
    },
  ];
  let favoritesList = document.getElementById("devFavoritesList");
  for (let i = 0; i < devFavorites.length; i++) {
    favoritesList.innerHTML += `<div>
<div class="card devFavoritesPoster" style="background-image: url(${devFavorites[i].url})"></div>
    <div class="text-center devFavoritesTitle">${devFavorites[i].name}</div>
</div>`;
  }
}

// Post FETCH/functionality
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
  const saveButton = document.querySelector("#savePost");
  saveButton.setAttribute("data-id", postId);
}

function fetchPostById(postId) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === postId) {
      return posts[i];
    }
  }
  return false;
}

function setupDeleteHandlers() {
  const deleteButtons = document.querySelectorAll(".deletePost");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function (event) {
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
  const post = {
    content: contentField.value,
  };
  const request = {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(post),
  };
  let url = POST_API_BASE_URL;

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
    createView("/home");
  });
}

//Comments FETCH/Functionality:
function postCommentValue() {
  const commentBtns = document.querySelectorAll(".save-comment");
  for (let i = 0; i < commentBtns.length; i++) {
    commentBtns[i].addEventListener("click", function (event) {
      const postId = this.getAttribute("data-id");
      const commentTests = document.querySelector(
        `#comment-box-${postId}`
      ).value;
      fetch("http://localhost:8080/api/postcomments/postcomment/" + postId, {
        method: "POST",
        headers: getHeaders(),
        body: commentTests,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
      createView("/home");
    });
  }
}
