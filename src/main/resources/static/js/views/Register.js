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
                <h1 style="text-align: center">Register</h1>
                <div class="container">
                    <div id="hgj" class="row">
                        <form id="register-form highlights">
                            <div class="card border-dark mb-3">
                                <div class="card-header" style="color: black">Register</div>
                                <div class="card-body highlights">
                                    <label for="username">Username</label>
                                    <input type="text" class="form-control" id="username" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                                    
                                    <label for="email">Email</label>
                                    <input type="text" class="form-control" id="email" placeholder="email@example.com" aria-label="Email" aria-describedby="basic-addon2">
        
                                    <label for="password">Password</label>
                                    <input type="text" class="form-control" id="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon3">
                                    <button type="button" id="register-btn" class="btn btn-outline-dark" style="margin-top: 1rem">Register</button>
                                </div>
                            </div>
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