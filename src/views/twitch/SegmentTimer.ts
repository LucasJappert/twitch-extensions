import bellSound from "@/assets/sounds/bell.mp3";
import Confetti from "../../plugins/Confetti";

const BELL_SOUND = new Audio(bellSound);

export default class SegmentTimer {
    private endTimes: Array<Date>;
    private nextBellDate: Date | null = null;
    private currentSegmentIndex: number = 0;
    private segmentTimerInterval: ReturnType<typeof setInterval> | null = null;

    constructor(endTimes: Array<Date>) {
        endTimes.sort((a, b) => a.getTime() - b.getTime());
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
            return;
        }

        this.nextBellDate = null; // No hay más segmentos
        this.stopTimer(); // Detener el timer si no hay más segmentos
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

        for (let i = 0; i < 10; i++) setTimeout(() => {
            if (i < 2) BELL_SOUND.play();
            Confetti.ShootStarsAndSquares();
        }, i * 3000);
    }
}
