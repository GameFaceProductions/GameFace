import { getUser, isLoggedIn } from "../../auth.js";

export default function Navbar(props) {
  let navbar = `
        <nav class="navbar navbar-expand-lg">
    `;

  if (isLoggedIn()) {
    let user = getUser();
    navbar += `
    <div class="container-fluid">
        <img onclick="window.location.href='/';" src="/images/1.jpg" alt="logo" width="60px;" height="60px" style="border-radius:50%">
        <i onclick="window.location.href='/';"  class="bi bi-info-circle-fill no-italic"><small class="nav-text">About Us</small></i> 
        <i onclick="window.location.href='/home';" class="bi bi-house-fill no-italic"  ><small class="nav-text">Home</small></i>
        <i onclick="window.location.href='/profile';" class="bi bi-person-circle no-italic"><small class="nav-text">Profile</small></i>
        <i onclick="window.location.href='/searchusers';" class="bi bi-search no-italic"><small class="nav-text">Search</small></i>
        <i onclick="window.location.href='/logout';" class="bi bi-box-arrow-in-right no-italic"><small class="nav-text">Logout</small></i>
        <text class="float-end">Logged in as: ${user.userName}</text>`;
  } else {
    navbar += `
       <i onclick="window.location.href='/';"  class="bi bi-info-circle-fill no-italic"><small class="nav-text">About Us</small></i> 
        `;
  }
  navbar += `</div></nav>`;
  return navbar;
}
