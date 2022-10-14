import CreateView from "../createView.js";
import { getHeaders, getUser } from "../auth.js";
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
  const loggedInUser = getUser();
  console.log(loggedInUser);
  let submitBtn = document.getElementById("searchUserSubmitBtn");
  let searchUsersInput = document.getElementById(`searchUserInput`);
  let searchUsersPageContainer = document.getElementById("userListContainer");
  let loggedInUserFriends;
  showSearchedUsers();
  searchUsersInput.addEventListener("keyup", showSearchedUsers);

  async function getFriends() {
    const requestOptions = {
      method: "GET",
      headers: getHeaders(),
    };
    const id = loggedInUser.id;
    loggedInUserFriends = await fetch(
      `http://localhost:8080/api/friends/${id}`,
      requestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("get friends error: " + response.status);
      } else {
        console.log("get friends ok");
        return await response.json();
      }
    });
    console.log(loggedInUserFriends);
  }
  let log = getFriends;
  console.log(log.userFriends);

  function showSearchedUsers() {
    searchUsersPageContainer.innerHTML = `${makeUserCards(user)}`;

    function makeUserCards(users) {
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
      let url = user.backdrop_url;
      console.log(user);
      return `
    <div class="col-sm-6 col-lg-3">
    <div class="searchCards card">
      <div class="card-body rounded" style="background-image: url('${url}')">
<!--      <div class="userBackdrop rounded" style="background-image: url('${url}')"></div>-->
        <img src="${user.avatar_url}" class="userAvatar rounded-circle" referrerpolicy="no-referrer">
        <h5 class="card-title searchUsersUsername">${user.userName}</h5>
      </div>
      <div id="searchUsersFoot">
        <button class="addUserBtn btn mb-2" data-id="${user.id}">+ ADD USER</button>
        </div>
    </div>
    </div>
 `;
    }
  }

  //  function and POST for adding a user as a friend:
  let addBtn = document.getElementsByClassName("addUserBtn");
  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", addFriend);
  }

  async function addFriend() {
    const addFriendRequestOptions = {
      method: "POST",
      headers: getHeaders(),
    };
    let myd = loggedInUser.id;
    let id = this.getAttribute("data-id");
    console.log(id);
    const addFriend = await fetch(
      `http://localhost:8080/api/friends/${id}/${myd}`,
      addFriendRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("add friend error: " + response.status);
      } else {
        console.log("add friend ok");
        console.log(response);
        return await response.json();
        // await createView("/searchusers");
      }
    });
    console.log(addFriend);
  }
}
