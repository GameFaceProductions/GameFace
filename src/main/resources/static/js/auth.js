import createView from "./createView.js";

export function setLoggedInUserInfo() {
    const request = {
        method: "GET",
        headers: getHeaders()
    }
    const url = "/api/users/authinfo";
    fetch(url, request)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            window.localStorage.setItem("user", JSON.stringify(data));
            createView("/");
        });
}

export function checkForLoginTokens(url) {
    // console.log(url);
    // access_token is given back from spring after #
    let parts = url.split("#");
    if(parts.length < 2)
        return false;

    parts = parts[1].split("&");
    let tokens = [];
    for (let i = 0; i < parts.length; i++) {
        const pair = parts[i].split("=");
        if(pair.length > 1 && (pair[0] === "access_token" || pair[0] === "refresh_token"))
            tokens[pair[0]] = pair[1];
    }
    if(!tokens['access_token'])
        return false;

    setTokens(tokens);
    return true;
}

/**
 * Gets the Authorization header needed for making requests to protected endpoints
 * This function should be used only after the user is logged in
 * @returns {{Authorization: string, "Content-Type": string}|{"Content-Type": string}}
 */
export function getHeaders() {
    const token = localStorage.getItem("access_token");
    return token
        ? {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${token}`}
        : {'Content-Type': 'application/json'};
}

/**
 * Attempts to set the access and refresh tokens needs to authenticate and authorize the client and user
 * @param responseData
 */
function setTokens(responseData) {
    if (responseData['access_token']) {
        localStorage.setItem("access_token", responseData['access_token']);
        console.log("Access token set");
    }
    if (responseData['refresh_token']) {
        localStorage.setItem("refresh_token", responseData['refresh_token']);
        console.log("Refresh token set")
    }
}

export function isLoggedIn() {
    if(localStorage.getItem('access_token')) {
        return true;
    } else {
        return false;
    }

}

//  returns an object with user_name and authority from the access_token
export function getUser() {
    const accessToken = localStorage.getItem("access_token");
    if(!accessToken) {
        return false;
    }
    return JSON.parse(window.localStorage.getItem("user"));
}

export async function removeStaleTokens() {
    console.log("Removing stale tokens...");

    // clear tokens from localStorage if backend tells us the tokens are invalid
    // make the request
    const request = {
        method: 'GET',
        headers: getHeaders()
    };
    await fetch(`/api/users/authinfo`, request)
        .then((response) => {
            // if fetch error then you might be using stale tokens
            if (response.status === 401) {
                window.localStorage.clear();
            }
        }).catch(error => {
            console.log("FETCH ERROR: " + error);
        });
}
