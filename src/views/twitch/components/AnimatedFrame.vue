<template>
    <div class="frame">
        <div class="frame-side frame-top">
            <div class="random-shape" v-for="n in 5" :key="'top' + n"></div>
        </div>
        <div class="frame-side frame-right">
            <div class="random-shape" v-for="n in 8" :key="'right' + n"></div>
        </div>
        <div class="frame-side frame-bottom">
            <div class="random-shape" v-for="n in 5" :key="'bottom' + n"></div>
        </div>
        <div class="frame-side frame-left">
            <div class="random-shape" v-for="n in 8" :key="'left' + n"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StylizedFrame",
};
</script>

<style scoped lang="scss">
$right-frame: 300px;
$bottom-frame: 100px;
$top-left-frames: 5px;
/* Estilos generales del marco */
.frame {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

/* Estilos para los cuatro bordes */
.frame-side {
    position: absolute;
    background-color: #454545; /* Fondo semitransparente gris */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

/* Configuración de dimensiones para cada borde */

.frame-right {
    top: 0;
    right: 0;
    width: $right-frame;
    height: 100%;
}

.frame-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: $bottom-frame;
}

.frame-top {
    top: 0;
    left: 0;
    width: 100%;
    height: $top-left-frames;
}
.frame-left {
    top: 0;
    left: 0;
    width: $top-left-frames;
    height: 100%;
}

/* Estilos para las formas aleatorias */
.random-shape {
    width: 30px;
    height: 30px;
    background-color: #00c8ff; /* Fondo celeste */
    opacity: 0.8;
    border-radius: 50%; /* Curva para dar formas redondeadas */
    position: absolute;
    animation: float 6s ease-in-out infinite;
}

/* Posicionamiento aleatorio para las formas */
.frame-top .random-shape {
    top: 10%;
    left: calc(5% + 10vw * var(--i));
}
.frame-right .random-shape {
    left: 10%;
    top: calc(5% + 10vh * var(--i));
}
.frame-bottom .random-shape {
    top: 10%;
    left: calc(5% + 10vw * var(--i));
}
.frame-left .random-shape {
    left: 10%;
    top: calc(5% + 10vh * var(--i));
}

/* Animación flotante para las formas */
@keyframes float {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
