import Navbar from "./views/partials/Navbar.js";
import createView from "./createView.js";

/**
 * Pushes the current URI to the URL bar and sets the HTML of the app div.
 * @param props - the data required for view rendering
 * @param route - the object containing information for the given endpoint
 */
export default function render(props, route) {
  const app = document.querySelector("#app");
  const title = `GameFace - ${route.title}`;
  document.title = title;
  app.innerHTML = `${Navbar(null)} ${route.returnView(props)}`;
  if (route.viewEvent) {
    route.viewEvent();
  }
  let createProfileFromNav;
  let createProfileFromAvatar;
  if (
    document.getElementById("profileNavBar") === null &&
    document.getElementById("navbar-avatar") === null
  ) {
    return;
  } else {
    createProfileFromNav = document.getElementById("profileNavBar");
    createProfileFromNav.addEventListener("click", () => {
      let userId = createProfileFromNav.getAttribute("title");
      createView(`/profile/${userId}`);
    });
    createProfileFromAvatar = document.getElementById("navbar-avatar");
    createProfileFromAvatar.addEventListener("click", () => {
      let userId = createProfileFromAvatar.getAttribute("title");
      createView(`/profile/${userId}`);
    });
  }
}
