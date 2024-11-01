<template>
    <div class="schedule-container">
        <user-welcome />
        <div
            v-for="segment in segments"
            :key="segment.title"
            class="segment"
            :style="segment"
            :class="{
                'completed-segment': isCompletedSegment(segment),
                'current-segment': isCurrentSegment(segment),
            }"
        >
            <!-- Barra de progreso solo si es el segmento actual -->
            <div v-if="isCurrentSegment(segment)" class="progress" :style="progressStyle(segment)"></div>
            <span class="segment-title d-flex align-center justify-space-between w-100 px-4">
                <div>{{ GetHHMM(segment.startTime) }}</div>
                <div>
                    <span class="no-shadow-text">{{ segment.icon }}</span> {{ segment.title.toUpperCase() }}
                    <span class="no-shadow-text">{{ segment.icon }}</span>
                </div>
                <div>{{ GetHHMM(segment.endTime) }}</div>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onBeforeUnmount, CSSProperties, onMounted } from "vue";
import SegmentTimer from "./SegmentTimer";
import UserWelcome from "./UserWelcome.vue";

const GetSegmentTime = (timeInHHMMSS: string) => {
    const now = new Date();
    const splitedTime = timeInHHMMSS.split(":");
    if (splitedTime.length === 1) splitedTime.push("00", "00");
    if (splitedTime.length === 2) splitedTime.push("00");
    const [hours, minutes, seconds] = splitedTime;
    now.setHours(Number(hours));
    now.setMinutes(Number(minutes));
    now.setSeconds(Number(seconds));
    return now;
};

class Title {
    icon: string;
    title: string;
    constructor(icon: string, title: string) {
        this.icon = icon;
        this.title = title;
    }
}
const TitleEnum = {
    WORK: new Title("👨‍💻", "Deep-Work"),
    DAILY: new Title("📅", "Daily"),
    BREAK: new Title("☕", "Break"),
    LAUNCH: new Title("🍔", "Launch"),
};

export default {
    components: { UserWelcome },
    name: "ProgressWork",
    setup() {
        interface Segment {
            icon: string;
            title: string;
            startTime: Date;
            endTime: Date;
        }

        // Estado y variables
        const currentProgress = ref<number>(0);
        let intervalId: number | null = null;

        // const isWeekend = () => {
        //     const now = new Date();
        //     const day = now.getDay();
        //     return day === 0 || day === 6;
        // };
        const timeIntervals = ref<string[]>(["6:00", "8:00", "8:15", "10:00", "10:15", "12:00", "22:22:10", "23:00"]);
        // const timeIntervals = ref<string[]>(["6", "12", "19:21:55", "20", "23"]);
        const titles = ref<Title[]>([TitleEnum.WORK, TitleEnum.DAILY, TitleEnum.WORK, TitleEnum.BREAK, TitleEnum.WORK, TitleEnum.LAUNCH, TitleEnum.WORK]);
        const segments = ref<Segment[]>([]);
        for (let i = 0; i < timeIntervals.value.length - 1; i++) {
            if (i > timeIntervals.value.length - 1) continue;

            const startTime = GetSegmentTime(timeIntervals.value[i]);
            const endTime = GetSegmentTime(timeIntervals.value[i + 1]);
            segments.value.push({ icon: titles.value[i].icon, title: titles.value[i].title, startTime, endTime });
        }
        segments.value.reverse();

        // Métodos
        const GetHHMM = (date: Date) => {
            return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
        };
        const startTimeline = () => {
            intervalId = setInterval(updateProgress, 1000) as unknown as number;
        };

        const updateProgress = () => {
            const now = new Date();
            currentProgress.value = calculateMinutes(now);
        };

        // Función para comparar si un segmento ya ha terminado
        const isCompletedSegment = (segment: Segment) => {
            const now = new Date();
            const currentTime = calculateMinutes(now);
            const segmentEndTime = calculateMinutes(segment.endTime);
            return currentTime >= segmentEndTime; // Si el tiempo actual es mayor o igual al final del segmento
        };

        const calculateMinutes = (time: Date) => {
            return time.getHours() * 60 + time.getMinutes();
            // const [hours, minutes] = time.split(":").map(Number);
            // return hours * 60 + minutes;
        };

        const isCurrentSegment = (segment: Segment): boolean => {
            const currentTime = currentProgress.value;
            const segmentStart = calculateMinutes(segment.startTime);
            const segmentEnd = calculateMinutes(segment.endTime);

            const isCurrent = currentTime >= segmentStart && currentTime <= segmentEnd;

            if (isCurrent) return true;

            return false;
        };

        const currentSegmentProgress = (segment: Segment): number => {
            const currentTime = currentProgress.value;
            const segmentStart = calculateMinutes(segment.startTime);
            const segmentEnd = calculateMinutes(segment.endTime);
            const segmentDuration = segmentEnd - segmentStart;

            const progress = ((currentTime - segmentStart) / segmentDuration) * 100;

            return progress;
        };

        const progressStyle = (segment: Segment): CSSProperties => {
            return {
                width: `${currentSegmentProgress(segment)}%`,
            };
        };

        let segmentTimer: SegmentTimer | null = null;
        onMounted(() => {
            segmentTimer = new SegmentTimer(segments.value.map((segment) => segment.endTime));
            startTimeline();
        });

        // Limpiar el intervalo al desmontar
        onBeforeUnmount(() => {
            if (segmentTimer) segmentTimer.stopTimer();

            if (intervalId !== null) clearInterval(intervalId);
        });

        return {
            segments,
            isCompletedSegment,
            isCurrentSegment,
            progressStyle,
            GetHHMM,
        };
    },
};
</script>

