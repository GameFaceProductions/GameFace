import {getUser, isLoggedIn} from "../auth.js";

export default function About(props) {
    let aboutUs = ``;

    if (!isLoggedIn()) {
        aboutUs += `
        <main>
          <div class="buttons" style="text-align: center">
            <button onclick="window.location.href='/login';">Login</button>
            <button onclick="window.location.href='/register';">Register</button>
          </div>
            <div class="logo">
                <div class="image">
                    <img src="/images/1.jpg" alt="logo">
                </div>
                <h2 class="vision" style="text-align: center">Connect &nbsp;&nbsp;• &nbsp;Create&nbsp;&nbsp; •&nbsp;&nbsp; Grow</h2>
            </div>
            <br><br><br>
            <div class="statement container">
                <div class="connect" style="display: flex; flex-direction: column; align-items: center;">
                    <h4 class="glitchy" style="text-align: center" title="Connect">Connect</h4>
                    <p style="text-align: center; max-width: 70%;">GameFace is a social media platform made BY gamers FOR gamers.  GameFace allows gamers and casual users alike to connect with others, create unique content, and grow their skills in order to enhance their gaming experience. Join us now and begin to connect, play, and grow your brand with other gamers like you!</p>
                </div>
                <br>
                <div class="create" style="display: flex; flex-direction: column; align-items: center;">
                    <h4 class="glitchy" style="text-align: center" title="Create">Create</h4>
                    <p style="text-align: center; max-width: 70%;">GameFace is a platform that allows users to freely create and experiment with different types of content without having to worry about demonetization or confusing algorithms. All in an ad-free environment.</p>
                </div>
                <br>
                <div class="grow" style="display: flex; flex-direction: column; align-items: center;">
                    <h4 class="glitchy" style="text-align: center" title="Grow">Grow</h4>
                    <p style="text-align: center; max-width: 70%;">Connect with gamers from all places and levels to create a unique gaming experience and take your skills and brand to the next level!</p>
                </div>
            </div>
             <br><br><br><br>
            <div class="developer container">
                <h2 class="devs" style="text-align: center">Meet our developers:</h2>   
<!--                <h4 style="text-align: center">Meet our developers:</h4>-->
                <div class="developer-cards" style="text-align: center">
                    <div class="dev-card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/101914667?v=4" alt="dev"/>
                        </div>
                        <h2>Scrimm</h2>
                        <small>Web Developer</small>
                        <h3>About Me</h3>
                        <p>They call me the Michael Angelo of gaming, but I am humble, so I just reply with "big facts". With that out of the way, welcome to GameFace! Join GameFace now and bring up your gaming skills to my level.</p>
                        <button onclick="window.location.href='https://www.linkedin.com/in/chase-forestello/';">Connect!</button>
                    </div>
                    <div class="dev-card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/106278680?v=4" alt="dev"/>
                        </div>
                        <h2>BrekkyJ</h2>
                        <small>Web Developer</small>
                        <h3>About Me</h3>
                        <p>Thanks for stopping by GameFace! I am a WebDev that enjoys problem-solving and team work. I can not wait until GameFace rises to the top to laugh at the other social medias, and no you can't have it Zuck.</p>
                        <button onclick="window.location.href='https://github.com/brekkenjackson';">Connect!</button>
                    </div>
                    <div class="dev-card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/101299129?v=4" alt="dev"/>
                        </div>
                        <h2>B0derChola</h2>
                        <small>Web Developer</small>
                        <h3>About Me</h3>
                        <p>Game recognize game, and you are looking a little unfamiliar right now. But don't worry, we can fix that! Join GameFace today and discover a whole new side to your gaming experience, so put your GameFace on and leggo!</p>
                        <button onclick="window.location.href='https://www.linkedin.com/in/valeriareveles/';">Connect!</button>
                    </div>
                    <div class="dev-card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/106278622?v=4" alt="dev"/>
                        </div>
                        <h2>Mattdog00</h2>
                        <small>Web Developer</small>
                        <h3>About Me</h3>
                        <p>FortNite, The Dark Night, All Night...don't matter! Join us now and come get wrecked in the most premiere and entertaining gaming social media platform today!</p>
                        <button onclick="window.location.href='https://github.com/MatthewRMoreno';">Connect!</button>
                    </div>
                </div>
            </div>
        </main>          
    `;
    }else {
        aboutUs += `
        <main>
            <div class="logo">
                <div class="image">
                    <img src="/images/1.jpg" alt="logo">
                </div>
                <h2 style="text-align: center">Connect &nbsp;&nbsp;• &nbsp;&nbsp;Create&nbsp;&nbsp; •&nbsp;&nbsp; Grow</h2>
            </div>
            <br><br><br><br><br>
            <div class="statement container">
                <div class="connect" style="display: flex; flex-direction: column; align-items: center;">
                    <h4 class="glitchy" style="text-align: center" title="Connect">Connect</h4>
                    <p style="text-align: center; max-width: 70%;">GameFace is a social media platform made BY gamers FOR gamers.  GameFace allows gamers and casual users alike to connect with others, create unique content, and grow their skills in order to enhance their gaming experience. Join us now and begin to connect, play, and grow your brand with other gamers like you!</p>
                </div>
                <br>
                <div class="create" style="display: flex; flex-direction: column; align-items: center;">
                    <h4 class="glitchy" style="text-align: center" title="Create">Create</h4>
                    <p style="text-align: center; max-width: 70%;">GameFace is a platform that allows users to freely create and experiment with different types of content without having to worry about demonetization or confusing algorithms. All in an ad-free environment.</p>
                </div>
                <br>
                <div class="grow" style="display: flex; flex-direction: column; align-items: center;">
                    <h4 class="glitchy" style="text-align: center" title="Grow">Grow</h4>
                    <p style="text-align: center; max-width: 70%;">Connect with gamers from all places and levels to create a unique gaming experience and take your skills and brand to the next level!</p>
                </div>
            </div>
                <br>
            <div class="developer container">
                <h2 class="devs"  style="text-align: center">Meet our developers:</h2><br><br>
<!--                <h4 style="text-align: center">Meet our developers:</h4>-->
                <div class="developer-cards" style="text-align: center">
                    <div class="dev-card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/101914667?v=4" alt="dev"/>
                        </div>
                        <h2>Scrimm</h2>
                        <small>Web Developer</small>
                        <h3>About Me</h3>
                        <p>They call me the Michael Angelo of gaming, but I am humble, so I just reply with "big facts". With that out of the way, welcome to GameFace! Join GameFace now and bring up your gaming skills to my level.</p>
                        <button onclick="window.location.href='https://www.linkedin.com/in/chase-forestello/';">Connect!</button>
                    </div>
                    <div class="dev-card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/106278680?v=4" alt="dev"/>
                        </div>
                        <h2>BrekkyJ</h2>
                        <small>Web Developer</small>
                        <h3>About Me</h3>
                        <p>Thanks for stopping by GameFace! I am a WebDev that enjoys problem-solving and team work. I can not wait until GameFace rises to the top to laugh at the other social medias, and no you can't have it Zuck.</p>
                        <button onclick="window.location.href='https://github.com/brekkenjackson';">Connect!</button>
                    </div>
                    <div class="dev-card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/101299129?v=4" alt="dev"/>
                        </div>
                        <h2>B0derChola</h2>
                        <small>Web Developer</small>
                        <h3>About Me</h3>
                        <p>Game recognize game, and you are looking a little unfamiliar right now. But don't worry, we can fix that! Join GameFace today and discover a whole new side to your gaming experience, so put your GameFace on and leggo!</p>
                        <button onclick="window.location.href='https://www.linkedin.com/in/valeriareveles/';">Connect!</button>
                    </div>
                    <div class="dev-card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/106278622?v=4" alt="dev"/>
                        </div>
                        <h2>Mattdog00</h2>
                        <small>Web Developer</small>
                        <h3>About Me</h3>
                        <p>FortNite, The Dark Night, All Night...don't matter! Join us now and come get wrecked in the most premiere and entertaining gaming social media platform today!</p>
                        <button onclick="window.location.href='https://github.com/MatthewRMoreno';">Connect!</button>
                    </div>
                </div>
            </div>
        </main>`;
    }
    return aboutUs;
}