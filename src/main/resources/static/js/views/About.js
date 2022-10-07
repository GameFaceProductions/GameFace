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
                <p>Connect. Play. Grow.</p>
            </div>
            <br>
            <div class="statement">
                <h4 style="text-align: center">What we are:</h4>
                <p>GameFace is a social media platform that allows gamers to connect with other gamers in order to enhance their gaming experience.</p>
                <p>Join us now and begin to connect, play, and grow your brand with other gamers like you!</p>
            </div>
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