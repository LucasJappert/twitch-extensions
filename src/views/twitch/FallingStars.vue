<template>
    <div class="falling-stars-container"></div>
</template>

<script lang="ts">
import { onMounted } from "vue";
export default {
    name: "FallingStars",
    setup() {
        const CreateShootingStar = () => {
            const sky = document.querySelector(".falling-stars-container");
            if (!sky) return;

            const shootingStar = document.createElement("div");
            shootingStar.classList.add("falling-star");

            // Posición aleatoria para la estrella fugaz
            shootingStar.style.top = `${Math.random() * 100}%`;
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.animation = `shoot ${Math.random() * 4 + 1}s linear infinite`;
            shootingStar.style.width = `${Math.random() * 200 + 100}px`;

            sky.appendChild(shootingStar);
            console.log(shootingStar);

            // Eliminar la estrella después de la animación
            shootingStar.addEventListener("animationend", () => {
                shootingStar.remove();
                console.log("animationend");
            });
        };

        onMounted(() => {
            CreateShootingStar();
            // Crear estrellas fugaces de forma periódica
            setInterval(CreateShootingStar, 1000 * 1); // Cambia 1000 para ajustar la frecuencia
        });
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
    background: transparent;
}
.falling-star {
    position: absolute;
    // width: 100px;
    height: 10px;
    background: linear-gradient(white, transparent);
    opacity: 0;
    transform: rotate(45deg);
    // animation: shoot 2s linear infinite;
    z-index: 1;
}
/* Animación de la estrella */
@keyframes shoot {
    0% {
        opacity: 0;
        transform: translate(-100px, -100px) rotate(45deg);
    }
    50% {
        opacity: 1;
        transform: translate(0, 0) rotate(45deg);
    }
    100% {
        opacity: 0;
        transform: translate(500px, 500px) rotate(45deg);
    }
}
</style>
