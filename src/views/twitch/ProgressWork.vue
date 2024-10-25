<template>
    <div class="timeline-container">
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
            <span class="segment-title">{{ segment.title }}</span>

            <!-- Textos para rango desde/hasta -->
            <div class="range-container">
                <span class="range-from range">{{ segment.startTime }}</span>
                <span class="range-to range">{{ segment.endTime }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onBeforeUnmount, CSSProperties, onMounted } from "vue";

export default {
    name: "ProgressWork",
    setup() {
        interface Segment {
            title: string;
            startTime: string;
            endTime: string;
        }

        // Estado y variables
        const currentProgress = ref<number>(0);
        let intervalId: number | null = null;

        // const segments = ref<Segment[]>([{ title: "Work", startTime: "20:00", endTime: "21:00" }]);
        const segments = ref<Segment[]>([
            { title: "Work", startTime: "06:00", endTime: "08:00" },
            { title: "Daily", startTime: "08:00", endTime: "08:15" },
            { title: "Work", startTime: "08:15", endTime: "10:00" },
            { title: "Mini-break", startTime: "10:00", endTime: "10:15" },
            { title: "Work", startTime: "10:15", endTime: "12:00" },
            { title: "Launch", startTime: "12:00", endTime: "13:00" },
            // { title: "Nap", startTime: "12:45", endTime: "13:00" },
            { title: "Work", startTime: "13:00", endTime: "15:00" },

            // { title: "Nap", startTime: "14:00", endTime: "14:15" },
            // { title: "Work", startTime: "14:15", endTime: "16:00" },
            // { title: "Random time", startTime: "16:00", endTime: "23:00" },
            // { title: "Random time", startTime: "23:00", endTime: "24:00" },
        ]);

        // Métodos
        const startTimeline = () => {
            intervalId = setInterval(updateProgress, 1000) as unknown as number;
        };

        const updateProgress = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
            currentProgress.value = calculateMinutes(currentTime);
        };

        // Función para comparar si un segmento ya ha terminado
        const isCompletedSegment = (segment: Segment) => {
            const now = new Date();
            const currentTime = calculateMinutes(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
            const segmentEndTime = calculateMinutes(segment.endTime);
            return currentTime >= segmentEndTime; // Si el tiempo actual es mayor o igual al final del segmento
        };

        const calculateMinutes = (time: string): number => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
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

        onMounted(() => {
            startTimeline();
        });

        // Limpiar el intervalo al desmontar
        onBeforeUnmount(() => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        });

        return {
            segments,
            isCompletedSegment,
            isCurrentSegment,
            progressStyle,
        };
    },
};
</script>

<style lang="scss"></style>

<style scoped lang="scss">
.timeline-container {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
}

$neon-glow: 0 0 10px #00c8ff;
$black-shadow: 0 0 10px #000;
.segment {
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #fff;
    margin: 7px 0; // Añadimos un margen más grande para separar los segmentos
    text-shadow: $neon-glow, $neon-glow, $neon-glow;
    box-shadow: 2px 2px 2px 0px #ae01f8, -2px -2px 2px 0px #00c8ff;
    overflow: visible;
    flex-direction: column;
    min-height: 55px;
    height: 40px;
    background-color: #0000008a;
}

.range-container {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 0px;
}

$neon-glow1: 0 0 10px #00c8ff;
.range {
    position: absolute;
    color: #000;
    text-shadow: $neon-glow1, $neon-glow1, $neon-glow1;
    // text-shadow: $neon-glow, $neon-glow, $neon-glow, $neon-glow;
    // text-shadow: $black-shadow, $black-shadow, $black-shadow, $black-shadow;
    font-size: 1.2rem;
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

.segment-title {
    position: relative;
    z-index: 1;
    font-size: 1.8rem;
    font-weight: bold;
    color: #000;
    text-shadow: $neon-glow, $neon-glow, $neon-glow;
}

.completed-segment {
    color: #000;
    text-shadow: $neon-glow, $neon-glow, $neon-glow;
    background: #00648030;
    background-size: 200% 100%;
    border-radius: 10px;
}
.current-segment {
    background: #00c8ff40;
    box-shadow: 3px 3px 5px 0px #ae01f8, -3px -3px 5px 0px #00c8ff, 3px 3px 5px 0px #ae01f8, -3px -3px 5px 0px #00c8ff;

    .segment-title {
        color: #00c8ff;
        text-shadow: $black-shadow, $black-shadow, $black-shadow, $black-shadow;
        font-size: 1.8rem;
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
