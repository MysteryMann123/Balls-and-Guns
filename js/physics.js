import { Vector } from './vector.js';

export class PhysicsEngine {
    static checkCircleCollision(pos1, radius1, pos2, radius2) {
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < radius1 + radius2 ? distance : null;
    }

    static resolveCircleCollision(ball1, ball2) {
        const dx = ball2.pos.x - ball1.pos.x;
        const dy = ball2.pos.y - ball1.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        const normal = new Vector(dx / distance, dy / distance);
        const tangent = new Vector(-normal.y, normal.x);

        const v1n = ball1.vel.dot(normal);
        const v1t = ball1.vel.dot(tangent);
        const v2n = ball2.vel.dot(normal);
        const v2t = ball2.vel.dot(tangent);

        ball1.vel.x = normal.x * v2n + tangent.x * v1t;
        ball1.vel.y = normal.y * v2n + tangent.y * v1t;
        ball2.vel.x = normal.x * v1n + tangent.x * v2t;
        ball2.vel.y = normal.y * v1n + tangent.y * v2t;

        const minDist = ball1.radius + ball2.radius;
        const overlap = minDist - distance;
        const separation = new Vector(normal.x * overlap * 0.5, normal.y * overlap * 0.5);

        ball1.pos.subtract(separation);
        ball2.pos.add(separation);
    }
}