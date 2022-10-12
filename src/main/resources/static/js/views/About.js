export default function About(props) {
    return `
        <header>
            <h1 style="text-align: center">About Us</h1>
        </header>
        <br>
        <main>
            <div style="position: relative; width: 100%; height: 0; padding-top: 100.0000%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;">
                <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;" src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFNb6KWHPY&#x2F;view?embed" allowfullscreen="allowfullscreen" allow="fullscreen"></iframe>
                <h1 style="text-align: center">GameFace</h1>
            </div>
<!--            <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFNb6KWHPY&#x2F;view?utm_content=DAFNb6KWHPY&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">-->
            <p style="text-align: center">Connect. Create. Grow.</p>
            <br>
            <div class="statement" style="text-align: center">
                <h4 style="text-align: center">Connect</h4>
                <p>GameFace is a social media platform made BY gamers FOR gamers.  GameFace allows gamers and casual users alike to connect with others, create unique content, and grow their skills in order to enhance their gaming experience. Join us now and begin to connect, play, and grow your brand with other gamers like you!</p>
            </div>
            <br>
            <div class="statement" style="text-align: center">
                <h4 style="text-align: center">Create</h4>
                <p style="text-align: center">GameFace is a platform that allows users to freely create and experiment with different types of content without having to worry about demonetization or confusing algorithms. All in an ad-free environment.</p>
            </div>
            <br>
            <div class="statement" style="text-align: center">
                <h4 style="text-align: center">Grow</h4>
                <p>Connect with gamers from all places and levels to create a unique gaming experience and take your skills and brand to the next level!</p>
            </div>
            <br>
              <div class="header-cards">
                        <h4 style="text-align: center">Meet our developers:</h4>
                    </div>
            <div class="developer-container">
<!--                <h4 style="text-align: center">Meet our developers:</h4>-->
                <div class="developer-cards" style="text-align: center">
                    <div class="card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/101914667?v=4" alt="dev"/>
                        </div>
                        <h2>Scrimm</h2>
                        <small>Team Lead</small>
                        <h3>About Me</h3>
                        <p>Lorem ipsum blah blah</p>
                        <button onclick="window.location.href='https://www.linkedin.com/in/chase-forestello/';">Connect!</button>
                    </div>
                    <div class="card">
                        <div class="profile-img">
                            <img src="https://avatars.githubusercontent.com/u/106278680?v=4" alt="dev"/>
                        </div>
                        <h2>Pinky</h2>
                        <small>Drip Coordinator</small>
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
                        <small>Backend GOAT</small>
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
<!--                <input type="button" onclick="location.href='/login';" value="Login" />-->
<!--                <input type="button" onclick="location.href='/register';" value="Register" />-->
        
        </main>
    `;
}