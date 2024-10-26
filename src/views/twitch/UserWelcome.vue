<template>
    <!-- Modal de bienvenida -->
    <v-dialog v-model="welcomeDialog" persistent max-width="800" class="pa-4 user-welcome-container">
        <v-card class="pa-4 text-center">
            <div class="text-h3">Bienvenido</div>
            <div>¡Haz clic en el botón para comenzar.</div>
            <v-card-actions class="d-flex justify-center">
                <v-btn tonal color="primary" @click="startExperience" size="lg">Comenzar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            welcomeDialog: true,
        };
    },
    methods: {
        startExperience() {
            this.welcomeDialog = false;
        },
    },
};
</script>

<style scoped lang="scss">
.user-welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
</style>
