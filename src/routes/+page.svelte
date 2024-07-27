    <style>

    @keyframes fader {
        from { border-color: yellow}
        to { border-color: rgba(200, 200, 200, 0.1)}

    }
        .inner-container {
            --delay: 2s;
            --duration: 4s;
            border: 3px solid yellow;
            margin: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            animation-name: fader;
            animation-duration: var(--duration);
            animation-iteration-count: infinite;
            animation-direction: alternate;
            animation-delay: var(--delay);
        }
        .inner {
            text-align: center;
            margin: 20% 10px;
        }
    </style>

    <div class="inner-container" style="--delay: 2s">
        <div class="inner-container" style="--delay: 4s; --duration: 0.5s">
            <div class="inner-container" style="--delay: 3s">
                <div class="inner-container" style="--duration: 1.2s">
                    <div class="inner-container" style="--duration: 10s">
        <div class="inner">
            <h1>2024 will be Awesome</h1>
            <p>September 25-29, 2024</p>
            <p>Mendocino Woodlands</p>
        </div>
    </div>
                </div>
            </div>
        </div>
    </div>
<!--<a href="/registration">Register Now</a>-->
