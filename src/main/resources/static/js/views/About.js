export default function About(props) {
    return `
        <header>
            <h1 style="text-align: center">About Us</h1>
        </header>
        <br>
        <main>
            <div class="logo">
                <img src="/images/1.jpg" alt="logo">
<!--                <h1 style="text-align: center">GameFace</h1>-->
                <h2 style="text-align: center">Connect. Create. Grow.</h2>
            </div>
            <br>
            <div class="statement connect">
                <h4 style="text-align: center">Connect</h4>
                <p>GameFace is a social media platform made BY gamers FOR gamers.  GameFace allows gamers and casual users alike to connect with others, create unique content, and grow their skills in order to enhance their gaming experience. Join us now and begin to connect, play, and grow your brand with other gamers like you!</p>
            </div>
            <br>
            <div class="statement create">
                <h4 style="text-align: center">Create</h4>
                <p style="text-align: center">GameFace is a platform that allows users to freely create and experiment with different types of content without having to worry about demonetization or confusing algorithms. All in an ad-free environment.</p>
            </div>
            <br>
            <div class="statement grow">
                <h4 style="text-align: center">Grow</h4>
                <p>Connect with gamers from all places and levels to create a unique gaming experience and take your skills and brand to the next level!</p>
            </div>
            <br>
            <div class="developer-container">
                <h2 style="text-align: center">Meet our developers:</h2>   
<!--                <h4 style="text-align: center">Meet our developers:</h4>-->
                <div class="developer-cards" style="text-align: center">
                    <div class="card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/101914667?v=4" alt="dev"/>
                        </div>
                        <h2>Scrimm</h2>
                        <small>Developer</small>
                        <h3>About Me</h3>
                        <p>Lorem ipsum blah blah</p>
                        <button onclick="window.location.href='https://www.linkedin.com/in/chase-forestello/';">Connect!</button>
                    </div>
                    <div class="card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/106278680?v=4" alt="dev"/>
                        </div>
                        <h2>Pinky</h2>
                        <small>Developer</small>
                        <h3>About Me</h3>
                        <p>Lorem ipsum blah blah</p>
                        <button onclick="window.location.href='https://www.linkedin.com/in/brekken-jackson/';">Connect!</button>
                    </div>
                    <div class="card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/101299129?v=4" alt="dev"/>
                        </div>
                        <h2>B0derChola</h2>
                        <small>Developer</small>
                        <h3>About Me</h3>
                        <p>Lorem ipsum blah blah</p>
                        <button onclick="window.location.href='https://www.linkedin.com/in/valeriareveles/';">Connect!</button>
                    </div>
                    <div class="card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/106278622?v=4" alt="dev"/>
                        </div>
                        <h2>Mattdog00</h2>
                        <small>Developer</small>
                        <h3>About Me</h3>
                        <p>Lorem ipsum blah blah</p>
                        <button onclick="window.location.href='https://github.com/MatthewRMoreno';">Connect!</button>
                    </div>
                </div>
            </div>
            <div class="buttons" style="text-align: center">
                <button onclick="window.location.href='/login';">Login</button>
                <button onclick="window.location.href='/register';">Register</button>
            </div>
        </main>          
    `;
}