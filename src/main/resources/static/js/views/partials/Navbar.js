import { getUser, isLoggedIn } from "../../auth.js";

export default function Navbar(props) {
  let navbar = `
    <nav class="navbar navbar-expand-lg bg-light">
    `;

  if (isLoggedIn()) {
    let user = getUser();
    navbar += `
  <div class="container-fluid">
<img onClick="window.location.href='/';" class="nav-logo" src="/images/1.jpg" alt="logo" width="60px;"
       height="60px" style="border-radius:50%">    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
<!--        <li>-->
<!--          <i onClick="window.location.href='/';" class="bi bi-info-circle-fill nav-item no-italic"><span-->
<!--        class="nav-text">About Us</span></i>-->
<!--        </li>-->
        <li>
    <i onClick="window.location.href='/home';" class="bi bi-house-fill nav-item no-italic"><span
        class="nav-text">Home</span></i>        </li>
        <li>
         <i title="${user.id}" id="profileNavBar" class=" bi bi-person-circle nav-item no-italic"><span
        class="nav-text">Profile</span></i>
</li>
        <li class="nav-item dropdown">
          <a class="nav-link bi bi-search dropdown-toggle nav-text" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Search
          </a>
          <ul class="dropdown-menu">
<i onClick="window.location.href='/searchusers';" class="bi bi-search no-italic"><small
        class="nav-text search-dropdown-text">Search Users</small></i>            <li><hr class="dropdown-divider"></li>
<i onClick="window.location.href='/searchgames';" class="bi bi-search no-italic"><small
        class="nav-text search-dropdown-text">Search Games</small></i>          </ul>
        </li>
        <li><i onClick="window.location.href='/logout';" class="bi bi-box-arrow-in-right nav-item no-italic"><small
        class="nav-text">Logout</small></i></li>
      </ul>
      <img title="${user.id}" id="navbar-avatar" src="${user.avatar_url}" class="navbar-avatar rounded-circle" referrerpolicy="no-referrer">
    </div>
`;
  } else {
    navbar += `
       <i onclick="window.location.href='/';"  class="bi bi-info-circle-fill nav-item no-italic"><small class="nav-text">About Us</small></i> 
        `;
  }
  navbar += `</div></nav>`;
  return navbar;
}
