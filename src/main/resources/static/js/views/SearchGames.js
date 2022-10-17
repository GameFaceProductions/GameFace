import { getHeaders, getUser, updateLocalStorage } from "../auth.js";
import createView from "../createView.js";

let user;
let games;
let myd;
export default function searchGamesHTML(props) {
  user = props.users;
  console.log(user);
  myd = getUser().id;
  games = props.users[myd].userGames;
  console.log(games);

  return `
<!-- html here -->
    <div class="container px-1 mt-1 text-center">
    <form>
        <label for="searchGamesInput" class="searchGamesLabel form-label">Search Games</label>
        <input type="search" class="form-control text-center" placeholder="Username" id="searchGamesInput">
        <button type="submit" id="searchGamesBtn" class="searchGamesBtn">Search</button>
    </form>   
      <div id="gameListContainer" class="row g-3">
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
    if (loggedInUserActually.games[i] == null) {
      return;
    } else {
      theHomiesGames.push(loggedInUserActually.games[i].gameId);
    }
  }
  console.log(loggedInUserActually);

  searchGamesBtn.addEventListener("click", showSearchedGames);

  function showSearchedGames() {
    searchGamesPageContainer.innerHTML = `${makeGameCards(user)}`;

    function makeGameCards() {
      let searchGamesInput = document.getElementById("searchGamesInput");
      console.log(searchGamesInput);
      let html = "";
      gameSearchReults.forEach(function () {
        html += makeGameCard();
      });
      return html;
    }

    function makeGameCard() {
      let gameBtn;
      // console.log(user);
      //check for matching game id (if matched show delete button NOt add button)
      if (theHomiesGames.includes(games.gameId)) {
        gameBtn = `<button class="removeGameBtn rounded mb-2" data-id="${user.id}"><i class="fa-solid fa-user-minus"></i> Remove Game</button>`;
      } else {
        gameBtn = `<button class="addGameBtn rounded mb-2" data-id="${user.id}"><i class="fa-solid fa-user-plus"></i> Add Game</button>`;
      }

      return `
    <div class="col-sm-6 col-lg-3">
    <div class="searchCards card">
      <div id="${user.id}">
        ${gameBtn}
        </div>
    </div>
    </div>
 `;
    }
  }
  console.log(theHomiesGames);

  // NEED TO GENERATE LIST OF GAMES BASED ON FETCH FROM RAWG NOT PRE GENERATED!
  // ENTIRE HTML NEEDS TO GENERATE!!!!
  //REFACTOR BELOW FOR GAMES!!!!!
  //  function and POST for adding a user as a friend:
  let addBtn = document.getElementsByClassName("addGameBtn");

  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", addGame);
  }
  let removeBtn = document.getElementsByClassName("removeGameBtn");

  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", removeGame);
  }

  // ADD FRIEND
  async function addGame() {
    let id = this.getAttribute("data-id");

    const addGameRequestOptions = {
      method: "POST",
      headers: getHeaders(),
    };
    await fetch(
      `http://localhost:8080/api/friends/${id}/${myd}`,
      addGameRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("add game error: " + response.status);
      } else {
        console.log("add game ok");
        let thisBtnDiv = document.getElementById(`${id}`);
        thisBtnDiv.innerHTML = `<button class="removeGameBtn mb-2 rounded" data-id="${id}"><i class="fa-solid fa-user-minus"></i> Remove Game</button>`;
        let removeBtn = document.getElementsByClassName("removeGameBtn");
        for (let i = 0; i < removeBtn.length; i++) {
          removeBtn[i].addEventListener("click", removeGame);
        }
      }
    });
  }

  //  REMOVE FRIEND
  async function removeGame() {
    let id = this.getAttribute("data-id");
    console.log(id);
    const removeGameRequestOptions = {
      method: "DELETE",
      headers: getHeaders(),
    };
    fetch(
      `http://localhost:8080/api/friends/${id}/${myd}`,
      removeGameRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("remove game error: " + response.status);
      } else {
        console.log("remove game ok");
        let thisBtnDiv = document.getElementById(`${id}`);
        thisBtnDiv.innerHTML = `<button class="addGameBtn rounded mb-2" data-id="${id}"><i class="fa-solid fa-user-plus"></i> Add Game</button>`;
        let addBtn = document.getElementsByClassName("addGameBtn");
        for (let i = 0; i < addBtn.length; i++) {
          addBtn[i].addEventListener("click", addFriend);
        }
      }
    });
  }
}
