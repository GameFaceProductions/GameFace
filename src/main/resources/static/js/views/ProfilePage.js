import {getUser} from "../auth.js";

let posts;

export default function ProfilePage(props) {

    let user = getUser();
    let postHTML = generateUserPosts(props.posts);
    posts = props.posts;
    console.log(user)

// return
//     `< div className = "profile-container" >
//           <div className="text-white d-flex flex-row" style="background-color: black; height:200px;">
//             <div className="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
//               <img src="https://picsum.photos/300/300"
//                 alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
//                 style="width: 150px; z-index: 1">
//               <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
//                 style="z-index: 1;">
//                 Edit profile
//               </button>
//             </div>
//             <div class="ms-3" style="margin-top: 130px;">
//               <h5>${user.userName}</h5>
//               <p>Region</p>
//             </div>
//           </div>
//           <div class="p-4 text-black" style="background-color: #e1e2e3;">
//             <div class="d-flex justify-content-end text-center py-1">
//               <div class="px-3">
//                 <p class="small text-muted mb-0">Followers</p>
//               </div>
//               <div>
//                 <p class="small text-muted mb-0">Following</p>
//               </div>
//             </div>
//           </div>
//           <div class="card-body p-4 text-black">
//             <div class="mb-5">
//               <p class="lead fw-normal mb-1">Bio</p>
//               <div class="p-4" style="background-color: #e1e2e3;">
//                 <p class="font-italic mb-1">Web Developer</p>
//                 <p class="font-italic mb-1">Lives in Texas</p>
//               </div>
//             </div>
//             <div class="d-flex justify-content-between align-items-center mb-4">
//               <p class="lead fw-normal mb-0">Posts</p>
//               <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
//             </div>
//             ${postHTML}
//             </div>
//       </div>
//       `


    return `
    <div class="profile-container">
        <div class="cover-photo text-white d-flex flex-row" style="background-color: black; height:200px">
            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
                <img src="https://picsum.photos/300/300" alt="Img placeholder" class="img-fluid img-thumbnail mt-4 mb-2" style="width:150px; z-index:1">
                <button type="button" class="btn btn-outline-dark" style="z-index: 1" data-mdb-ripple-color="dark">Edit Profile</button>
            </div>
            <div class="ms-3" style="margin-top: 130px">
                <h5>${user.userName}</h5>
                <p>Region</p>
            </div>
        </div>
        <div class="p-4 text-black" style="background-color: #e1e2e3">
            <div class="d-flex justify-content-end text-center py-1">
                <div class="px-3">
                    <p class="small text-muted mb-0">Following</p>
                </div>
                <div>
                    <p class="small text-muted mb-0">Followers</p>
                </div>
            </div>    
        </div>
        <div class="card-body p-4 text-black">
            <div class="mb-5">
                <p class="lead fw-normal mb-1">Bio</p>
                <div class="p-4" style="background-color: #e1e2e3">
                    <p class="font-italic mb-1">Web Developer</p>
                    <p class="font-italic mb-1">Lives in Texas</p>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
                <p class="lead fw-normal mb-0">Posts</p>
            </div>
            <div class="card new-post">
                <            
            </div>
            ${postHTML}
        </div>
    </div>
    
    
    
    `;
}

function generateUserPosts(posts) {
    let userPosts = ``
    let currentUser = getUser().userName;

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        if (post.author.userName === currentUser) {

            userPosts += `
                <div class="post-card">
                    <div><img class="profile-picture" src="https://picsum.photos/80/80" alt="profile pic"></div>
                    <div class="post-user"><a><h2>${post.author.userName}</h2></a></div>
                    <div class="post-content">${post.content}</div>
                    <div><p id="post-time">${post.createdAt}</p></div>
                </div>
                `;
        }
    }

    return userPosts
}