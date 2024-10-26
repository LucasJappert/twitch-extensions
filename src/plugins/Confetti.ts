const DEFAULT_CLASS_CONTAINER = '.schedule-container';

import confetti from 'canvas-confetti';

export default class Confetti {
    static Fire(container: HTMLElement | null = null) {
        if (!container) container = document.querySelector(DEFAULT_CLASS_CONTAINER) as HTMLElement;

        const canvas = GetCanvas(container);
        if (!canvas) return;

        // Agregar el canvas al contenedor
        container.appendChild(canvas);

        // Crear una instancia de confetti en el canvas
        const confettiInstance = GetConfettiInstance(canvas);

        // Configurar el confeti
        confettiInstance({
            particleCount: 100,
            spread: 360,
            angle: 90, // Ángulo de lanzamiento
            origin: { y: 0.5 }, // Punto de origen en el centro
            colors: ['#bb0000', '#ffffff', '#0000ff'],
        });

        // Remover el canvas después de un tiempo
        setTimeout(() => {
            canvas.remove();
        }, 5000); // Eliminar el canvas después de 5 segundos
    }

    static ShootStarsAndSquares(container: HTMLElement | null = null) {
        if (!container) container = document.querySelector(DEFAULT_CLASS_CONTAINER) as HTMLElement;
        var defaults = {
            spread: 360,
            angle: 360,
            ticks: 250,
            gravity: 0.5,
            decay: 0.94,
            startVelocity: 5,
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'] //Amarillo por defecto
        };

        const shoot = () => {
            const canvas = GetCanvas(container);
            if (!canvas) return;
            // Agregar el canvas al contenedor
            container.appendChild(canvas);
            // Crear una instancia de confetti en el canvas
            const confettiInstance = GetConfettiInstance(canvas);
            const randomOrigin = {
                x: Math.random(),
                y: Math.random() - 0.2
            };
            const randomScalar = Math.random() * 1 + 0.5;
            confettiInstance({
                ...defaults,
                particleCount: 40,
                scalar: randomScalar,
                shapes: ['circle'],
                origin: randomOrigin,
                colors: ["#df01f8", "#00c8ff", "#df01f8", "#00c8ff", "#df01f8", "#00c8ff"]
            });
            confettiInstance({
                ...defaults,
                particleCount: 20,
                scalar: randomScalar,
                shapes: ['star'],
                origin: randomOrigin,
            });

            // Remover el canvas después de un tiempo
            setTimeout(() => {
                canvas.remove();
            }, 5000);
        };

        for (let i = 0; i < 5; i++) shoot();
    }
}

const GetCanvas = (container: HTMLElement | null = null) => {
    if (!container) return null;
    // Crear el canvas y ajustarlo al tamaño del contenedor
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = `${container.offsetWidth}px`;
    canvas.style.height = `${container.offsetHeight}px`;
    canvas.style.pointerEvents = 'none'; // Asegurarse de que el canvas no bloquee la interacción del usuario
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Asegurarse de que el canvas esté en la parte superior
    canvas.style.zIndex = '9999';

    return canvas;
};

const GetConfettiInstance = (canvas: HTMLCanvasElement) => {
    return confetti.create(canvas, { resize: true });
};

// Lanza el confeti
// setTimeout(() => Confetti.Fire(), 1000);

// Lanza estrellas
// setInterval(() => Confetti.ShootStarsAndSquares(), 1000);

