import {getUser} from "../auth.js";

let posts;

export default function ProfilePage(props) {

    let user = getUser();
    let postHTML = generateUserPosts(props.posts);
    posts = props.posts;
    console.log(user)

    return `
<div class="main">
<div class="cover-photo text-white d-flex flex-row" style="background-color: black; height:200px">
           <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
                <img src="https://picsum.photos/300/300" alt="Img placeholder" class="img-fluid img-thumbnail mt-4 mb-2" style="width:150px; z-index:1">
                <button type="button" class="btn btn-dark" id="edit-profile" style="z-index: 1" data-mdb-ripple-color="dark">Edit Profile</button>
            </div>
            <div class="ms-3" style="margin-top: 130px">
                <h4>${user.userName}</h4>
                <h5>${user.gamerTag}</h5>
            </div>
        </div>
        <div class="p-4 text-black" style="background-color: white">
            <div class="d-flex justify-content-end text-center py-1">
                <div class="px-3">
                    <p class="small text-muted mb-0">Following</p>
                </div>
                <div>
                    <p class="small text-muted mb-0">Followers</p>
                </div>
            </div>
        </div>
  <div class="container main-content">
    <div class="row">
      <div class="col profile-col">
        <!-- Left column -->
        <div class="profile-header">
          <!-- Header information -->
          <h3 class="bio" style="display: flex; justify-content: center;">Bio</h3>
          <h2 class="profile-element">@${user.userName}</h2>
          <p style="color: black">${user.region}</p>
          <button class="btn btn-outline-dark" style="display: flex; justify-content: center;">Chat with ${user.userName}</button>
        </div>
      </div>
      <!-- End; Left column -->
      <!-- Center content column -->
      <div class="col-6">
        <ol class="tweet-list">
          ${postHTML}
          </ol>
        <!-- End: tweet list -->
      </div>
      <!-- End: Center content column -->
      <div class="col right-col">
        <div class="content-panel">
          <div class="panel-header">
            <h4>Favorite Games</h4>
          </div>
                </div>
              </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`

}

function generateUserPosts(posts) {
    let userPosts = ``
    let currentUser = getUser().userName;

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        if (post.author.userName === currentUser) {

            userPosts += `
                <li class="post-card">
                    <div class="post-content">
                        <div class="post-header">
                            <span class="fullname" style="color: black"><strong>${post.author.userName}</strong></span>
                            <span class="username" style="color: black">@${post.author.userName}</span>
                            <span class="post-time" style="color: black">- ${post.createdAt}</span>
                        </div>
                        <a><img class="post-picture" src="https://picsum.photos/80/80" alt="profile pic"></a>
                        <div class="post-text">
                        <p class="" lang="es" data-aria-label-part="0" style="color: black"><br>${post.content}</p>
                        </div>
                        <div class="post-footer">
                            <a class="post-footer-btn">
                              <i class="fa-regular fa-comment" aria-hidden="true"></i><span> 18</span>
                            </a>
                            <a class="post-footer-btn">
                              <i class="fa-regular fa-thumbs-up" aria-hidden="true"></i><span> 202</span>
                            </a>
                        </div>
                    </div>
                </li>
                `;
        }
    }

    return userPosts
}