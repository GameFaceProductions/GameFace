import {getUser, isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    let navbar = `
        <nav>
    `;

    if (isLoggedIn()) {
        let user = getUser();
        navbar += `
        <a href="/" data-link>About Us</a>
        <a href="/home" data-link>Posts</a>
        <a href="/me" data-link>Profile</a>
        <a href="/account" data-link>Account Details</a>
        <a href="/logout" data-link>Logout</a>
        <text class="float-end">Logged in as: ${user.userName}</text>`
    } else {
        navbar += `
        <a href="/" data-link>About Us</a>
        `;
    }
    navbar += `</nav>`;
    return navbar;
}