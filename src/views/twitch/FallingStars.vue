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
            trail: Array<{ x: number; y: number; alpha: number }>;
        }> = [];

        const createShootingStar = () => {
            const angle = Math.random() * Math.PI * 2; // Dirección aleatoria
            stars.push({
                x: Math.random() * window.innerWidth, // Posición inicial
                y: Math.random() * window.innerHeight,
                size: Math.random() * 10 + 10, // Tamaño inicial de la estrella
                angle,
                speed: Math.random() * 15 + 10, // Velocidad inicial mayor para distancias largas
                alpha: 1,
                trail: [], // Cola de partículas
            });
        };

        const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, points: number, alpha: number) => {
            const outerRadius = radius;
            const innerRadius = radius / 2;
            ctx.beginPath();
            ctx.moveTo(x + outerRadius, y);
            for (let i = 0; i < points * 2; i++) {
                const angle = (i * Math.PI) / points;
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
            }
            ctx.closePath();
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
        };

        const animate = (ctx: CanvasRenderingContext2D) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            stars.forEach((star, index) => {
                // Actualizar la posición de la estrella
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.speed *= 0.995; // Reducir ligeramente la desaceleración para distancias largas

                // Crear una nueva partícula de cola
                star.trail.push({ x: star.x, y: star.y, alpha: star.alpha });

                // Mantener un límite de partículas en la cola
                if (star.trail.length > 50) star.trail.shift();

                // Dibujar una cola continua con un degradado
                const gradient = ctx.createLinearGradient(star.trail[0].x, star.trail[0].y, star.x, star.y);
                gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                gradient.addColorStop(1, `rgba(255, 255, 255, ${star.alpha})`);

                ctx.beginPath();
                ctx.moveTo(star.trail[0].x, star.trail[0].y);
                star.trail.forEach((particle) => {
                    ctx.lineTo(particle.x, particle.y);
                });
                ctx.strokeStyle = gradient;
                ctx.lineWidth = star.size * 0.3;
                ctx.stroke();

                // Dibujar la estrella principal
                drawStar(ctx, star.x, star.y, star.size, 5, star.alpha);

                // Reducir opacidad de la estrella y cola
                star.alpha -= 0.005;
                if (star.alpha <= 0) stars.splice(index, 1); // Eliminar estrella cuando desaparece
            });

            requestAnimationFrame(() => animate(ctx));
        };

        onMounted(() => {
            const canvasEl = canvas.value;
            if (canvasEl) {
                canvasEl.width = window.innerWidth;
                canvasEl.height = window.innerHeight;
                const ctx = canvasEl.getContext("2d");
                if (ctx) {
                    setInterval(createShootingStar, 500); // Generar estrellas periódicamente
                    animate(ctx); // Iniciar animación
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
