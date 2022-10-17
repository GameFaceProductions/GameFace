import { getHeaders, getUser, updateLocalStorage } from "../auth.js";
import createView from "../createView.js";

let user;
let games;
export default function searchUsersHTML(props) {
  user = props.users;
  console.log(user);

  return `
<!-- html here -->
    <div class="container px-1 mt-1 text-center">
    <form>
        <label for="searchGamesInput" class="searchGamesLabel form-label">Search Games</label>
        <input type="search" class="form-control text-center" placeholder="Username" id="searchGamesInput">
        <button type="submit" id="searchGamesBtn" class="searchGamesBtn">Search</button>
    </form>   
      <div id="userListContainer" class="row g-3">
      </div>
    </div>`;
}

export function searchGamesJS() {
  let theHomiesGames = [];
  let loggedInUserActually;
  const loggedInUser = getUser();
  let myd = loggedInUser.id;
  let searchGamesBtn = document.getElementById(`searchGamesBtn`);
  let searchGamesPageContainer = document.getElementById("gameListContainer");

  for (let i = 0; i < user.length; i++) {
    if (myd === user[i].id) {
      loggedInUserActually = user[i];
    }
  }
  for (let i = 0; i < loggedInUserActually.games.length; i++) {
    if (loggedInUserActually.userFriends[i] == null) {
      return;
    } else {
      theHomiesGames.push(loggedInUserActually.games[i].game);
    }
  }
  console.log(loggedInUserActually);

  searchGamesBtn.addEventListener("click", showSearchedGames);

  function showSearchedGames() {
    searchGamesPageContainer.innerHTML = `${makeGameCards(user)}`;

    function makeGameCards() {
      let searchGamesInput = document.getElementById("searchGamesInput");
      let html = "";
      return html;
    }

    function makeUserCard(user) {
      let friendBtn;
      // console.log(user);
      //check for matching game id (if matched show delete button NOt add button)
      if (theHomies.includes(user.id)) {
        friendBtn = `<button class="removeUserBtn rounded mb-2" data-id="${user.id}"><i class="fa-solid fa-user-minus"></i> Remove Friend</button>`;
      } else {
        friendBtn = `<button class="addUserBtn rounded mb-2" data-id="${user.id}"><i class="fa-solid fa-user-plus"></i> Add Friend</button>`;
      }

      return `
    <div class="col-sm-6 col-lg-3">
    <div class="searchCards card">
      <div id="${user.id}">
        ${friendBtn}
        </div>
    </div>
    </div>
 `;
    }
  }
  console.log(theHomiesGames);

  //  function and POST for adding a user as a friend:
  let addBtn = document.getElementsByClassName("addUserBtn");

  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", addFriend);
  }
  let removeBtn = document.getElementsByClassName("removeUserBtn");

  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", removeFriend);
  }

  // ADD FRIEND
  async function addFriend() {
    let id = this.getAttribute("data-id");

    const addFriendRequestOptions = {
      method: "POST",
      headers: getHeaders(),
    };
    await fetch(
      `http://localhost:8080/api/friends/${id}/${myd}`,
      addFriendRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("add friend error: " + response.status);
      } else {
        console.log("add friend ok");
        let thisBtnDiv = document.getElementById(`${id}`);
        thisBtnDiv.innerHTML = `<button class="removeUserBtn mb-2 rounded" data-id="${id}"><i class="fa-solid fa-user-minus"></i> Remove Friend</button>`;
        let removeBtn = document.getElementsByClassName("removeUserBtn");
        for (let i = 0; i < removeBtn.length; i++) {
          removeBtn[i].addEventListener("click", removeFriend);
        }
      }
    });
  }

  //  REMOVE FRIEND
  async function removeFriend() {
    let id = this.getAttribute("data-id");
    console.log(id);
    const removeFriendRequestOptions = {
      method: "DELETE",
      headers: getHeaders(),
    };
    fetch(
      `http://localhost:8080/api/friends/${id}/${myd}`,
      removeFriendRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("remove friend error: " + response.status);
      } else {
        console.log("remove friend ok");
        let thisBtnDiv = document.getElementById(`${id}`);
        thisBtnDiv.innerHTML = `<button class="addUserBtn rounded mb-2" data-id="${id}"><i class="fa-solid fa-user-plus"></i> Add Friend</button>`;
        let addBtn = document.getElementsByClassName("addUserBtn");
        for (let i = 0; i < addBtn.length; i++) {
          addBtn[i].addEventListener("click", addFriend);
        }
      }
    });
  }
}
