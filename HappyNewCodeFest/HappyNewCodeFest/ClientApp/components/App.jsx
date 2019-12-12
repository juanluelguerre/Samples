import React from 'react';
import 'bootstrap';
import PropTypes from 'prop-types';

import Rocket from './Rocket';
import Smoke from './Smoke';
import '../css/button.css';

const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight * 0.9;
const MAX_PARTICLES = 800;

var launchInterval, loopInterval, launchYear, loopYear, launchNew, loopNew;
var rockets = [], rocketsYear = [], rocketsNew = [];
var particles = [], particlesYear = [], particlesNew = [];

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            happyIsOn: false,
            newIsOn: false,
            yearIsOn: false
        }

        this.clickHappy = this.clickHappy.bind(this);
        this.clickNew = this.clickNew.bind(this);
        this.clickYear = this.clickYear.bind(this);
    }

    componentDidMount() {
        const greetingCtx = this.canvasGreeting.getContext('2d');
        const img = document.getElementById('source');
        img.onload = () => {
            greetingCtx.drawImage(img, CANVAS_WIDTH * 0.2, CANVAS_HEIGHT * 0.1);
        }

    }

    updateGreeting () {
        const greetingCtx = this.canvasGreeting.getContext('2d');
        const img = document.getElementById('source');
        console.log(img);

        greetingCtx.drawImage(img, CANVAS_WIDTH * 0.2, CANVAS_HEIGHT * 0.1);
    }

    clearGreeting() {
        const greetingCtx = this.canvasGreeting.getContext('2d');
        greetingCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    clickHappy() {
        
        if (this.state.happyIsOn) {
            if (!this.state.newIsOn && !this.state.yearIsOn) {
                this.updateGreeting();
            }
            
            const ctx = this.canvasHappy.getContext('2d');
            if (launchInterval !== undefined) {
                clearInterval(launchInterval);
            }
            if (loopInterval !== undefined) {
                clearInterval(loopInterval);
            }
            rockets = [];
            particles = [];
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            this.setState({ happyIsOn: false });
        } else {
            this.clearGreeting();
            const ctx = this.canvasHappy.getContext('2d');

            launchInterval = setInterval(function() {
                launchRocket();
            } , 1000);
            loopInterval = setInterval(function() {
                loopParticles(ctx);
            }, 20);

            this.setState({ happyIsOn: true });
        }
        
    }

    clickNew() {
        if (this.state.newIsOn) {
            if (!this.state.happyIsOn && !this.state.yearIsOn) {
                this.updateGreeting();
            }
            const ctx = this.canvasNew.getContext('2d');

            if (launchNew !== undefined) {
                clearInterval(launchNew );
            }
            if (loopNew !== undefined) {
                clearInterval(loopNew);
            }
            rocketsNew = [];
            particlesNew = [];

            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            this.setState({ newIsOn: false });
        } else {
            this.clearGreeting();
            const ctx = this.canvasNew.getContext('2d');
            launchNew = setInterval(function () {
                launchRocketNew();;
            }, 1000);
            loopNew = setInterval(function () {
                loopParticlesNew(ctx);
            }, 20);

            this.setState({ newIsOn: true });
        }
    }

    clickYear() {
        if (this.state.yearIsOn) {
            if (!this.state.happyIsOn && !this.state.newIsOn) {
                this.updateGreeting();
            }
            const ctx = this.canvasYear.getContext('2d');

            if (launchYear !== undefined) {
                clearInterval(launchYear);
            }
            if (loopYear !== undefined) {
                clearInterval(loopYear);
            }
            rocketsYear = [];
            particlesYear = [];

            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            this.setState({ yearIsOn: false });

            
        } else {
            this.clearGreeting();
            const ctx = this.canvasYear.getContext('2d');

            launchYear = setInterval(function () {
                launchRocketYear();
            }, 1000);
            loopYear = setInterval(function () {
                loopParticlesYear(ctx);
            }, 20);
            this.setState({ yearIsOn: true });
        }
    }

    render() {
        const divStyle = {
            backgroundColor: '#000000'
        };

        const greetingStyle = {
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: '0'
        }

        const happyStyle = {
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: '1'
        }

        const newStyle = {
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: '2'
        }

        const yearStyle = {
            backgroundColor: 'transparent',
            position: 'relative',
            zIndex: '3'
        }

        return (
            <div style={divStyle}>
                <div className="container">
                    <div style={{ display: 'none' }} className="col-lg-1 col-offset-6 centered">
                        <img id="source" src="/images/CodeFest.png" alt="" />
                    </div>

                    <canvas ref={(canvas) => { this.canvasGreeting = canvas }}
                            width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                            style={greetingStyle}/>

                    <canvas ref={(canvas) => { this.canvasHappy = canvas }}
                            width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                            style={happyStyle} />
                    <canvas ref={(canvas) => { this.canvasNew = canvas }}
                            width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                            style={newStyle} />
                    <canvas ref={(canvas) => { this.canvasYear = canvas }}
                            width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                            style={yearStyle} />
                </div>

                <div height={window.innerHeight * 0.1 } className="row align-content-center justify-content-center">
                    <button className="btn btn-lg btn-warning mr-5"
                        onClick={this.clickHappy} >
                        <h2>Happy</h2>
                    </button>
                    <button className="btn btn-lg btn-warning mx-5"
                        onClick={this.clickNew} >
                        <h2>New</h2>
                    </button>
                    <button className="btn btn-lg btn-warning ml-5"
                        onClick={this.clickYear} >
                        <h2>Codefest !</h2>
                    </button>
                </div>
            </div>
        );
    }
}

