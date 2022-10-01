import CreateView from "../createView.js"
import {isLoggedIn} from "../auth.js";
import createView from "../createView.js";

export default function Register(props) {
    if(isLoggedIn()){
        createView("/");
        return;
    }

    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Register</title>
            </head>
            <body>
                <h1>Register</h1>
                <div class="container">
                    <div id="hgj" class="row">
                        <form id="register-form">
                            <label for="username">Username</label>
                            <input class="col-12" id="username" name="username" type="text"/>
                            <label for="email">Email</label>
                            <input class="col-12" id="email" name="email" type="email">
                            <label for="password">Password</label>
                            <input class="col-12" id="password" name="password" type="password"/>
                            <button id="register-btn" type="button">Register</button>
                        </form>
                    </div>
                </div>
            </body>
        </html>
`;
}

export function RegisterEvent() {
    let regBtn = document.getElementById('register-btn')
    const userName = document.getElementById('username');
    const eMail = document.getElementById('email');
    const passWord = document.getElementById('password');
    // let date = new Date();
    regBtn.addEventListener("click", function (event) {
        let newUser = {
            userName: userName.value,
            email: eMail.value,
            password: passWord.value,
            // createdAt: date
        }
        console.log(newUser);
        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }
        fetch(USER_API_BASE_URL + "/create", request)
            .then(response => {
                console.log(response.status);
                CreateView("/");
            })
    })
}