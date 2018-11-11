import Particle from './Particle';

class Smoke extends Particle {
    constructor (pos) {
        super(pos);

        this.size = 4;
        this.vel.x = Math.random() * 0.01;
        this.vel.y = Math.random() * 0.01;
        this.gravity = -0.2;
        this.resistance = 0.01;
        this.shrink = 1.03;
        this.fade = Math.random() * 0.03 + 0.02;
        this.alpha = 1;

        this.start = 0;
    }

    render(c) {
        if (!this.exists()) {
            return;
        }

        c.save();

        c.globalCompositeOperation = 'lighter';

        const x = this.pos.x;
        const y = this.pos.y;
        const r = this.size / 2;

        const gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
        gradient.addColorStop(0.1, `rgba(200,200,200,${this.alpha})`);
        gradient.addColorStop(1, `rgba(150,150,150,${this.alpha})`);

        c.fillStyle = gradient;

        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, true);
        c.lineTo(this.pos.x, this.pos.y);
        c.closePath();

        c.fill();

        c.restore();
    }

    exists() {
        return this.alpha >= 0.01;
    }

}

export default Smoke;