const launchRocket = () => {
    if (rockets.length < 6) {
        const rocket = new Rocket(CANVAS_WIDTH * 0.05);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        const random = Math.random();
        rocket.vel.x = ( random * 0.0105 + 0.0105) * CANVAS_WIDTH;
        rocket.vel.y = -( random * 0.01 + 0.01) * CANVAS_HEIGHT;
        rocket.size = 20;
        rocket.shrink = 0.999;
        rocket.gravity = 0.01;
        rockets.push(rocket);
    };

}

const loopParticles = (ctx) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    updateRockets(ctx);

    updateFireworks(ctx);
}

const updateRockets = (ctx) => {
    const existingRockets = [];

    for (let i = 0; i < rockets.length; i++) {
        rockets[i].update();

        rockets[i].render(ctx);

        addSmoke(rockets[i].pos);

        const randomChance = rockets[i].pos.y < (CANVAS_HEIGHT * 2 / 3)
            ? (Math.random() * 100 <= 1)
            : false;

        if (rockets[i].pos.y < CANVAS_HEIGHT / 3 || randomChance) {
            rockets[i].resistance = 0.98;
        }

        if (rockets[i].pos.y < CANVAS_HEIGHT / 4 || Math.abs(rockets[i].vel.y) <= 1) {
            rockets[i].explode().map(p => particles.push(p));
        } else {
            existingRockets.push(rockets[i]);
        }
    }

    rockets = existingRockets;

}

const updateFireworks = (ctx) => {
    const existingParticles = [];

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();

        if (particles[i].exists()) {
            particles[i].render(ctx);
            existingParticles.push(particles[i]);
        }
    }

    particles = existingParticles;

    while (particles.length > MAX_PARTICLES) {
        particles.shift();
    }
}

const addSmoke = (pos) => {
    if (Math.random() < 1) {
        const smoke = new Smoke(pos);

        smoke.vel.x = (Math.random() * 0.008 + 0.008) * CANVAS_WIDTH;
        particles.push(smoke);
    }
}

const launchRocketYear = () => {
    if (rocketsYear.length < 6) {
        const rocket = new Rocket(CANVAS_WIDTH * 0.95);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        const random = Math.random();
        rocket.vel.x = -(random * 0.012 + 0.012) * CANVAS_WIDTH;
        rocket.vel.y = -(random * 0.01 + 0.01) * CANVAS_HEIGHT;
        rocket.size = 20;
        rocket.shrink = 0.999;
        rocket.gravity = 0.01;
        rocketsYear.push(rocket);
    };
}

const loopParticlesYear = (ctx) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    updateRocketsYear(ctx);

    updateFireworksYear(ctx);
}

