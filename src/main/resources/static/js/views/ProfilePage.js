import { getHeaders, getUser, setLoggedInUserInfo } from "../auth.js";
import createView from "../createView.js";

let posts;
let friends;
let user;
let likes;
let theHomiesLikes = [];
let post;
let homies = [];
let userUser;
let postFetch;

export default function ProfilePage(props) {
  //USE FOR SPECIFIC USER ID FETCHING
  user = props.user;
  userUser = props.user;
  postFetch = props.posts;
  posts = postFetch.reverse();
  friends = props.friends;
  likes = props.likes;
  console.log(user);
  return `           <div class="main">
                <!-- This is the div for the cover photo -->
                <div class="cover-photo text-white d-flex flex-row" style=" background-image: url(${
                  user.backdrop_url
                }); height:200px">
<!--                MY CHANGES-->
       
<!--                MY CHANGES-->
                    <!-- End of the cover photo/ Start of the profile picture -->
                    <div class="colorTransparent ms-4 mt-5 d-flex flex-column" style="width: 150px">
                        <img referrerpolicy="no-referrer" src="${
                          user.avatar_url
                        }" alt="Img placeholder" class="img-fluid img-thumbnail mt-4 mb-2" style="width:150px; z-index:1">
                        <!-- End of the profile pic/ start of the account details button -->
                        <button id="editUserInfoBtn" type="button" data-id="${
                          user.id
                        }" class="btn btn-outline-dark account-btn" style="z-index: 1" data-mdb-ripple-color="dark">Edit Profile</button>
                    </div>
                    <div class="ms-3" style="margin-top: 130px">
                        <h5>${user.userName}</h5>
                        <p>${user.region}</p>
                    </div>
                </div>
                <!-- Modal containing lists of current users friends starts here -->
                      <section id="modal-1" class="modal hidden">
                          <div class="flex">
                            <h3 class="text-white">Friends List</h3>
                            <button class="btn-close">⨉</button>
                          </div>
                          <div>
                            <div id="friends-list">
                            </div>
                          </div>
                      </section>
                <!-- End of modal -->
                <div class="overlay hidden"></div>
                <!-- Start of followers/following div -->
                <div class="p-4 text-black">
                    <button id="uploadBtn" type="submit" class="uploadBtn btn"><i class="fa-regular uploadBtnImage fa-image"></i></button>
                    <div class="d-flex justify-content-end text-center py-1">
                        <div class="px-3">
                            <a class="friends-display text-white" href="">
                                <p>${friends.userFriends.length}</p>
                                <p class="small text-muted mb-0">Friends</p>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- End of follower/following div -->
                <div class="container main-content">
                    <div class="row">
                      <div class="col profile-col">
                        <!-- Left column -->
                        <div class="profile-header">
                          <!-- Bio -->
                          <h3 class="bio"><a>Bio<a></h3>
                          <h2 class="profile-element"><a>@${
                            friends.gamerTag
                          }</a></h2>
                          <p class="bio-text text-white">Web Developer</p>
                          <button class="btn btn-outline-dark chat-btn" data-mdb-ripple-color="dark">Chat with ${
                            user.userName
                          }</button>
                          <div id="talkjs-container" style="width: 90%; margin: 30px; height: 500px">
                            <i>Loading chat...</i>
                          </div>
                        </div>
                      </div>
                      <!-- End of the left column -->
                      <!-- The posts/middle-col start here -->
                      <div class="col-6">
                        <ol class="post-list">
                          <div id="postHTML"></div>
                        </ol>
                      </div>
                      <!-- The right column will start here -->
                      <div class="col userFavsDiv right-col">
                        <div class="content-panel gameCardsDiv">
                            <div id="userGames" class="panel-header">
                                <h4 style="text-align: center">Favorite Games</h4>
                                ${getGames()}
                          </div>
                        </div>
                      </div>
                      <!-- End of the right column -->
                    </div>
                </div>
            </div>`;
}