<style lang="scss"></style>

<style scoped lang="scss">
.schedule-container {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    position: relative;
}

.range-container {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 0px;
}

$neon-glow1: 0 0 3px #ffffff;
.range {
    position: absolute;
    color: #ffffff;
    text-shadow: $neon-glow1, $neon-glow1, $neon-glow1;
    // text-shadow: $neon-glow, $neon-glow, $neon-glow, $neon-glow;
    // text-shadow: $black-shadow, $black-shadow, $black-shadow, $black-shadow;
    // transform: ;
    margin-top: 3px;
    width: 40px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    font-weight: bold;
}
.range-from {
    left: 0;
}
.range-to {
    right: 0;
}

$white-shadow: 0 0 5px #ffffff;
$neon-glow: 0 0 5px #000000;
$black-shadow: 0 0 10px #000;
.segment {
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #fff;
    margin: 10px 0; // Añadimos un margen más grande para separar los segmentos
    text-shadow: $neon-glow, $neon-glow, $neon-glow;
    // box-shadow: 2px 2px 2px 0px #ae01f8, -2px -2px 2px 0px #00c8ff;
    box-shadow: $white-shadow;

    overflow: visible;
    flex-direction: column;
    min-height: 20px;
    height: 40px;
    background-color: #0000008a;
}
.segment-title {
    position: relative;
    z-index: 1;
    font-size: 1.4rem;
    font-weight: bold;
    color: #eeeeee;
    text-shadow: $neon-glow, $neon-glow;
}

.completed-segment {
    color: #000;
    text-shadow: $neon-glow, $neon-glow, $neon-glow;
    background: #18cafb2a;
    background-size: 200% 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #00c8ff, 0 0 5px #00c8ff;
}
.current-segment {
    background: #00000040;
    box-shadow: 1px 1px 5px #ae01f8, -1px -1px 5px #00c8ff;
    background: linear-gradient(45deg, #000000c0, #000000c0 35%, #000000 45%, #000000c0 75%);
    background-size: 200% 100%;
    animation: slideBackground 3s linear infinite;

    .segment-title {
        color: #00c8ff;
        text-shadow: $black-shadow, $black-shadow, $black-shadow, $black-shadow;
    }
}
.progress {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: width 1s ease;
    background: linear-gradient(45deg, #006480, #006480 35%, #00afe0 45%, #006480 75%);
    background-size: 200% 100%;
    animation: slideBackground 3s linear infinite;
    overflow: hidden;
    z-index: 0;
    border-radius: 10px;
}

@keyframes slideBackground {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 200% 50%;
    }
}
</style>
