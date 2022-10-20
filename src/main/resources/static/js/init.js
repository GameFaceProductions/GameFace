import createView from "./createView.js";
import { checkForLoginTokens, setLoggedInUserInfo } from "./auth.js";

export default function init() {
  if (checkForLoginTokens(window.location.href)) {
    return setLoggedInUserInfo();
  }
  loadViewOnPageRequest();
  addListenerToNavLinks();
}
/**
 * When the DOM loads, build the view given the current endpoint.
 */
function loadViewOnPageRequest() {
  window.addEventListener("DOMContentLoaded", function () {
    //TODO: Switched to location.pathname so the route would be accurate to current view
    createView(location.pathname);
  });
}

/**
 * Add a listener that will change the view if a nav link is clicked.
 */
function addListenerToNavLinks() {
  document.addEventListener("click", (e) => {
    // we want checkboxes and labels to keep their default behavior when clicked
    // and not prevent the default
    // console.log(e.target);

    if (e.target.type && e.target.type === "checkbox") {
      return;
    }
    if (e.target.type && e.target.type === "button") {
      return;
    }
    if (e.target.matches("label")) {
      return;
    }
    e.preventDefault();
    if (e.target.dataset["link"] !== undefined) {
      const URI = e.target.href.substring(location.origin.length);
      createView(URI);
    }
  });
}
