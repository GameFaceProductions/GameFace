export default function Loading(props) {
    return `
    <div class="load">
        <div class="loading">
            <div class="loadTip">
                <h4>DEV TIP NO. 15</h4>
            </div>
            <div class="loadHeader">
                <p>When in doubt, sout it out.</p>
            </div>
        </div>
        <div class="loadBar">
            <p style="text-align: center">INITIALIZING RESPAWN_SEQUENCE.BAT...</p>
            <div class="progress-bar">
                <span class="progress-bar__inner" style="width: 100%"></span>
            </div>
            <p style="text-align: center">PREDICTING CHANCE OF WEBSITE CRASH...</p>
        </div>
    </div>
`;
}