<template>
    <div class="starry-background"></div>
</template>

<script>
export default {
    name: "StarryOverlay",
    mounted() {
        this.createStars();
    },
    methods: {
        createStars() {
            const starContainer = document.querySelector(".starry-background");
            const numStars = 100; // Número de estrellas que deseas

            for (let i = 0; i < numStars; i++) {
                const star = document.createElement("div");
                star.classList.add("star");

                // Tamaño aleatorio de las estrellas (entre 5 y 15px)
                const size = Math.random() * 10 + 5;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;

                // Color aleatorio en tonos de amarillo
                const yellowShade = `hsl(${Math.random() * 20 + 50}, 100%, 50%)`;
                star.style.backgroundColor = yellowShade;

                // Aplicar animación de parpadeo y duración aleatoria
                const twinkleDuration = Math.random() * 5 + 5; // Entre 5 y 10 segundos
                star.style.animationDuration = `${twinkleDuration}s`;

                // Posicionar inicialmente y agregar al contenedor
                this.setRandomPosition(star);
                starContainer.appendChild(star);

                // Escuchar el fin de la animación para reposicionar
                star.addEventListener("animationiteration", () => this.setRandomPosition(star));
            }
        },
        setRandomPosition(star) {
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
        },
    },
};
</script>

<style lang="scss">
/* Contenedor principal de la capa */
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
}

/* Fondo de estrellas */
.starry-background {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
    top: 0;
    left: 0;
}

/* Estilo de las estrellas */
.star {
    position: absolute;
    border-radius: 50%;
    animation: twinkle infinite;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

/* Animación de parpadeo y reubicación */
@keyframes twinkle {
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    25% {
        opacity: 1;
        transform: scale(1);
    } /* Brillo máximo */
    75% {
        opacity: 1;
        transform: scale(1);
    } /* Mantener brillo */
    100% {
        opacity: 0;
        transform: scale(0.5);
    } /* Apagarse y reposicionarse */
}
</style>