function getGames() {
  let getGamesHtml = "";
  console.log("This is executing");
  for (let i = 0; i < user.games.length; i++) {
    let games = user.games[i].game;
    getGamesHtml += `<div>
    <div class="text-center devFavoritesTitle">${games}</div>
</div>`;
  }
  return getGamesHtml;
}

export function profileSetup() {
  generateUserPosts();
  getGames();
  if (likes.length === null) {
    return;
  } else {
    for (let i = 0; i < likes.length; i++) {
      let userId = likes[i].user.id;
      let postsId = likes[i].posts.id;
      if (user.id === userId) {
        theHomiesLikes.push(postsId);
      }
    }
  }
  gethomies();
  setupModalFunction();
  getFriends();
  postIsLiked();
  uploadNewBackdrop();
  editDeets();
  chatExport();
  hideEdit();
  // handleRefresh();
}
//DOES NOT WORK
// function handleRefresh() {
//   window.onbeforeunload = function () {
//     createView(`/profile/${user.id}`);
//   };
// }
function hideEdit() {
  let editBtn = document.getElementById("editUserInfoBtn");
  let backdropBtn = document.getElementById("uploadBtn");
  if (getUser().id !== user.id) {
    editBtn.classList.add("hidden");
    backdropBtn.classList.add("hidden");
  }
  if (window.performance) {
    console.info("window.performance works fine on this browser");
  }
  console.info(performance.navigation.type);
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    console.info("This page is reloaded");
  } else {
    console.info("This page is not reloaded");
  }
}

function generateUserPosts() {
  let currentUser = user;
  let userPosts = document.getElementById("postHTML");

  for (let i = 0; i < posts.length; i++) {
    post = posts;

    if (post[i].author.id === currentUser.id) {
      userPosts.innerHTML += `
                <li class="post-card">
                    <div class="post-content">
                        <div class="post-header">
                            <span class="fullname"><strong>${post[i].author.userName}</strong></span>
                            <span class="username">@${currentUser.gamerTag}</span>
                            <span class="post-time">- ${post[i].createdAt}</span>
                        </div>
                            <a href=""><img referrerpolicy="no-referrer" class="post-picture" src="${post[i].author.avatar_url}" alt="profile pic"></a>
                        <div class="post-text">
                            <p class="" lang="es" data-aria-label-part="0"><br>${post[i].content}</p>
                        </div>
                        <div class="post-footer">
                            <a href="" class="post-footer-btn">
                              <i class="fa-regular fa-comment" aria-hidden="true"></i><span>${post[i].postComments.length}</span>
                            </a>
                            <div id="${post[i].id}" class="like-button-div"></div>
                        </div>
                    </div>
                </li>
                `;
    }
  }
  let newLikeBtn = "";

  let newHomies = gethomies();
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].author.id === currentUser.id) {
      let likeDiv = document.getElementById(posts[i].id);
      // post = posts[i]
      if (newHomies.includes(posts[i].id)) {
        newLikeBtn = `<a href="" data-id="${posts[i].id}" class="like-buttons post-footer-btn">
                              <i class="fa-regular fa-thumbs-up text-primary" aria-hidden="true"></i><span>${posts[i].likes.length}</span>
                            </a>`;
      } else {
        newLikeBtn = `<a href="" id="${posts[i].likes.length + 1}" data-id="${
          posts[i].id
        }" class="like-buttons post-footer-btn">
                              <i class="testing fa-regular fa-thumbs-up" aria-hidden="true"></i><span>${
                                posts[i].likes.length
                              }</span>
                            </a>`;
      }
      likeDiv.innerHTML = newLikeBtn;
    }
  }
}

function gethomies() {
  for (let i = 0; i < theHomiesLikes.length; i++) {
    homies.push(theHomiesLikes[i]);
  }
  return homies;
}

