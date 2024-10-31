<template>
    <v-btn tonal color="default" @click="startExperience" size="small" class="start-button">Start</v-btn>
</template>

<script>
export default {
    methods: {
        startExperience() {
            const startButton = document.querySelector(".start-button");
            startButton.remove();
        },
    },
};
</script>

<style scoped lang="scss">
.start-button {
    position: fixed;
    top: 0;
    left: 0;
}
</style>