const updateRocketsYear = (ctx) => {
    const existingRockets = [];

    for (let i = 0; i < rocketsYear.length; i++) {
        rocketsYear[i].update();

        rocketsYear[i].render(ctx);

        addSmokeYear(rocketsYear[i].pos);

        const randomChance = rocketsYear[i].pos.y < (CANVAS_HEIGHT * 2 / 3)
            ? (Math.random() * 100 <= 1)
            : false;

        if (rocketsYear[i].pos.y < CANVAS_HEIGHT / 2 || randomChance) {
            rocketsYear[i].resistance = 0.98;
        }

        if (rocketsYear[i].pos.y < CANVAS_HEIGHT / 3 || Math.abs(rocketsYear[i].vel.y) <= 1) {
            rocketsYear[i].explode().map(p => particlesYear.push(p));
        } else {
            existingRockets.push(rocketsYear[i]);
        }
    }

    rocketsYear = existingRockets;

}

const updateFireworksYear = (ctx) => {
    const existingParticles = [];

    for (let i = 0; i < particlesYear.length; i++) {
        particlesYear[i].update();

        if (particlesYear[i].exists()) {
            particlesYear[i].render(ctx);
            existingParticles.push(particlesYear[i]);
        }
    }

    particlesYear = existingParticles;

    while (particlesYear.length > MAX_PARTICLES) {
        particlesYear.shift();
    }
}

const addSmokeYear = (pos) => {
    if (Math.random() < 1) {
        const smoke = new Smoke(pos);

        smoke.vel.x = -(Math.random() * 0.01 + 0.01) * CANVAS_WIDTH;
        particlesYear.push(smoke);
    }
}

const launchRocketNew = () => {
    for (let i = 0; i < 3; i++) {
        if (rocketsNew.length < 12) {
            let rocket;
            switch (i) {
                case 0:
                    rocket = new Rocket(CANVAS_WIDTH * 0.5);
                    break;
                case 1:
                    rocket = new Rocket(CANVAS_WIDTH * (0.5 - Math.random() * 0.1));
                    break;
                default:
                    rocket = new Rocket(CANVAS_WIDTH * (0.5 + Math.random() * 0.1));
            }
            rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
            const random = Math.random();

            switch (i) {
                case 0:
                    rocket.vel.x = 0;
                    break;
                case 1:
                    rocket.vel.x = -(random * 0.001 + 0.001) * CANVAS_WIDTH;
                    break;
                default:
                    rocket.vel.x = (random * 0.001 + 0.001) * CANVAS_WIDTH;
                    break;
            }

            rocket.vel.y = -(random * 0.01+ 0.01) * CANVAS_HEIGHT;
            rocket.size = 20;
            rocket.shrink = 0.999;
            rocket.gravity = 0.01;
            rocketsNew.push(rocket);
        };
    }
    
}

const loopParticlesNew = (ctx) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    updateRocketsNew(ctx);

    updateFireworksNew(ctx);
}

const updateRocketsNew = (ctx) => {
    const existingRockets = [];

    for (let i = 0; i < rocketsNew.length; i++) {
        rocketsNew[i].update();

        rocketsNew[i].render(ctx);

        addSmokeNew(rocketsNew[i].pos);

        const randomChance = rocketsNew[i].pos.y < (CANVAS_HEIGHT * 2 / 3)
            ? (Math.random() * 100 <= 1)
            : false;

        if (rocketsNew[i].pos.y < CANVAS_HEIGHT / 3 || randomChance) {
            rocketsNew[i].resistance = 0.98;
        }

        if (rocketsNew[i].pos.y < CANVAS_HEIGHT / 6 || Math.abs(rocketsNew[i].vel.y) <= 1) {
            rocketsNew[i].explode().map(p => particlesNew.push(p));
        } else {
            existingRockets.push(rocketsNew[i]);
        }
    }

    rocketsNew = existingRockets;
}

const updateFireworksNew = (ctx) => {
    const existingParticles = [];

    for (let i = 0; i < particlesNew.length; i++) {
        particlesNew[i].update();

        if (particlesNew[i].exists()) {
            particlesNew[i].render(ctx);
            existingParticles.push(particlesNew[i]);
        }
    }

    particlesNew = existingParticles;

    while (particlesNew.length > MAX_PARTICLES) {
        particlesNew.shift();
    }
}

const addSmokeNew = (pos) => {
    if (Math.random() < 1) {
        const smoke = new Smoke(pos);

        smoke.vel.x = -(Math.random() * 0.0008 + 0.0008) * CANVAS_WIDTH;
        particlesNew.push(smoke);
    }
}

export default App;