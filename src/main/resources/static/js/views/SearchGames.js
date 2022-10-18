import { getHeaders, getUser, updateLocalStorage } from "../auth.js";
import createView from "../createView.js";

let user;
let games;
let myd;
export default function searchGamesHTML(props) {
  user = props.users;
  console.log(user[0]);
  myd = getUser().id;
  games = user[myd].games;
  console.log(games);

  return `
<!-- html here -->
    <div class="container px-1 mt-1 text-center">
    <form>
        <label for="searchGamesInput" class="searchGamesLabel form-label">Search Games</label>
        <input type="search" class="form-control searchGamesInput text-center" placeholder="Username" id="searchGamesInput">
        <button type="submit" id="searchGamesBtn" class="searchGamesBtn rounded">Search</button>
    </form>   
      <div id="gameListContainer" class="row g-3">
      </div>
    </div>`;
}

export function searchGamesJS() {
  let getGameData;
  let gameData;
  let getGameStoreLink;
  let theHomiesGames = [];
  let loggedInUserActually;
  const loggedInUser = getUser();
  let myd = loggedInUser.id;
  let searchGamesBtn = document.getElementById(`searchGamesBtn`);
  let searchGamesStoreBtn = document.getElementsByClassName(`storeLink`);
  let searchGamesPageContainer = document.getElementById("gameListContainer");
  let searchGamesInput = document.getElementById("searchGamesInput");

  searchGamesBtn.addEventListener("click", fetchRawgGames);
  for (let i = 0; i < searchGamesStoreBtn.length; i++) {
    searchGamesStoreBtn[i].addEventListener("click", fetchRawgGamesStoreLink);
  }
  async function fetchRawgGamesStoreLink() {
    const requestOptions = {
      method: "GET",
    };
    getGameData = await fetch(
      `    https://api.rawg.io/api/games/${gameData.id}/stores?key=${RAWG_API_KEY}
`,
      requestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("fetch game error: " + response.status);
      } else {
        console.log("fetch game ok");
        return await response.json();
      }
    });
    console.log(getGameData);
  }
  async function fetchRawgGames() {
    let searchGameInput = searchGamesInput.value.trim();
    const requestOptions = {
      method: "GET",
    };
    getGameData = await fetch(
      `https://api.rawg.io/api/games?search=${searchGameInput}&page_size=18&key=${RAWG_API_KEY}`,
      requestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("fetch game error: " + response.status);
      } else {
        console.log("fetch game ok");
        return await response.json();
      }
    });
    console.log(getGameData);
    showSearchedGames();
  }

  function showSearchedGames() {
    searchGamesPageContainer.innerHTML = `${makeGameCards(user)}`;

    function makeGameCards() {
      gameData = getGameData.results;
      console.log(gameData);
      let html = "";
      gameData.forEach(function (gameData) {
        html += makeGameCard(gameData);
      });
      return html;
    }

    function makeGameCard(gameData) {
      let gameBtn;
      let storeBtn;
      console.log(user);
      storeBtn = `<button class="storeLink rounded mb-2" data-id="${gameData.id}"><i class="fa-solid fa-cart-shopping"></i></button>`;
      // check for matching game id (if matched show delete button NOt add button)
      if (theHomiesGames.includes(gameData.id)) {
        gameBtn = `<button class="removeGameBtn rounded mb-2" data-id="${gameData.id}"><i class="fa-solid fa-user-minus"></i> Remove Game</button>`;
      } else {
        gameBtn = `<button class="addGameBtn rounded mb-2" data-id="${gameData.id}"><i class="fa-solid fa-user-plus"></i> Add Game</button>`;
      }
      let html = "";
      html += `
     <div class="col-sm-6 col-lg-4">
     <div class="searchCards card gameCardBackground" style="background-image: url('${gameData.background_image}');  background-size: cover; background-position: center;">
       <div class="gameInfo rounded">
       <div class="text-nowrap">
       ${gameData.name}
         </div>
         <div id="${gameData.id}">
        ${gameBtn} ${storeBtn}
        </div>
     </div>
     </div>
     </div>
  `;
      return html;
    }
  }

  //
  //  console.log(theHomiesGames);
  //
  //  // NEED TO GENERATE LIST OF GAMES BASED ON FETCH FROM RAWG NOT PRE GENERATED!
  //  // ENTIRE HTML NEEDS TO GENERATE!!!!
  //  // REFACTOR BELOW FOR GAMES!!!!!
  //  //  function and POST for adding a user as a friend:
  //
  //  let addBtn = document.getElementsByClassName("addGameBtn");
  //
  //  for (let i = 0; i < addBtn.length; i++) {
  //    addBtn[i].addEventListener("click", addGame);
  //  }
  //  let removeBtn = document.getElementsByClassName("removeGameBtn");
  //
  //  for (let i = 0; i < removeBtn.length; i++) {
  //    removeBtn[i].addEventListener("click", removeGame);
  //  }
  //
  //  // ADD FRIEND
  //  async function addGame() {
  //    let id = this.getAttribute("data-id");
  //
  //    const addGameRequestOptions = {
  //      method: "POST",
  //      headers: getHeaders(),
  //    };
  //    await fetch(
  //      `http://localhost:8080/api/friends/${id}/${myd}`,
  //      addGameRequestOptions
  //    ).then(async function (response) {
  //      if (!response.ok) {
  //        console.log("add game error: " + response.status);
  //      } else {
  //        console.log("add game ok");
  //        let thisBtnDiv = document.getElementById(`${id}`);
  //        thisBtnDiv.innerHTML = `<button class="removeGameBtn mb-2 rounded" data-id="${id}"><i class="fa-solid fa-user-minus"></i> Remove Game</button>`;
  //        let removeBtn = document.getElementsByClassName("removeGameBtn");
  //        for (let i = 0; i < removeBtn.length; i++) {
  //          removeBtn[i].addEventListener("click", removeGame);
  //        }
  //      }
  //    });
  //  }
  //
  //  //  REMOVE FRIEND
  //  async function removeGame() {
  //    let id = this.getAttribute("data-id");
  //    console.log(id);
  //    const removeGameRequestOptions = {
  //      method: "DELETE",
  //      headers: getHeaders(),
  //    };
  //    fetch(
  //      `http://localhost:8080/api/friends/${id}/${myd}`,
  //      removeGameRequestOptions
  //    ).then(async function (response) {
  //      if (!response.ok) {
  //        console.log("remove game error: " + response.status);
  //      } else {
  //        console.log("remove game ok");
  //        let thisBtnDiv = document.getElementById(`${id}`);
  //        thisBtnDiv.innerHTML = `<button class="addGameBtn rounded mb-2" data-id="${id}"><i class="fa-solid fa-user-plus"></i> Add Game</button>`;
  //        let addBtn = document.getElementsByClassName("addGameBtn");
  //        for (let i = 0; i < addBtn.length; i++) {
  //          addBtn[i].addEventListener("click", addFriend);
  //        }
  //      }
  //    });
  //  }
}
