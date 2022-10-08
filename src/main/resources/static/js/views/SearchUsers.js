import CreateView from "../createView.js";

let me;
export default function searchUsersHTML(props) {
  me = props.me;
  console.log(me);
  return `
<!-- html here -->
[SEARCH BAR]
    `;
}

export function searchUsersJS() {}
