<template>
    <div class="falling-stars-container">
        <canvas ref="canvas" class="falling-stars-canvas"></canvas>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";

export default {
    name: "FallingStars",
    setup() {
        const canvas = ref<HTMLCanvasElement | null>(null);
        const stars: Array<{
            x: number;
            y: number;
            size: number;
            angle: number;
            speed: number;
            alpha: number;
            color: string;
            trail: Array<{ x: number; y: number; alpha: number }>;
        }> = [];

        const getRandomYellowTone = () => {
            const r = 255;
            const g = Math.floor(200 + Math.random() * 55);
            const b = Math.floor(50 + Math.random() * 30);
            return `${r}, ${g}, ${b}`;
        };

        const createShootingStar = () => {
            const angle = Math.random() * Math.PI * 2;
            stars.push({
                x: Math.random() * canvas.value!.width,
                y: Math.random() * canvas.value!.height,
                size: Math.random() * 2 + 1.5, // Tamaño ajustado
                angle,
                speed: Math.random() * 5 + 3, // Velocidad ajustada para nueva escala
                alpha: 1,
                color: getRandomYellowTone(),
                trail: [],
            });
        };

        const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, points: number, alpha: number, color: string) => {
            const outerRadius = radius;
            const innerRadius = radius / 2;

            ctx.shadowBlur = 20;
            ctx.shadowColor = `rgba(${color}, ${alpha})`;

            ctx.beginPath();
            ctx.moveTo(x + outerRadius, y);
            for (let i = 0; i < points * 2; i++) {
                const angle = (i * Math.PI) / points;
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
            }
            ctx.closePath();
            ctx.fillStyle = `rgba(${color}, ${alpha})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        };

        const animate = (ctx: CanvasRenderingContext2D) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            stars.forEach((star, index) => {
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.speed *= 0.99; // Ligeramente menor desaceleración

                star.trail.push({ x: star.x, y: star.y, alpha: star.alpha });

                if (star.trail.length > 50) star.trail.shift();

                const gradient = ctx.createLinearGradient(star.trail[0].x, star.trail[0].y, star.x, star.y);
                gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                gradient.addColorStop(1, `rgba(${star.color}, ${star.alpha})`);

                ctx.beginPath();
                ctx.moveTo(star.trail[0].x, star.trail[0].y);
                star.trail.forEach((particle) => {
                    ctx.lineTo(particle.x, particle.y);
                });
                ctx.strokeStyle = gradient;
                ctx.lineWidth = star.size * 0.3;
                ctx.stroke();

                drawStar(ctx, star.x, star.y, star.size, 5, star.alpha, star.color);

                star.alpha -= 0.005;
                if (star.alpha <= 0) stars.splice(index, 1);
            });

            requestAnimationFrame(() => animate(ctx));
        };

        onMounted(() => {
            const canvasEl = canvas.value;
            if (canvasEl) {
                const scale = 0.2; // Escala de 1/5 del tamaño original
                canvasEl.width = 2560 * scale;
                canvasEl.height = 1440 * scale;

                const ctx = canvasEl.getContext("2d");
                if (ctx) {
                    setInterval(createShootingStar, 500);
                    animate(ctx);
                }
            }
        });

        return { canvas };
    },
};
</script>

<style lang="scss">
.falling-stars-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background: #000;
}

.falling-stars-canvas {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
