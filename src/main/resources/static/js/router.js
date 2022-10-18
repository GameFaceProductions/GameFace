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
        comments: "/api/postcomments",
      },
      uri: "/home",
      title: "Home",
      viewEvent: postSetup,
    },
    // '/home': {
    //     returnView: HomePage,
    //     state: {
    //         posts: '/api/home'
    //     },
    //     uri: '/home',
    //     title: 'Home Page',
    //     viewEvent: postSetup
    // },
    "/profile": {
      returnView: ProfilePage,
      state: {
        posts: "/api/posts",
        users: "/api/users",
      },
      uri: "/profile",
      title: "ProfilePage",
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
    // '/game': {
    //     returnView: GameInfo,
    //     state: {},
    //     uri: '/game',
    //     title: 'Game Details'
    // },
    "/searchgames": {
      returnView: searchGamesHTML,
      state: { users: "/api/users" },
      uri: "/searchgames",
      title: "Search Games",
      viewEvent: searchGamesJS,
    },
    "/searchusers": {
      returnView: searchUsersHTML,
      state: { users: "/api/users" },
      uri: "/searchusers",
      title: "User Search",
      viewEvent: searchUsersJS,
    },
  };

  return routes[URI];
}
