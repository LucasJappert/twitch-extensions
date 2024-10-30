<template>
    <div class="container-for-obs">
        <FallingStars />

        <section class="stream-info-container">
            <div class="stream-info">
                <Schedule />
            </div>

            <div class="stream-info">
                <div class="city align-center d-flex">
                    <span class="no-shadow-text text-h2 mr-5">🇦🇷</span>
                    Rafaela, Argentina
                    <span class="no-shadow-text text-h2 ml-5">🇦🇷</span>
                </div>
                <div class="time">{{ currentTime }}</div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import Schedule from "./Schedule.vue";
import FallingStars from "./FallingStars.vue";
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
$neon-glow: 0 0 10px #000000;
.stream-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 15px;
    animation: rotate-shadow 10s infinite linear;
    margin: 10px;

    color: #00c8ff;
    font-size: 2rem;
    margin-bottom: 10px;
    text-shadow: $neon-glow, $neon-glow, $neon-glow;
    font-weight: bold;
    background-color: #000000c0;
}
.container-for-obs {
    width: 1280px;
    height: 720px;
    position: relative;
    // box-shadow: inset 0 0 10px #00c8ff;
    animation: rotate-shadow-inset 10s infinite linear;
}
.stream-info-container {
    position: absolute;
    bottom: 200px;
    right: 0;
    width: 335px;
    // height: ;
}
</style>
