import bellSound from "@/assets/sounds/bell.mp3";
import Confetti from "../../plugins/Confetti";

const BELL_SOUND = new Audio(bellSound);

export default class SegmentTimer {
    private endTimes: Array<Date>;
    private nextBellDate: Date | null = null;
    private currentSegmentIndex: number = 0;
    private segmentTimerInterval: ReturnType<typeof setInterval> | null = null;

    constructor(endTimes: Array<Date>) {
        this.endTimes = endTimes;
        if (endTimes.length === 0) return;

        // No consideramos los segmentos que ya pasaron
        this.endTimes = endTimes.filter(endTime => endTime > new Date());
        this.updateNextBellDate();
        this.startTimer();
    }

    // Método para actualizar la fecha del siguiente segmento
    private updateNextBellDate() {
        if (this.currentSegmentIndex < this.endTimes.length) {
            this.nextBellDate = this.endTimes[this.currentSegmentIndex];
            this.currentSegmentIndex++;
        } else {
            this.nextBellDate = null; // No hay más segmentos
            this.stopTimer(); // Detener el timer si no hay más segmentos
        }
    }

    // Método para iniciar el temporizador
    private startTimer() {
        this.segmentTimerInterval = setInterval(() => this.checkSegmentTime(), 1000);
    }

    // Método para detener el temporizador
    public stopTimer() {
        if (this.segmentTimerInterval) {
            clearInterval(this.segmentTimerInterval);
            this.segmentTimerInterval = null;
        }
    }

    // Método para verificar el tiempo del segmento
    private checkSegmentTime() {
        const currentTime = new Date();
        if (this.nextBellDate && currentTime >= this.nextBellDate) {
            this.playBellSound();
            this.updateNextBellDate();
        }
    }

    // Método para reproducir el sonido de la campana
    private playBellSound() {
        //console.log('Ding!');
        for (let i = 0; i < 5; i++) setTimeout(() => BELL_SOUND.play(), i * 3000);

        for (let i = 0; i < 15; i++) setTimeout(() => Confetti.ShootStarsAndSquares(), i * 1000);
    }
}



// confetti({
//     particleCount: 100,
//     spread: 70,
//     origin: { y: 0.6 }
// });

// var duration = 15 * 1000;
// var animationEnd = Date.now() + duration;
// var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
// function randomInRange(min: number, max: number) {
//     return Math.random() * (max - min) + min;
// }

// var interval = setInterval(function () {
//     var timeLeft = animationEnd - Date.now();

//     if (timeLeft <= 0) {
//         return clearInterval(interval);
//     }

//     var particleCount = 50 * (timeLeft / duration);
//     // since particles fall down, start a bit higher than random
//     confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
//     confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
// }, 250);
