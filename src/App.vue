<script lang="ts">
export default {
    name: "App",
    mounted() {},
};
</script>

<template>
    <div class="content dark-theme">
        <router-view></router-view>
    </div>
</template>

<style scoped></style>

<style lang="scss">
@import "@/views/styles/my-styles.scss";
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap");

body {
    font-family: "Source Code Pro", monospace;
}
</style>
