// Player character

class Player {
    constructor(ctx, image, x, y, w, h, s) {
        this.ctx = ctx;
        this.image = image;

        this.x = x;
        this.y = y;

        this.cx = x + (w/2);
        this.cy = y + (h/2);

        this.width = w;
        this.height = h;

        this.radius = (w + h) / 4;

        this.speed = s || 1;

        this.direction = 'right';

        this.bounds = {
            top: 0,
            right: this.ctx.canvas.width - this.width,
            bottom: this.ctx.canvas.height - this.height,
            left: 0
        };
    }

    move(x, y, m) {
        let dx = x === 0 ? this.x : this.x + (x * this.speed * m);
        let dy = y === 0 ? this.y : this.y + (y * this.speed * m);
        
        // apply bounds
        let inBoundsX = dx >= this.bounds.left && dx <= this.bounds.right;
        if (inBoundsX) { this.setX(dx); }

        let inBoundsY = dy >= this.bounds.top && dy <= this.bounds.bottom;
        if (inBoundsY) { this.setY(dy); }

        // set direction
        if (x > 0) { this.direction = 'right'; }
        if (x < 0) { this.direction = 'left'; }
    }

    setX(x) {
        this.x = x;
        this.cx = this.x + (this.width/2);
    }

    setY(y) {
        this.y = y;
        this.cy = this.y + (this.height/2);
    }

    draw() {
        this.ctx.save();

        let scaleX = this.direction === 'left' ? -1 : 1;
        let posX = this.direction === 'left' ? -1 * this.x : this.x;
        let trX = this.direction === 'left' ? this.width : 0;

        this.ctx.translate(trX, 0);
        this.ctx.scale(scaleX, 1);

        this.ctx.drawImage(this.image, posX, this.y, this.width, this.height);

        this.ctx.restore();
    }

    collisionsWith(entities) {
        let result = Object.entries(entities)
        .find((ent) => { return this.collidesWith(ent[1]); })
        ? true : false;

        return result;
    };

    collidesWith(entity) {
        let vx = entity.cx - this.cx;
        let vy = entity.cy - this.cy;
        let distance = Math.sqrt(vx * vx + vy * vy);
        return distance < (entity.radius + this.radius);
    }
}

export default Player;