function uploadNewBackdrop() {
  let backdrop_url = "";
  const client = filestack.init("Aj4l9UFbrTTOmVjrVojEgz");
  const options = {
    onFileSelected: (file) => {
      //LIMIT FILE SIZE (something like 40-50mb)
      // If you throw any error in this function it will reject the file selection.
      // The error message will be displayed to the user as an alert.
      // if (file.size > 1000 * 1000) {
      //   throw new Error("File too big, select something smaller than 1MB");
      // }
    },
    maxFiles: 1,
    onUploadDone: async function (res) {
      backdrop_url = res.filesUploaded[0].url;
      console.log(backdrop_url);
      console.log(res);

      const newBackdropUrlBody = {
        backdrop_url: backdrop_url,
      };

      const newBackdropRequestOptions = {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(newBackdropUrlBody),
      };
      await fetch(
        `http://localhost:8080/api/users/${getUser().id}`,
        newBackdropRequestOptions
      ).then(async function (response) {
        if (!response.ok) {
          console.log("add backdrop error: " + response.status);
        } else {
          console.log("add backdrop ok");
          let data = window.localStorage.getItem("user");
          if (data != null) {
            let newUserWithBackdrop = JSON.parse(data);
            newUserWithBackdrop.backdrop_url = backdrop_url;
            window.localStorage.setItem(
              "user",
              JSON.stringify(newUserWithBackdrop)
            );
            await createView(`/profile/${getUser().id}`);
          }
        }
      });
    },
    supportEmail: "gamefaceproductions210@gmail.com",
    hideModalWhenUploading: true,
  };
  let uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.addEventListener("click", function () {
    client.picker(options).open();
  });
}

function getFriends() {
  let html = ``;
  let friendList = document.querySelector("#friends-list");
  let currentUser = userUser.userName;
  let friendArray = [];

  // for (let i = 0; i < friends.length; i++) {
  const user = friends;
  const friend = friends.userFriends;

  if (user.userName === currentUser) {
    for (let j = 0; j < friend.length; j++) {
      let friendObj = {
        name: friend[j].userName,
        url: friend[j].avatar_url,
        id: friend[j].id,
      };
      friendArray.push(friendObj);
    }
  }
  // }
  for (let j = 0; j < friendArray.length; j++) {
    html += `
                <a href="">
                    <div class="mb-2 ml-5 text-white">
                        <img referrerpolicy="no-referrer" data-id="${friendArray[j].id}" class="friends-list" src="${friendArray[j].url}" width="50px" alt="user" />
                        ${friendArray[j].name}
                    </div>
                </a>
            `;
  }
  friendList.innerHTML = html;
  let friendProfileCreateView = document.getElementsByClassName("friends-list");
  for (let i = 0; i < friendProfileCreateView.length; i++) {
    let userID = friendProfileCreateView[i].getAttribute("data-id");
    friendProfileCreateView[i].addEventListener("click", () => {
      createView(`/profile/${userID}`);
    });
  }
}

function setupModalFunction() {
  const modal = document.querySelector("#modal-1");
  const overlay = document.querySelector(".overlay");
  const openModalBtn = document.querySelector(".friends-display");
  const closeModalBtn = document.querySelector(".btn-close");

  // close modal function
  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  // close the modal when the close button and overlay is clicked
  closeModalBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // close modal when the Esc key is pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // open modal function
  const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
  // open modal event
  openModalBtn.addEventListener("click", openModal);
  openModalBtn.addEventListener("click", getFriends);
}

