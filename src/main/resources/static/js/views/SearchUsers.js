import CreateView from "../createView.js";

let user;
export default function searchUsersHTML(props) {
  user = props.users;
  console.log(user);
  return `
<!-- html here -->
    <div id="userListContainer" class="row">
        ${makeUserCards(user)}
    </div>
    `;

  function makeUserCards(users) {
    let html = "";
    users.forEach(function (user) {
      html += makeUserCard(user);
    });
    return html;
  }

  function makeUserCard(user) {
    return `
    <div class="card col-3 h-100">
      <div class="card-body">
        <h5 class="card-title movieTitle text-center">${user.userName}</h5>
        <h5 class="card-title movieTitle text-center">${user.email}</h5>
        <p class="card-text"></p>
      </div>
      <div id="movieFoot">
        <button class="delBtn btn mb-2" data-id="${user.id}"><i class="fa fa-trash"></i></button>
        </div>
      </div>
`;
  }
}

export function searchUsersJS() {}
