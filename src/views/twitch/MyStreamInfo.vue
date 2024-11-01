<template>
    <div class="container-for-obs">
        <!-- <AnimatedFrame /> -->
        <!-- <StarryOverlay /> -->

        <div class="confetti-container"></div>
        <!-- <FallingStars /> -->

        <section class="stream-info-container">
            <div class="stream-info">
                <Schedule />
            </div>

            <div class="stream-info">
                <div class="city align-center d-flex">
                    <span class="no-shadow-text text-h5 mr-5">🇦🇷</span>
                    Rafaela, Argentina
                    <span class="no-shadow-text text-h5 ml-5">🇦🇷</span>
                </div>
                <div class="time">{{ currentTime }}</div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import Schedule from "./Schedule.vue";
// import AnimatedFrame from "./components/AnimatedFrame.vue";
// import FallingStars from "./FallingStars.vue";
// import StarryOverlay from "./components/StarryOverlay.vue";
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
$shadow-size: 2px;
$space: 1px;
$neg-space: -$space;
$neon-glow: 0 0 5px #000000;
.stream-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 15px;
    animation: rotate-shadow 10s infinite linear;
    // box-shadow: $neg-space $neg-space $shadow-size #00c8ff, $space $space $shadow-size #df01f8;
    margin: 0px;

    color: #00c8ff;
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: $neon-glow, $neon-glow, $neon-glow;
    font-weight: bold;
    background-color: #000000c0;
}
.container-for-obs {
    width: 2560px;
    height: 1440px;
    position: relative;
    // box-shadow: inset 0 0 10px #00c8ff;
    // animation: rotate-shadow-inset 10s infinite linear;
    overflow: hidden;
}
.stream-info-container {
    position: absolute;
    bottom: 400px;
    right: 0;
    width: 600px;
    // height: ;
}
.confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>
