const DEFAULT_CLASS_CONTAINER = '.confetti-container';
import confetti from 'canvas-confetti';

export default class Confetti {
    // Método para lanzar confeti estándar
    static Fire(container: HTMLElement | null = null) {
        const canvas = this.setupCanvas(container);
        if (!canvas) return;

        const confettiInstance = GetConfettiInstance(canvas);

        // Configurar y lanzar el confeti
        confettiInstance({
            particleCount: 100,
            spread: 360,
            angle: 90,
            origin: { y: 0.5 },
            colors: ['#bb0000', '#ffffff', '#0000ff'],
        });

        this.cleanupCanvas(canvas, 5000);
    }

    // Método para lanzar estrellas y círculos
    static ShootStarsAndSquares(container: HTMLElement | null = null) {
        const canvas = this.setupCanvas(container);
        if (!canvas) return;

        const confettiInstance = GetConfettiInstance(canvas);
        const defaults = {
            spread: 360,
            angle: 360,
            ticks: 250,
            gravity: 0.5,
            decay: 0.94,
            startVelocity: 10,
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
        };

        const randomOrigin = {
            x: Math.random(),
            y: Math.random() - 0.2
        };
        const randomScalar = Math.random() * 0.5 + 0.5;

        // Disparar círculos y estrellas
        this.launchConfetti(confettiInstance, defaults, randomOrigin, randomScalar, 'circle', 20);
        this.launchConfetti(confettiInstance, defaults, randomOrigin, randomScalar, 'star', 10);

        this.cleanupCanvas(canvas, 5000);
    }

    // Configuración del canvas
    private static setupCanvas(container: HTMLElement | null = null): HTMLCanvasElement | null {
        container = container || document.querySelector(DEFAULT_CLASS_CONTAINER) as HTMLElement;
        if (!container) return null;

        const canvas = GetCanvas(container);
        container.appendChild(canvas);
        return canvas;
    }

    // Método reutilizable para lanzar confeti con diferentes configuraciones
    private static launchConfetti(
        instance: (options: any) => void,
        defaults: any,
        origin: { x: number; y: number; },
        scalar: number,
        shape: string,
        particleCount: number
    ) {
        instance({
            ...defaults,
            particleCount,
            scalar,
            shapes: [shape],
            origin,
        });
    }

    // Limpiar el canvas después de un tiempo
    private static cleanupCanvas(canvas: HTMLCanvasElement, timeout: number) {
        setTimeout(() => {
            canvas.remove();
        }, timeout);
    }
}

// Función para obtener un canvas adaptado al tamaño del contenedor
const GetCanvas = (container: HTMLElement): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.zIndex = '9999';
    return canvas;
};

// Función para crear una instancia de confetti en el canvas
const GetConfettiInstance = (canvas: HTMLCanvasElement) => {
    return confetti.create(canvas, { resize: true });
};

// Lanza estrellas
// setInterval(() => Confetti.ShootStarsAndSquares(), 1000);
