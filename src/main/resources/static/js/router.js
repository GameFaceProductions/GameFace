import AccountDetails from "./views/AccountDetails.js";
import HomePage, {postSetup} from "./views/HomePage.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login, {LoginEvent} from "./views/Login.js";
// import LoginEvent from "./auth.js";
import Register, {RegisterEvent} from "./views/Register.js"
import prepareUserHTML, {prepareUserJS} from "./views/ProfilePage.js";
import Logout, {LogoutEvent} from "./views/Logout.js";
import DoLogin, {DoLoginEvents} from "./views/DoLogin.js";
// import GameInfo from "./views/GameInfo.js";
// import SearchGames from "./views/SearchGames.js";
// import SearchUser from "./views/SearchUser.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: HomePage,
            state: {
                posts: '/api/posts'
            },
            uri: '/home',
            title: 'Home',
            viewEvent: postSetup
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
        '/account': {
            returnView: AccountDetails,
            state: {},
            uri: '/account',
            title: 'AccountDetails',
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/logout': {
            returnView: Logout,
            state: {},
            uri: '/logout',
            title: "Logout",
            viewEvent: LogoutEvent
        },
        '/dologin': {
            returnView: DoLogin,
            state: {},
            uri: '/dologin',
            title: "DoLogin",
            viewEvent: DoLoginEvents
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/me':{
            returnView: prepareUserHTML,
            state: {
                me:'/api/users/me'
            },
            uri: '/me',
            title: 'User Info',
            viewEvent: prepareUserJS
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        },
        // '/game': {
        //     returnView: GameInfo,
        //     state: {},
        //     uri: '/game',
        //     title: 'Game Details'
        // },
        // '/gamesearch': {
        //     returnView: SearchGames,
        //     state: {},
        //     uri: '/searchGame',
        //     title: 'Game Search'
        // },
        // '/usersearch': {
        //     returnView: SearchUser,
        //     state: {},
        //     uri: '/searchUser',
        //     title: 'User Search'
        // },
    };

    return routes[URI];
}

