
class Particle {
    constructor(pos) {
        this.pos = {
            x: pos.x,
            y: pos.y
        };

        this.vel = {
            x: 0,
            y: 0
        };

        this.shrink = 0.97;
        this.size = 2;

        this.resistance = 1;
        this.gravity = 0;
        this.flick = false;

        this.alpha = 1;
        this.fade = 0;
        this.color = 0;
    }

    update () {
        this.vel.x *= this.resistance;
        this.vel.y *= this.resistance;

        this.vel.y += this.gravity;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.size *= this.shrink;

        this.alpha -= this.fade;
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
        gradient.addColorStop(0.1, `rgba(255,255,255,${this.alpha})`);
        gradient.addColorStop(0.8, `hsla(${this.color},100%,50%,${this.alpha})`);
        gradient.addColorStop(1, `hsla(${this.color},100%,50%,0.1)`);

        c.fillStyle = gradient;

        c.beginPath();
        c.arc(this.pos.x,
            this.pos.y,
            this.flick ? Math.random() * this.size : this.size,
            0,
            Math.PI * 2,
            true);
        c.closePath();

        c.fill();

        c.restore();

    }

    exists () {
        return this.alpha >= 0.1 && this.size >= 1;
    }
}

export default Particle;