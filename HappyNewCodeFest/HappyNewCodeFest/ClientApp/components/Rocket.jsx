import Particle from './Particle';
import { CANVAS_HEIGHT } from './App';

class Rocket extends Particle
{
    constructor(x) {
        super({ x: x, y: CANVAS_HEIGHT });

        this.explosionColor = 0;
    }

    explode() {
        let explosionFunction;

        switch (Math.floor(Math.random() * 3 )) {
            case 0:
                explosionFunction = heartShape;
                break;
            case 1:
                explosionFunction = starShape;
                break;
            default:
                explosionFunction = sphereShape;
        }

        const countOfParticles = Math.random() * 10 + 250;

        const particles = [];

        for (let i = 0; i < countOfParticles; i++) {
            const particle = new Particle(this.pos);

            particle.vel = explosionFunction();

            particle.size = 20;

            particle.gravity = 0.2;
            particle.resistance = 0.92;
            particle.shrink = Math.random() * 0.05 + 0.93;
            particle.flick = true;
            particle.color = this.explosionColor;

            particles.push(particle);
        }

        return particles;
    }

    render (c) {
        if (!this.exists()) {
            return;
        }

        c.save();

        c.globalCompositeOperation = 'lighter';

        c.fillStyle = 'rgb(255,200,0)';

        c.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const pos = Math.random() * this.size / 2;

            c.arc(this.pos.x + Math.cos(angle) * pos,
                this.pos.y + Math.sin(angle) * pos,
                1.2,
                0,
                Math.PI * 2,
                true);
        }
        c.closePath();

        c.fill();

        c.restore();
    }
}

const starShape = () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.sin(5 * angle + Math.PI) * 9 + Math.random() * 3;

    return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    }
}

const heartShape = () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.2 + 0.5;

    return {
        x: (16 * Math.pow(Math.sin(angle), 3)) * speed,
        y: (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle)
            - Math.cos(4 * angle)) * -speed
    }
}

const sphereShape = () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.cos(Math.random() * Math.PI / 2) * 11;

    return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    }
}

export default Rocket;
    
