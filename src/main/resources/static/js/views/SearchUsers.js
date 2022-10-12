import CreateView from "../createView.js";

let user;
export default function searchUsersHTML(props) {
  user = props.users;
  console.log(user);

  return `
<!-- html here -->
    <div class="container px-1 mt-1 text-center">
    <form>
        <label for="searchUserInput" class="form-label">Search Users</label>
        <input type="search" class="form-control text-center" placeholder="Username" id="searchUserInput">
      <button type="submit" id="searchUserSubmitBtn" class="btn btn-dark mt-1">Search</button>
    </form>   
      <div id="userListContainer" class="row g-2">
      </div>
    </div>`;
}

export function searchUsersJS() {
  let submitBtn = document.getElementById("searchUserSubmitBtn");
  let searchUsersInput = document.getElementById(`searchUserInput`);
  let searchUsersPageContainer = document.getElementById("userListContainer");
  showSearchedUsers();
  searchUsersInput.addEventListener("keyup", showSearchedUsers);

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
        }
      });
      return html;
    }

    function makeUserCard(user) {
      return `
<div class="col-md-3">
    <div class="searchCards card">
      <div class="card-body">
        <h5 class="card-title searchUsersTitle">${user.userName}</h5>
        <p class="card-text"></p>
      </div>
      <div id="searchUsersFoot">
        <button class="delBtn btn mb-2" data-id="${user.id}">+ ADD USER</button>
        </div>
    </div>
    </div>
`;
    }
  }
}
