export default function About(props) {
    return `
        <header>
            <h1 style="text-align: center">About Us</h1>
        </header>
        <br>
        <main>
            <div class="logo" style="text-align: center">
                <h2>Game Face</h2>
                <img class="logo-landing" src="src/main/resources/static/images/1.jpg" alt="logo"/>
                <p>Connect. Create. Grow.</p>
            </div>
            <br>
            <div class="statement" style="text-align: center">
                <h4 style="text-align: center">Connect</h4>
                <p>GameFace is a social media platform made by gamers FOR gamers.  GameFace allows gamers and casual users alike to connect with others, create unique content, and grow their skills in order to enhance their gaming experience. Join us now and begin to connect, play, and grow your brand with other gamers like you!</p>
            </div>
            <br>
            <div class="statement" style="text-align: center">
                <h4 style="text-align: center">Create</h4>
                <p>GameFace is a platform that allows users to freely create and experiment with different types of content without having to worry about demonetization or confusing algorithms. All in an ad-free environment.</p>
            </div>
            <div class="statement" style="text-align: center">
                <h4 style="text-align: center">Grow</h4>
                <p>Connect with gamers from all places and levels to create a unique gaming experience and take your skills and brand to the next level!</p>
            </div>
            <br>
            <br>
            <div class="developers" style="text-align: center">
                <h4 style="text-align: center">Meet our developers:</h4>
                <div class="developer-card">
                    <p>Scrimm</p>
                    <p>Pinky</p>
                    <p>B0rderHoppinChola</p>
                    <p>Mattdog00</p>
                </div>
            </div>
            <br>
            <div class="about-buttons" style="text-align: center">
                <input type="button" onclick="location.href='/login';" value="Login" />
                <input type="button" onclick="location.href='/register';" value="Register" />
            </div>
        </main>
    `;
}