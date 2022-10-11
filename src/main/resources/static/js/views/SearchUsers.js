import CreateView from "../createView.js";

let user;
export default function searchUsersHTML(props) {
  user = props.users;
  console.log(user);
  return `
<!-- html here -->
    <div class="container mt-1">
    <form>
      <div class="text-center">
        <label for="searchUserInput" class="form-label">Search Users</label>
        <input type="search" class="form-control" placeholder="Search User" id="searchUserInput">
      <button type="submit" id="searchUserSubmitBtn" class="btn btn-dark mt-1">Search</button>
      <div>
    </form>
      <div id="userListContainer" class="row">
      </div>
    </div>
    `;
}

export function searchUsersJS() {
  let submitBtn = document.getElementById("searchUserSubmitBtn");
  let searchUsersPageContainer = document.getElementById("userListContainer");
  submitBtn.addEventListener("click", showSearchedUsers);
  //
  function showSearchedUsers() {
    searchUsersPageContainer.innerHTML = `${makeUserCards(user)}`;

    function makeUserCards(users) {
      let searchUserInput = document.getElementById("searchUserInput");
      let html = "";
      user.forEach(function (user) {
        console.log(user.userName);
        if (user.userName.includes(searchUserInput.value)) {
          html += makeUserCard(user);
        } else {
          console.log(user.userName + " does not match search.");
        }
      });
      return html;
    }

    function makeUserCard(user) {
      return `
    <div class="searchCards card col-md-3 m-1 p-2">
      <div class="card-body">
        <h5 class="card-title searchUsersTitle text-center">${user.userName}</h5>
        <p class="card-text"></p>
      </div>
      <div id="searchUsersFoot">
        <button class="delBtn btn mb-2" data-id="${user.id}">+ ADD USER</button>
        </div>
    </div>
`;
    }
  }
}