async function postIsLiked() {
  // TODO: Use a query selector to grab the like button
  // TODO: Loop through the buttons to be able to select them all
  // TODO: Add an event listener to the like button
  // TODO: Grab the PostsId and the current user Id
  // TODO: Make the POST request and fetch the data

  let likeBtn = document.getElementsByClassName("like-buttons");
  for (let i = 0; i < likeBtn.length; i++) {
    likeBtn[i].addEventListener("click", async function (event) {
      console.log("The button was clicked");
      const postId = this.getAttribute("data-id");
      const userId = getUser().id;
      const btnLength = this.getAttribute("id");

      const addLikeRequest = {
        method: "POST",
        headers: getHeaders(),
      };
      await fetch(
        `https://game-face.io:8080/api/postlikes/${postId}/${userId}`,
        addLikeRequest
      ).then(async function (response) {
        if (!response.ok) {
          console.log("like post failed");
        } else {
          console.log("post liked");
          theHomiesLikes.push(postId);
          console.log(theHomiesLikes);
          let likeIcon = document.getElementsByClassName("like-button-div");
          for (let j = 0; j < likeIcon.length; j++) {
            if (likeIcon[j].getAttribute("id") === postId) {
              console.log("yes");
              likeIcon[
                j
              ].innerHTML = `<a href="" id=${btnLength} data-id="${postId}" class="like-buttons post-footer-btn">
                         <i class="testing fa-regular fa-thumbs-up text-primary" aria-hidden="true"></i><span>${btnLength}</span>
                         </a>`;
            } else {
              console.log("DNE");
            }
          }
        }
      });
    });
  }
}

//Edit Profile/Account Details:
function editDeets() {
  if (getUser().id !== user.id) {
  } else {
    let editBtn = document.querySelectorAll(".account-btn");
    for (let i = 0; i < editBtn.length; i++) {
      editBtn[i].addEventListener("click", (event) => {
        let modal = document.createElement("div");
        document.body.appendChild(modal);
        modal.innerHTML = `     
     <div id="editDeets" class="deets">       
     <h1>Edit Deets</h1>
        <label for="editName" class="form-label">Edit UserName</label>
        <input class="form-control" id="editName" value="${user.userName}">
        <label for="editTag" class="form-label">Edit GamerTag</label>
        <input class="form-control" id="editTag" value="${user.gamerTag}">
        <label for="editRegion" class="form-label">Edit Region</label>
        <input class="form-control" id="editRegion" value="${user.region}">
        <button data-id="${user.id}" class="form-control btn" id="edit-btn">Save Changes</button>
     </div>
 `;
        let editName = document.getElementById("editName");
        editName.addEventListener("input", () => console.log(editName.value));
        let editTag = document.getElementById("editTag");
        editTag.addEventListener("input", () => console.log(editTag.value));
        let editRegion = document.getElementById("editRegion");
        editRegion.addEventListener("input", () =>
          console.log(editRegion.value)
        );
        let editDeetsDiv = document.getElementById("editDeets");
        let editDeets = document.getElementById("edit-btn");
        editDeets.addEventListener("click", function (event) {
          editDeetsDiv.classList.add("hidden");
          let data = {
            userName: editName.value,
            gamerTag: editTag.value,
            region: editRegion.value,
          };
          console.log(data);
          const request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data),
          };
          const url = `http://localhost:8080/api/users/${editDeets.dataset.id}`;
          fetch(url, request).then(async (response) => {
            console.log(response.status);
            // editDeets.addEventListener("click")
            await setLoggedInUserInfo();
            createView(`/profile/${userUser.id}`);
          });
        });
      });
    }
  }
}

function chatExport() {
  Talk.ready.then(function () {
    var me = new Talk.User({
      id: "6",
      name: "Val",
      email: "valeriareveles12@gmail.com",
      photoUrl: "https://talkjs.com/images/avatar-1.jpg",
      welcomeMessage: "Hey there!",
    });
    window.talkSession = new Talk.Session({
      appId: "teXlD9fo",
      me: me,
    });
    let other = new Talk.User({
      id: "5",
      name: "brek",
      email: "brekken.jackson5@gmail.com",
      photoUrl: "https://talkjs.com/images/avatar-5.jpg",
      role: "USER",
    });

    var conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    let inbox = talkSession.createInbox({ selected: conversation });
    inbox.mount(document.getElementById("talkjs-container"));
  });
}
