import {getUser} from "../auth.js";

let posts;

export default function ProfilePage(props) {

    let user = getUser();
    let postHTML = generateUserPosts(props.posts);
    posts = props.posts;
    console.log(user)

    return `<div class="main-container">
  <div class="row profile-background">
    <div class="container">
      <div class="avatar-container">
        <div class="avatar">

        </div>
      </div>
    </div>
  </div>

  <nav class="navbar profile-stats">
    <div class="container">
      <div class="row">
        <div class="col">

        </div>
        <div class="col-6">
          <ul>
            <li class="profile-stats-item-active">
              <a>
                <span class="profile-stats-item profile-stats-item-label">Tweets</span>
                <span class="profile-stats-item profile-stats-item-number">51</span>
              </a>
            </li>
            <li>
              <a>
                <span class="profile-stats-item profile-stats-item-label">Following</span>
                <span class="profile-stats-item profile-stats-item-number">420</span>
              </a>
            </li>
            <li>
              <a>
                <span class="profile-stats-item profile-stats-item-label">Followers</span>
                <span class="profile-stats-item profile-stats-item-number">583</span>
              </a>
            </li>
            <li>
              <a>
                <span class="profile-stats-item profile-stats-item-label">Likes</span>
                <span class="profile-stats-item profile-stats-item-number">241</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="col">

        </div>
      </div>
    </div>
  </nav>
  <div class="container main-content">
    <div class="row">
      <div class="col profile-col">
        <!-- Left column -->
        <div class="profile-header">
          <!-- Header information -->
          <h3 class="profile-fullname"><a>Jon Vadillo<a></h3>
          <h2 class="profile-element"><a>@jonvadillo</a></h2>
          <a class="profile-element profile-website" hrerf=""><i class="octicon octicon-link"></i>&nbsp;jonvadillo.com</a>
          <a class="profile-element profile-website" hrerf=""><i class="octicon octicon-location"></i>&nbsp;Vitoria-Gasteiz, Spain</a>
          <h2 class="profile-element"><i class="octicon octicon-calendar"></i>Joined November 2012</h2>
          <button class="btn btn-search-bar tweet-to-btn">Tweet to Jon Vadillo</button>
          <a class="profile-element profile-website" hrerf=""><i class="octicon octicon-file-media"></i>1,142 Photos and videos</a>
          <div class="pic-grid">
            <!-- Image grid -->
            <div class="row">
              <div class="col pic-col"><img src="https://pbs.twimg.com/media/DFCq7iTXkAADXE-.jpg:thumb" height="73px" class=""></div>
              <div class="col pic-col"><img src="https://pbs.twimg.com/media/DEoQ0vyXoBA1cwQ.png:thumb" height="73px" class=""></div>
              <div class="col pic-col"><img src="https://pbs.twimg.com/media/DDVbW4RXsAAasuw.jpg:thumb" height="73px" class=""></div>
            </div>
            <!-- End: row -->
            <div class="row">
              <div class="col pic-col"><img src="https://pbs.twimg.com/media/DFCq7iTXkAADXE-.jpg:thumb" height="73px" class=""></div>
              <div class="col pic-col"><img src="https://pbs.twimg.com/media/DEoQ0vyXoBA1cwQ.png:thumb" height="73px" class=""></div>
              <div class="col pic-col"><img src="https://pbs.twimg.com/media/DDVbW4RXsAAasuw.jpg:thumb" height="73px" class=""></div>
            </div>
            <!-- End: row -->
          </div>
          <!-- End: image grid -->
        </div>
      </div>
      <!-- End; Left column -->
      <!-- Center content column -->
      <div class="col-6">
        <ol class="tweet-list">
          <li class="tweet-card">
            <div class="tweet-content">
              <div class="tweet-header">
                <span class="fullname">
                  <strong>Jon Vadillo</strong>
                </span>
                <span class="username">@JonVadillo</span>
                <span class="tweet-time">- Jul 18</span>
              </div>
              <a>
                <img class="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt="">
              </a>
              <div class="tweet-text">
                <p class="" lang="es" data-aria-label-part="0">¡Nuevo artículo en Mozilla!<br>Resuelto: Corregido – Una breve historia sobre un error reportado por la comunidad <a href="https://t.co/dqg5hVQXA0" class="twitter-timeline-link" target="_blank"><span class="">https://www.mozilla-hispano.org/</span></a>                  <a href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href="" class="twitter-hashtag"><s>#</s><b>comunidad</b></a>
                  <a href="" class="twitter-hashtag" dir="ltr"></a>
                </p>
              </div>
              <div class="tweet-footer">
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-comment" aria-hidden="true"></i><span> 18</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-heart" aria-hidden="true"></i><span> 202</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-mail" aria-hidden="true"></i><span> 155</span>
                </a>
              </div>
            </div>
          </li>
          <li class="tweet-card">
            <div class="tweet-content">
              <div class="tweet-header">
                <span class="fullname">
                  <strong>Jon Vadillo</strong>
                </span>
                <span class="username">@JonVadillo</span>
                <span class="tweet-time">- Jul 18</span>
              </div>
              <a>
                <img class="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt="">
              </a>
              <div class="tweet-text">
                <p class="" lang="es" data-aria-label-part="0">¡Nuevo artículo en Mozilla!<br>Resuelto: Corregido – Una breve historia sobre un error reportado por la comunidad <a href="https://t.co/dqg5hVQXA0" class="twitter-timeline-link" target="_blank"><span class="">https://www.mozilla-hispano.org/</span></a>                  <a href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href="" class="twitter-hashtag"><s>#</s><b>comunidad</b></a>
                  <a href="" class="twitter-hashtag" dir="ltr"></a>
                </p>
              </div>
              <div class="tweet-footer">
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-comment" aria-hidden="true"></i><span> 18</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-heart" aria-hidden="true"></i><span> 202</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-mail" aria-hidden="true"></i><span> 155</span>
                </a>
              </div>
            </div>
          </li>
          <li class="tweet-card">
            <div class="tweet-content">
              <div class="tweet-header">
                <span class="fullname">
                  <strong>Jon Vadillo</strong>
                </span>
                <span class="username">@JonVadillo</span>
                <span class="tweet-time">- Jul 18</span>
              </div>
              <a>
                <img class="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt="">
              </a>
              <div class="tweet-text">
                <p class="" lang="es" data-aria-label-part="0">¡Nuevo artículo en Mozilla!<br>Resuelto: Corregido – Una breve historia sobre un error reportado por la comunidad <a href="https://t.co/dqg5hVQXA0" class="twitter-timeline-link" target="_blank"><span class="">https://www.mozilla-hispano.org/</span></a>                  <a href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href="" class="twitter-hashtag"><s>#</s><b>comunidad</b></a>
                  <a href="" class="twitter-hashtag" dir="ltr"></a>
                </p>
              </div>
              <div class="tweet-footer">
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-comment" aria-hidden="true"></i><span> 18</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-heart" aria-hidden="true"></i><span> 202</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-mail" aria-hidden="true"></i><span> 155</span>
                </a>
              </div>
            </div>
          </li>
          <li class="tweet-card">
            <div class="tweet-content">
              <div class="tweet-header">
                <span class="fullname">
                  <strong>Jon Vadillo</strong>
                </span>
                <span class="username">@JonVadillo</span>
                <span class="tweet-time">- Jul 18</span>
              </div>
              <a>
                <img class="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt="">
              </a>
              <div class="tweet-text">
                <p class="" lang="es" data-aria-label-part="0">¡Nuevo artículo en Mozilla!<br>Resuelto: Corregido – Una breve historia sobre un error reportado por la comunidad <a href="https://t.co/dqg5hVQXA0" class="twitter-timeline-link" target="_blank"><span class="">https://www.mozilla-hispano.org/</span></a>                  <a href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href="" class="twitter-hashtag"><s>#</s><b>comunidad</b></a>
                  <a href="" class="twitter-hashtag" dir="ltr"></a>
                </p>
              </div>
              <div class="tweet-footer">
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-comment" aria-hidden="true"></i><span> 18</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-heart" aria-hidden="true"></i><span> 202</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-mail" aria-hidden="true"></i><span> 155</span>
                </a>
              </div>
            </div>
          </li>
          <li class="tweet-card">
            <div class="tweet-content">
              <div class="tweet-header">
                <span class="fullname">
                  <strong>Jon Vadillo</strong>
                </span>
                <span class="username">@JonVadillo</span>
                <span class="tweet-time">- Jul 18</span>
              </div>
              <a>
                <img class="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt="">
              </a>
              <div class="tweet-text">
                <p class="" lang="es" data-aria-label-part="0">¡Nuevo artículo en Mozilla!<br>Resuelto: Corregido – Una breve historia sobre un error reportado por la comunidad <a href="https://t.co/dqg5hVQXA0" class="twitter-timeline-link" target="_blank"><span class="">https://www.mozilla-hispano.org/</span></a>                  <a href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href="" class="twitter-hashtag"><s>#</s><b>comunidad</b></a>
                  <a href="" class="twitter-hashtag" dir="ltr"></a>
                </p>
              </div>
              <div class="tweet-footer">
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-comment" aria-hidden="true"></i><span> 18</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-heart" aria-hidden="true"></i><span> 202</span>
                </a>
                <a class="tweet-footer-btn">
                  <i class="octicon octicon-mail" aria-hidden="true"></i><span> 155</span>
                </a>
              </div>
            </div>
          </li>
        </ol>
        <!-- End: tweet list -->
      </div>
      <!-- End: Center content column -->
      <div class="col right-col">
        <div class="content-panel">
          <div class="panel-header">
            <h4>Who to follow</h4><small><a href="">Refresh</a></small><small><a href="">View all</a></small>
          </div>
          <!-- Who to Follow panel -->
          <div class="panel-content">
            <!--Follow list -->
            <ol class="tweet-list">
              <li class="tweet-card">
                <div class="tweet-content">
                  <img class="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt="">
                  <div class="tweet-header">
                    <span class="fullname">
                  <strong>Jon Vadillo</strong>
                </span>
                    <span class="username">@JonVadillo</span>
                  </div>

                  <button class="btn btn-follow">Follow</button>
                </div>
              </li>
              <li class="tweet-card">
                <div class="tweet-content">
                  <img class="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt="">
                  <div class="tweet-header">
                    <span class="fullname">
                  <strong>Jon Vadillo</strong>
                </span>
                    <span class="username">@JonVadillo</span>
                  </div>

                  <button class="btn btn-follow">Follow</button>
                </div>
              </li>
              <li class="tweet-card">
                <div class="tweet-content">
                  <img class="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt="">
                  <div class="tweet-header">
                    <span class="fullname">
                  <strong>Jon Vadillo</strong>
                </span>
                    <span class="username">@JonVadillo</span>
                  </div>

                  <button class="btn btn-follow">Follow</button>
                </div>
              </li>
            </ol>
            <!--END: Follow list -->
          </div>
        </div>
      </div>
    </div>
  </div>`

    // return `
    // <div class="profile-container">
    //     <div class="cover-photo text-white d-flex flex-row" style="background-color: black; height:200px">
    //         <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px">
    //             <img src="https://picsum.photos/300/300" alt="Img placeholder" class="img-fluid img-thumbnail mt-4 mb-2" style="width:150px; z-index:1">
    //             <button type="button" class="btn btn-outline-dark" style="z-index: 1" data-mdb-ripple-color="dark">Edit Profile</button>
    //         </div>
    //         <div class="ms-3" style="margin-top: 130px">
    //             <h5>${user.userName}</h5>
    //             <p>Region</p>
    //         </div>
    //     </div>
    //     <div class="p-4 text-black" style="background-color: #e1e2e3">
    //         <div class="d-flex justify-content-end text-center py-1">
    //             <div class="px-3">
    //                 <p class="small text-muted mb-0">Following</p>
    //             </div>
    //             <div>
    //                 <p class="small text-muted mb-0">Followers</p>
    //             </div>
    //         </div>
    //     </div>
    //     <div class="card-body p-4 text-black">
    //         <div class="mb-5">
    //             <p class="lead fw-normal mb-1">Bio</p>
    //             <div class="p-4" style="background-color: #e1e2e3">
    //                 <p class="font-italic mb-1">Web Developer</p>
    //                 <p class="font-italic mb-1">Lives in Texas</p>
    //             </div>
    //         </div>
    //         <div class="d-flex justify-content-between align-items-center mb-4">
    //             <p class="lead fw-normal mb-0">Posts</p>
    //         </div>
    //         <div class="card new-post">
    //             <
    //         </div>
    //         ${postHTML}
    //     </div>
    // </div>
    // `;
}

function generateUserPosts(posts) {
    let userPosts = ``
    let currentUser = getUser().userName;

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        if (post.author.userName === currentUser) {

            userPosts += `
                <div class="post-card">
                    <div class="post-header">
                        <div><img class="profile-picture" src="https://picsum.photos/80/80" alt="profile pic"></div>
                        <div class="post-user"><a><h2>${post.author.userName}</h2></a></div>
                        <div class="post-content">${post.content}</div>
                        <div><p id="post-time">${post.createdAt}</p></div>
                    </div>
                </div>
                `;
        }
    }

    return userPosts
}