import {getHeaders, getUser, setLoggedInUserInfo} from "../auth.js";
import createView from "../createView.js";

let posts;
let friends;
let user
let currentUser;
export default function ProfilePage(props) {
    currentUser = getUser().userName;
    user = getUser();
    let postHTML = generateUserPosts(props.posts);
    posts = props.posts;
    friends = props.friends;
    // console.log(user);
    posts = posts.reverse()
    return `
            <div class="main">
                <!-- This is the div for the cover photo -->
                <div class="cover-photo text-white d-flex flex-row" style=" background-image: url(${friends.backdrop_url}); height:200px">
                    <!-- End of the cover photo/ Start of the profile picture -->
                    <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
                        <img referrerpolicy="no-referrer" src="${user.avatar_url}" alt="Img placeholder" class="img-fluid img-thumbnail mt-4 mb-2" style="width:150px; z-index:1">
                        <!-- End of the profile pic/ start of the account details button -->
                        <button type="button" data-id="${currentUser}" class="btn btn-outline-dark account-btn" style="z-index: 1" data-mdb-ripple-color="dark">Edit Profile</button>
                    </div>
                    <div class="ms-3" style="margin-top: 130px">
                        <h5>${user.userName}</h5>
                        <p>Region</p>
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
                          <h2 class="profile-element"><a>@${friends.gamerTag}</a></h2>
                          <p class="bio-text text-white">Web Developer</p>
                          <button class="btn btn-outline-dark chat-btn" data-mdb-ripple-color="dark">Chat with ${user.userName}</button>
                          <div id="talkjs-container" style="width: 90%; margin: 30px; height: 500px">
                            <i>Loading chat...</i>
                          </div>
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
                          </div>
                        </div>
                      </div>
                      <!-- End of the right column -->
                    </div>
                </div>
            </div>`
}

export function profileSetup() {
    setupModalFunction();
    getFriends();
    postIsLiked();
    editDeets();
    chatExport();
}



function generateUserPosts(posts) {
    let userPosts = ``
    let currentUser = getUser();
    // console.log(currentUser);

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        if (post.author.id === currentUser.id) {

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
                            <a id="like-button" href="" data-id="${post.id}" class="post-footer-btn">
                              <i class="fa-regular fa-thumbs-up" aria-hidden="true"></i><span>${post.likes.length}</span>
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
    let html =``
    let friendList = document.querySelector("#friends-list")
    let currentUser = getUser().userName;
    let friendArray = [];

    // for (let i = 0; i < friends.length; i++) {
    const user = friends;
    const friend = friends.userFriends

    if (user.userName === currentUser) {
        for (let j = 0; j < friend.length; j++) {
            let friendObj = {name: friend[j].userName, url: friend[j].avatar_url}
            friendArray.push(friendObj)
        }
    }
    // }
    for (let j = 0; j < friendArray.length; j++) {
        html += `
                <a href="">
                    <div class="mb-2 ml-5 text-white">
                        <img referrerpolicy="no-referrer" src="${friendArray[j].url}" width="50px" alt="user" />
                        ${friendArray[j].name}
                    </div>
                </a>
            `
    }
    friendList.innerHTML = html;
}



function setupModalFunction() {
    const modal = document.querySelector("#modal-1");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".friends-display");
    const closeModalBtn = document.querySelector(".btn-close");

// close modal function
    const closeModal = function() {
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
    openModalBtn.addEventListener('click', getFriends)
}

function postIsLiked() {
    // 1)Set up the eventListener to listen for a click on the thumbs up

    // 2)Loop through the user_likes table and check if the ID that clicked has already liked this posts ID
    // 3)ELSE IF the like button is clicked push in the another like by the current users ID into the posts_likes table

    // 4)IF the post is not liked by the current user change the color of the like button to BLUE
    // 5)ELSE the post is confirmed to be liked by the current user change the color of the like button to GREY

    let likes;
    let likeBtn = document.querySelectorAll("#like-button")
    for (let i = 0; i < likeBtn.length; i++) {
        likeBtn[i].addEventListener("click", function (event) {
            console.log("The button was clicked")
            const postId = this.getAttribute("data-id")
            for (let i = 0; i < posts.likes; i++) {
                likes = posts[i].likes
                // if (likes.posts.id === postId) {
                //
                // }
            }
        })
    }
}



//Edit Profile/Account Details:
function editDeets() {
    let editBtn = document.querySelectorAll('.account-btn');
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', (event) => {
            let modal = document.createElement("div");
            document.body.appendChild(modal);
            modal.innerHTML = `     
     <div>       
     <h1>Edit Deets</h1>
        <label for="editName" class="form-label">Edit UserName</label>
        <input class="form-control" id="editName" placeholder="${user.userName}">
        <label for="editTag" class="form-label">Edit GamerTag</label>
        <input class="form-control" id="editTag" placeholder="${user.gamerTag}">
        <button data-id="${user.id}" class="form-control" id="edit-btn">Save Changes</button>
     </div>
 `;
            let editName = document.getElementById("editName");
            editName.addEventListener("input", () => console.log(editName.value));
            let editTag = document.getElementById("editTag");
            editTag.addEventListener("input", () => console.log(editTag.value));
            let editDeets = document.getElementById("edit-btn")
            editDeets.addEventListener("click", function (event) {
                event.preventDefault();
                let data = {
                    userName: editName.value,
                    gamerTag: editTag.value
                }
                console.log(data);
                const request = {
                    method: "PUT",
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                }
                const url = `http://localhost:8080/api/users/${editDeets.dataset.id}`;
                fetch(url, request)
                    .then(async response => {
                        console.log(response.status);
                        await setLoggedInUserInfo();
                        location.reload();
                        // createView('/profile');
                    });
            });
        })}}

function chatExport (){
    Talk.ready.then(function () {
        let me = new Talk.User({
            id: currentUser.id,
            name: currentUser.userName,
            email: currentUser.email,
            photoUrl: currentUser.avatar_url,
            welcomeMessage: 'Hey there!'
        });
        window.talkSession = new Talk.Session({
            appId: 'teXlD9fo',
            me: me,
        });

        let model = {
            id: user.id,
            name: user.userName,
            email: user.email,
            photoUrl: user.avatar_url,
            role: user.role
        }

        let conversation = talkSession.getOrCreateConversation(
            Talk.oneOnOneId(me, model)
        );
        conversation.setParticipant(me);
        conversation.setParticipant(model);

        // inbox and chatbox
        let inbox = talkSession.createInbox({ selected: conversation });
        inbox.mount(document.getElementById('talkjs-container'));

        // let chatbox = window.talkSession.createChatbox();
        // chatbox.select(conversation);
        // chatbox.mount(document.getElementById('talkjs-container'));
    });

}