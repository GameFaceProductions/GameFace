import { getHeaders, getUser, updateLocalStorage } from "../auth.js";
import createView from "../createView.js";

let user;
let myd;
export default function searchGamesHTML(props) {
  user = props.user;
  console.log(user);
  myd = getUser().id;

  return `
<!-- html here -->
    <div class="container px-1 mt-1 text-center">
    <form>
        <label for="searchGamesInput" class="searchGamesLabel form-label">Search Games</label>
        <input type="search" class="form-control searchGamesInput text-center" placeholder="Game" id="searchGamesInput">
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
  const loggedInUser = getUser();
  let myd = loggedInUser.id;
  let redirectURL;
  let searchGamesBtn = document.getElementById(`searchGamesBtn`);
  let searchGamesStoreBtn = document.getElementsByClassName(`storeLink`);
  let searchGamesPageContainer = document.getElementById("gameListContainer");
  let searchGamesInput = document.getElementById("searchGamesInput");

  for (let i = 0; i < user.games.length; i++) {
    if (user.games[i] == null) {
      return;
    } else {
      theHomiesGames.push(user.games[i].gameId);
    }
  }

  searchGamesBtn.addEventListener("click", fetchRawgGames);

  async function fetchRawgGamesStoreLink() {
    let gameId = this.getAttribute("data-id");
    console.log(gameId);
    const requestOptions = {
      method: "GET",
    };
    getGameStoreLink = await fetch(
      `    https://api.rawg.io/api/games/${gameId}/stores?key=${RAWG_API_KEY}
`,
      requestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("fetch store link error: " + response.status);
      } else {
        console.log("fetch store link ok");
        return await response.json();
      }
    });
    console.log(getGameStoreLink.results);
    for (let i = 0; i < getGameStoreLink.results.length; i++) {
      if (getGameStoreLink.results[i].store_id === 1) {
        redirectURL = getGameStoreLink.results[i].url;
      } else {
        redirectURL = getGameStoreLink.results[0].url;
      }
    }
    return window.location.replace(`${redirectURL}`);
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
    showSearchedGames();
    searchGamesBtn.addEventListener("click", fetchRawgGames);
    for (let i = 0; i < searchGamesStoreBtn.length; i++) {
      searchGamesStoreBtn[i].addEventListener("click", fetchRawgGamesStoreLink);
    }
    let addGameBtn = document.getElementsByClassName("addGameBtn");

    for (let i = 0; i < addGameBtn.length; i++) {
      addGameBtn[i].addEventListener("click", addGame);
    }
    let removeGameBtn = document.getElementsByClassName("removeGameBtn");

    for (let i = 0; i < removeGameBtn.length; i++) {
      removeGameBtn[i].addEventListener("click", removeGame);
    }
  }

  function showSearchedGames() {
    searchGamesPageContainer.innerHTML = `${makeGameCards()}`;

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
      let released = gameData.released;
      let releaseYear;
      if (released === null) {
        releaseYear = `<br>`;
      } else {
        releaseYear = released.slice(0, 4);
      }
      if (gameData.stores === null) {
        storeBtn = `<button class="storeLink hidden rounded mb-2" data-id="${gameData.id}"><i class="fa-solid fa-cart-shopping"></i></button>`;
      } else {
        storeBtn = `<button class="storeLink rounded mb-2" data-id="${gameData.id}"><i class="fa-solid fa-cart-shopping"></i></button>`;
      }

      // check for matching game id (if matched show delete button NOt add button)
      if (theHomiesGames.includes(gameData.id)) {
        gameBtn = `<button class="removeGameBtn rounded mb-2" data-id="${gameData.id}"><i class="fa-solid favoriteStar fa-star"></i> Remove Game</button>`;
      } else {
        gameBtn = `<button class="addGameBtn rounded mb-2" name="${gameData.slug}" data-id="${gameData.id}"><i class="fa-regular notFavoriteStar fa-star"></i> Add Game</button>`;
      }
      let html = "";
      html += `
     <div class="col-md-6 col-lg-4">
     <div class="searchCards card gameCardBackground" style="background-image: url('${gameData.background_image}');  background-size: cover; background-position: center;">
     </div>
     <div class="gameInfo">
       <div class="gameInfoText">
       ${gameData.name}<br>
       ${releaseYear}
         </div>
         <div id="${gameData.id}">
        ${gameBtn}
        </div>
        ${storeBtn}
     </div>
     </div>
  `;
      return html;
    }
  }

  //
  console.log(theHomiesGames);
  //
  //  // NEED TO GENERATE LIST OF GAMES BASED ON FETCH FROM RAWG NOT PRE GENERATED!
  //  // ENTIRE HTML NEEDS TO GENERATE!!!!
  //  // REFACTOR BELOW FOR GAMES!!!!!
  //  //  function and POST for adding a game:

  //  // ADD GAME
  async function addGame() {
    let gameId = this.getAttribute("data-id");
    let gameName = this.getAttribute("name");

    //Pushing game into games table
    const addGameRequestOptions = {
      method: "POST",
      headers: getHeaders(),
    };
    await fetch(
      `https://game-face.io:8080/api/games/save/${gameName}/${gameId}`,
      addGameRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("save game error: " + response.status);
      } else {
        console.log("save game ok");
      }
    });

    //Pushing game into user_games table
    await fetch(
      `https://game-face.io:8080/api/games/add/${myd}/${gameId}`,
      addGameRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("add game to user error: " + response.status);
      } else {
        console.log("add game to user ok");
        let thisBtnDiv = document.getElementById(`${gameId}`);
        thisBtnDiv.innerHTML = `<button class="removeGameBtn rounded mb-2" data-id="${gameId}"><i class="fa-solid favoriteStar fa-star"></i> Remove Game</button>`;
        let removeBtn = document.getElementsByClassName("removeGameBtn");
        for (let i = 0; i < removeBtn.length; i++) {
          removeBtn[i].addEventListener("click", removeGame);
        }
      }
    });
  }
  //
  //  //  REMOVE GAME
  async function removeGame() {
    let gameId = this.getAttribute("data-id");
    console.log(gameId);
    const removeGameRequestOptions = {
      method: "DELETE",
      headers: getHeaders(),
    };
    fetch(
      `https://game-face.io:8080/api/games/${myd}/${gameId}`,
      removeGameRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("remove game error: " + response.status);
      } else {
        console.log("remove game ok");
        let thisBtnDiv = document.getElementById(`${gameId}`);
        thisBtnDiv.innerHTML = `<button class="addGameBtn rounded mb-2" name="${gameData.slug}" data-id="${gameId}"><i class="fa-regular notFavoriteStar fa-star"></i> Add Game</button>`;
        let addBtn = document.getElementsByClassName("addGameBtn");
        for (let i = 0; i < addBtn.length; i++) {
          addBtn[i].addEventListener("click", addGame);
        }
      }
    });
  }
}
