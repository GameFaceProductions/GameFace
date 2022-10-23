import ProfilePage, { profileSetup } from "./views/ProfilePage.js";
import HomePage, { postSetup } from "./views/HomePage.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login, { LoginEvent } from "./views/Login.js";
import Register, { RegisterEvent } from "./views/Register.js";
import prepareUserHTML, { prepareUserJS } from "./views/AccountDetails.js";
import Logout, { LogoutEvent } from "./views/Logout.js";
import DoLogin, { DoLoginEvents } from "./views/DoLogin.js";
// import GameInfo from "./views/GameInfo.js";
import searchGamesHTML, { searchGamesJS } from "./views/SearchGames.js";
import searchUsersHTML, { searchUsersJS } from "./views/SearchUsers.js";
import { getUser } from "./auth.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
  const routes = {
    "/home": {
      returnView: HomePage,
      state: {
        posts: "/api/posts",
      },
      uri: "/home",
      title: "Home",
      viewEvent: postSetup,
    },
    "/profile/:id": {
      returnView: ProfilePage,
      state: {
        user: "api/users/:id",
        posts: "/api/posts",
        friends: "/api/friends/:id",
        likes: "/api/postlikes",
      },
      uri: "/profile/:id",
      title: "Profile",
      viewEvent: profileSetup,
    },
    "/login": {
      returnView: Login,
      state: {},
      uri: "/login",
      title: "Login",
      viewEvent: LoginEvent,
    },
    "/logout": {
      returnView: Logout,
      state: {},
      uri: "/logout",
      title: "Logout",
      viewEvent: LogoutEvent,
    },
    "/dologin": {
      returnView: DoLogin,
      state: {},
      uri: "/dologin",
      title: "DoLogin",
      viewEvent: DoLoginEvents,
    },
    "/register": {
      returnView: Register,
      state: {},
      uri: "/register",
      title: "Register",
      viewEvent: RegisterEvent,
    },
    "/me": {
      returnView: prepareUserHTML,
      state: {
        me: "/api/users/me",
      },
      uri: "/me",
      title: "User Info",
      viewEvent: prepareUserJS,
    },
    "/": {
      returnView: About,
      state: {},
      uri: "/",
      title: "About",
    },
    "/error": {
      returnView: Error404,
      state: {},
      uri: location.pathname,
      title: " ERROR",
    },
    "/loading": {
      returnView: Loading,
      state: {},
      uri: location.pathname,
      title: "Loading...",
    },
    "/searchgames": {
      returnView: searchGamesHTML,
      state: { user: `/api/users/${getUser().id}` },
      uri: "/searchgames",
      title: "Search Games",
      viewEvent: searchGamesJS,
    },
    "/searchusers": {
      returnView: searchUsersHTML,
      state: { users: "/api/users", friends: `/api/friends/${getUser().id}` },
      uri: "/searchusers",
      title: "User Search",
      viewEvent: searchUsersJS,
    },
  };

  if (!routes[URI]) {
    for (const routeKey in routes) {
      let keyPieces = routeKey.split("/");
      if (keyPieces.length > 2) {
        let pathVar = keyPieces[2];
        let pathInput = URI.split("/")[2];
        let baseURI = new RegExp(keyPieces[1]);
        if (baseURI.test(BACKEND_HOST + URI)) {
          let foundRoute = routes[routeKey];
          foundRoute.uri = URI;
          for (let statePiece in foundRoute.state) {
            foundRoute.state[statePiece] = foundRoute.state[
              statePiece
            ].replaceAll(pathVar, pathInput);
          }
          return foundRoute;
        }
      }
    }
  }
  return routes[URI];
}
