import { getHeaders, getUser, updateLocalStorage } from "../auth.js";
import createView from "../createView.js";

let user;
export default function searchUsersHTML(props) {
  user = props.users;
  console.log(user);
  // FILE STACK PICKER https://cdn.filestackcontent.com/

  // const client = filestack.init("Aj4l9UFbrTTOmVjrVojEgz");
  // const options = {
  //   onFileSelected: (file) => {
  //     // If you throw any error in this function it will reject the file selection.
  //     // The error message will be displayed to the user as an alert.
  //     if (file.size > 1000 * 1000) {
  //       throw new Error("File too big, select something smaller than 1MB");
  //     }
  //   },
  //   maxFiles: 1,
  //   onUploadDone: function (res) {
  //     const url = res.filesUploaded[0].url;
  //     console.log(url);
  //     console.log(res);
  //   },
  //   supportEmail: "gamefaceproductions210@gmail.com",
  //   hideModalWhenUploading: true,
  // };
  //
  // client.picker(options).open();

  return `
<!-- html here -->
    <div class="container px-1 mt-1 text-center">
    <form>
        <label for="searchUserInput" class="searchUsersLabel form-label">Search Users</label>
        <input type="search" class="form-control text-center" placeholder="Username" id="searchUserInput">
      <button type="submit" id="searchUserSubmitBtn" class="searchUsers searchUsersBtn btn btn-dark mt-1">Search</button>
    </form>   
      <div id="userListContainer" class="row g-3">
      </div>
    </div>`;
}

export function searchUsersJS() {
  let theHomies = [];
  let loggedInUserActually;
  const loggedInUser = getUser();
  let myd = loggedInUser.id;
  let searchUsersInput = document.getElementById(`searchUserInput`);
  let searchUsersPageContainer = document.getElementById("userListContainer");

  for (let i = 0; i < user.length; i++) {
    if (myd === user[i].id) {
      loggedInUserActually = user[i];
    }
  }
  for (let i = 0; i < loggedInUserActually.userFriends.length; i++) {
    if (loggedInUserActually.userFriends[i] == null) {
      return;
    } else {
      theHomies.push(loggedInUserActually.userFriends[i].id);
    }
  }
  console.log(loggedInUserActually);

  searchUsersInput.addEventListener("keyup", showSearchedUsers);
  showSearchedUsers();

  function showSearchedUsers() {
    searchUsersPageContainer.innerHTML = `${makeUserCards(user)}`;

    function makeUserCards() {
      let searchUserInput = document.getElementById("searchUserInput");
      let html = "";
      user.forEach(function (user) {
        if (user.userName.includes(searchUserInput.value)) {
          html += makeUserCard(user);
        }
      });
      return html;
    }

    function makeUserCard(user) {
      let friendBtn;
      let url = user.backdrop_url;
      // console.log(user);
      if (theHomies.includes(user.id)) {
        friendBtn = `<button class="removeUserBtn btn mb-2" data-id="${user.id}">- Remove Friend</button>`;
      } else {
        friendBtn = `<button class="addUserBtn btn mb-2" data-id="${user.id}">+ Add Friend</button>`;
      }

      return `
    <div class="col-sm-6 col-lg-3">
    <div class="searchCards card">
      <div class="card-body rounded" style="background-image: url('${url}')">
<!--      <div class="userBackdrop rounded" style="background-image: url('${url}')"></div>-->
        <img src="${user.avatar_url}" class="userAvatar rounded-circle" referrerpolicy="no-referrer">
        <h5 class="card-title searchUsersUsername">${user.userName}</h5>
      </div>
      <div id="${user.id}">
        ${friendBtn}
        </div>
    </div>
    </div>
 `;
    }
  }
  console.log(theHomies);

  //  function and POST for adding a user as a friend:
  let addBtn = document.getElementsByClassName("addUserBtn");

  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", addFriend);
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
        thisBtnDiv.innerHTML = `<button class="removeUserBtn btn mb-2" data-id="${id}">- Remove Friend</button>`;
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
        thisBtnDiv.innerHTML = `<button class="addUserBtn btn mb-2" data-id="${user.id}">+ Add Friend</button>`;
        let addBtn = document.getElementsByClassName("addUserBtn");
        for (let i = 0; i < addBtn.length; i++) {
          addBtn[i].addEventListener("click", addFriend);
        }
      }
    });
  }
}
