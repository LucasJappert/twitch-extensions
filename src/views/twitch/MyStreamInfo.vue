<template>
    <section>
        <div class="stream-info">
            <div class="city">🇦🇷 Rafaela, Argentina</div>
            <div class="time">{{ currentTime }}</div>
        </div>

        <div class="stream-info">
            <ProgressWork />
        </div>
    </section>
</template>

<script setup lang="ts">
import ProgressWork from "./ProgressWork.vue";
import { ref, onMounted } from "vue";

// Reactive variable to hold the current time
const currentTime = ref("");

// Function to update the time every second
const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

onMounted(() => {
    updateTime();
    setInterval(updateTime, 1000); // Update the time every second
});

// Export the component
</script>

<style scoped lang="scss">
$neon-glow: 0 0 30px #00c8ff;
.stream-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 15px;
    animation: rotate-shadow 10s infinite linear;
    margin: 40px;

    color: #000000;
    font-size: 2.8rem;
    margin-bottom: 10px;
    text-shadow: $neon-glow, $neon-glow, $neon-glow;
    font-weight: bold;
}

// .city {
//     color: #000000;
//     font-size: 2rem;
//     margin-bottom: 10px;
//     text-shadow: 0 0 20px #00ffffb3, 0 0 20px #00ffffb3, 0 0 20px #00ffffb3;
//     font-weight: bold;
// }

// .time {
//     color: #000000;
//     font-size: 2rem;
//     text-shadow: 0 0 10px #00ffffb3;
//     font-weight: bold;
//     // text-shadow: 0 0 15px #df01f8, 0 0 15px #df01f8, 0 0 15px #df01f8;
//     text-shadow: 0 0 20px #00ffffb3, 0 0 20px #00ffffb3, 0 0 20px #00ffffb3;
// }
</style>
