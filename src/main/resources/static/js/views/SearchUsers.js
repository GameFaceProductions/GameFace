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
  let searchUsersInput = document.getElementById(`searchUserInput`);
  let searchUsersPageContainer = document.getElementById("userListContainer");
  showSearchedUsers();
  searchUsersInput.addEventListener("keyup", showSearchedUsers);

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
      console.log(user.id);
      console.log(loggedInUser);
      let friendBtn;
      let addFriend = `<button class="addUserBtn btn mb-2" data-id="${user.id}">+ Add Friend</button>`;
      let deleteFriend = `<button class="removeUserBtn btn mb-2" data-id="${user.id}">- Remove Friend</button>`;
      let url = user.backdrop_url;
      let loggedInUsersFriendIds = [];
      for (let i = 0; i < loggedInUser.userFriends.length; i++) {
        loggedInUsersFriendIds.push(loggedInUser.userFriends[i].id);
      }
      console.log(loggedInUsersFriendIds);
      if (loggedInUsersFriendIds.includes(user.id)) {
        friendBtn = deleteFriend;
      } else {
        friendBtn = addFriend;
      }

      return `
    <div class="col-sm-6 col-lg-3">
    <div class="searchCards card">
      <div class="card-body rounded" style="background-image: url('${url}')">
<!--      <div class="userBackdrop rounded" style="background-image: url('${url}')"></div>-->
        <img src="${user.avatar_url}" class="userAvatar rounded-circle" referrerpolicy="no-referrer">
        <h5 class="card-title searchUsersUsername">${user.userName}</h5>
      </div>
      <div id="searchUsersFoot">
        ${friendBtn}
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

  // ADD FRIEND
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
        return await response.json();
      }
      document.location.reload();
    });
  }

  //  REMOVE FRIEND
  let removeBtn = document.getElementsByClassName("removeUserBtn");
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", removeFriend);
  }

  async function removeFriend() {
    const removeFriendRequestOptions = {
      method: "DELETE",
      headers: getHeaders(),
    };
    let myd = loggedInUser.id;
    let id = this.getAttribute("data-id");
    console.log(id);
    const addFriend = await fetch(
      `http://localhost:8080/api/friends/${id}/${myd}`,
      removeFriendRequestOptions
    ).then(async function (response) {
      if (!response.ok) {
        console.log("remove friend error: " + response.status);
      } else {
        console.log("remove friend ok");
        return await response.json();
      }
      document.location.reload();
    });
  }
}
