export default function About(props) {
    return `
        <header>
            <h1>About Us</h1>
        </header>
        <main>
            <div>
                <input type="button" onclick="location.href='/login';" value="Login" />
                <input type="button" onclick="location.href='/register';" value="Register" />
            </div>
        </main>
    `;
}