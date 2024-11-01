<template>
    <div class="starry-background"></div>
</template>

<script>
export default {
    name: "StarryOverlay",
    mounted() {
        this.createStars();
        this.startShootingStarCheck();
    },
    beforeDestroy() {
        clearInterval(this.shootingStarInterval);
    },
    methods: {
        createStars() {
            const starContainer = document.querySelector(".starry-background");
            const numStars = 20; // Número de estrellas que deseas
            this.stars = []; // Arreglo para almacenar cada estrella

            for (let i = 0; i < numStars; i++) {
                const star = document.createElement("div");
                star.classList.add("star", "twinkle");

                // Tamaño aleatorio de las estrellas (entre 5 y 15px)
                const size = Math.random() * 10 + 2;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;

                // Color aleatorio en tonos de amarillo
                const yellowShade = `hsl(${Math.random() * 20 + 50}, 100%, 50%)`;
                star.style.backgroundColor = yellowShade;

                // Aplicar duración de parpadeo aleatoria
                const twinkleDuration = Math.random() * 2 + 8; // Entre 5 y 10 segundos
                star.style.animationDuration = `${twinkleDuration}s`;

                // Posicionar inicialmente y agregar al contenedor
                this.setRandomPosition(star);
                starContainer.appendChild(star);

                // Guardar la estrella en el arreglo
                this.stars.push(star);
            }
        },
        setRandomPosition(star) {
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.opacity = 1; // Asegura que sea visible cuando vuelva al ciclo normal
        },
        activateShootingStar(star) {
            // Quitar la animación de parpadeo y añadir la de estrella fugaz temporalmente
            star.classList.remove("twinkle");
            star.classList.add("shooting");

            // Configurar nueva posición objetivo para la estrella fugaz
            const targetTop = `${Math.random() * 100}%`;
            const targetLeft = `${Math.random() * 100}%`;

            // Asegurarnos de que la transición ocurra desde la posición actual
            // star.style.transition = ""; // Resetear transiciones temporales
            // star.style.opacity = 1; // Asegurarnos de que la opacidad sea 1 antes del movimiento

            // Usar setTimeout para desencadenar la animación de movimiento
            // setTimeout(() => {
            // Aplicar la transición después de un breve delay
            star.style.transition = "top 1s, left 1s, opacity 1s";
            star.style.top = targetTop;
            star.style.left = targetLeft;
            star.style.opacity = 0; // Atenuar a medida que se mueve
            // }, 10);

            setTimeout(() => {
                this.setRandomPosition(star);
                star.classList.remove("shooting");
                star.classList.add("twinkle");
            }, 1000);

            // Al final del movimiento, reubicar y restaurar animación de parpadeo
            // star.addEventListener(
            //     "transitionend",
            //     () => {
            //         this.setRandomPosition(star); // Reposicionar
            //         star.classList.remove("shooting"); // Quitar animación fugaz
            //         star.classList.add("twinkle"); // Reactivar animación de parpadeo
            //     },
            //     { once: true },
            // );
        },
        startShootingStarCheck() {
            // Ejecuta un setInterval para verificar la opacidad de las estrellas
            this.shootingStarInterval = setInterval(() => {
                this.stars.forEach((star) => {
                    const opacity = Number(getComputedStyle(star).opacity);
                    // Si la opacidad está cerca del máximo y cumple con la probabilidad, activa el efecto fugaz
                    if (opacity == 1 && Math.random() < 0.01) {
                        // 10% de probabilidad
                        console.log("Estrella fugaz activada"); // Confirmación de disparo
                        this.activateShootingStar(star);
                    }
                });
            }, 500); // Verifica cada 500ms
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
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

/* Animación de parpadeo */
.twinkle {
    animation: twinkle 2s linear infinite, rotate 10s linear infinite;
}

/* Efecto de parpadeo */
@keyframes twinkle {
    0% {
        opacity: 0;
        transform: scale(0);
    }
    25% {
        opacity: 1;
        transform: scale(1);
    }
    75% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}

/* Animación de estrella fugaz */
.shooting {
    transition: top 1s, left 1s, opacity 1s;
    opacity: 0;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
