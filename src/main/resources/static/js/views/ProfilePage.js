import {getUser} from "../auth.js";

let posts;
let users;

export default function ProfilePage(props) {

    let user = getUser();
    console.log(user);

    // let friendsModal = createFriendsModal(props.users)
    let postHTML = generateUserPosts(props.posts);
    posts = props.posts;
    users = props.users;

    let currentUser = getUser().userName;

    for (let i = 0; i < users.length; i++) {
        const user2 = users[i];


        if (user2.userName === currentUser) {
            return `
            <div class="main">
                <!-- This is the div for the cover photo -->
                <div class="cover-photo text-white d-flex flex-row" style=" background-image: url(${user2.backdrop_url}); height:200px">
                    <!-- End of the cover photo/ Start of the profile picture -->
                    <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
                        <img referrerpolicy="no-referrer" src="${user.avatar_url}" alt="Img placeholder" class="img-fluid img-thumbnail mt-4 mb-2" style="width:150px; z-index:1">
                        <!-- End of the profile pic/ start of the account details button -->
                        <button type="button" class="btn btn-outline-dark account-btn" style="z-index: 1" data-mdb-ripple-color="dark">Edit Profile</button>
                    </div>
                    <div class="ms-3" style="margin-top: 130px">
                        <h5>${user.userName}</h5>
                        <p>Region</p>
                    </div>
                </div>
                <!-- Start of followers/following div -->
                <div class="p-4 text-black" style="background-color: white">
                    <div class="d-flex justify-content-end text-center py-1">
                        <div class="px-3">
                            <a class="friends-display" href="">
                                <p>${user2.userFriends.length}</p>
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
                          <h2 class="profile-element"><a>@${user2.gamer_tag}</a></h2>
                          <p class="profile-element profile-website">Web Developer</p>
                          <button class="btn btn-outline-dark chat-btn" data-mdb-ripple-color="dark">Chat with ${user.userName}</button>
                        </div>
                      </div>
                      <!-- End of the left column -->
                      <!-- The posts/middle-col start here -->
                      <div class="col-6">
                        <ol class="post-list">
                          ${postHTML}
                        </ol>
                      </div>
                      <!-- The right column will start here -->
                      <div class="col right-col">
                        <div class="content-panel">
                          <div class="panel-header">
                            <h4>Favorite Games</h4>
                      <!-- Modal containing lists of current users friends starts here -->
                      <section class="modal hidden">
                          <div class="flex">
                            <img src="${user.avatar_url}" width="50px" height="50px" alt="user" />
                            <button class="btn-close">⨉</button>
                          </div>
                          <div>
                            <div id="friends-list">
                                Users list of friends will go here
                            </div>
                          </div>
                            <button class="btn">Do Something</button>
                      </section>
                      <!-- End of modal -->
                      <!-- Button to open up the modal -->
                          <div class="overlay hidden"></div>
                          <button class="btn open-modal">Open Modal</button>
                      <!-- End of modal button -->
                          </div>
                        </div>
                      </div>
                      <!-- End of the right column -->
                    </div>
                </div>
          </div>`
        }
    }
}

export function profileSetup() {
    setupModalFunction()
    getFriends()
}

function generateUserPosts(posts) {
    let userPosts = ``
    let currentUser = getUser();

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        if (post.author.userName === currentUser.userName) {

            userPosts += `
                <li class="post-card">
                    <div class="post-content">
                        <div class="post-header">
                            <span class="fullname"><strong>${post.author.userName}</strong></span>
                            <span class="username">@${currentUser.gamerTag}</span>
                            <span class="post-time">- ${post.createdAt}</span>
                        </div>
                            <a href=""><img referrerpolicy="no-referrer" class="post-picture" src="${post.author.avatar_url}" alt="profile pic"></a>
                        <div class="post-text">
                            <p class="" lang="es" data-aria-label-part="0"><br>${post.content}</p>
                        </div>
                        <div class="post-footer">
                            <a href="" class="post-footer-btn">
                              <i class="fa-regular fa-comment" aria-hidden="true"></i><span>${post.postComments.length}</span>
                            </a>
                            <a href="" class="post-footer-btn">
                              <i id="like-button" class="fa-regular fa-thumbs-up" aria-hidden="true"></i><span>${post.likes.length}</span>
                            </a>
                        </div>
                    </div>
                </li>
                `;
        }
    }
    return userPosts
}

function getFriends() {
    let friend = [];
    let friends;
    let currentUser = getUser().userName;
    let friendsList = document.querySelector("#friends-list")

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const friends = users[i].userFriends

        if (user.userName === currentUser) {
            for (let j = 0; j < friends.length; j++) {
                friend.push(friends[j].userName);
            }
        }
    }
    for (let i = 0; i < friend.length; i++) {
        friends = friend[i];
    }
    friendsList += `
        <ol>
            <li>${friends}</li>
        </ol>
    `
    return friendsList
}

function setupModalFunction() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".open-modal");
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
}

