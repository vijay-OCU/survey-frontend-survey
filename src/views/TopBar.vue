<template>
    <v-toolbar color="#FCE4EC" dense elevation="4" class="shrink mx-4">
        <v-toolbar-items color="#0918DA">
            <v-btn variant="text" @click="goUsers" v-if="this.showTabs == 'true' ? true : false" color="blue"
                elevation="10" x-large justify-end>
                Users
            </v-btn>
            <v-btn variant="text" @click="goSurveys" v-if="this.showTabs == 'true' ? true : false" color="blue"
                elevation="10" x-large justify-end>
                Surveys
            </v-btn>
            <v-spacer />
            <v-btn class="text-right" v-if="this.accessToken" variant="text" @click="goLogin"
                color="blue" elevation="10" x-large justify-right>
                Log Out
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import logo from '../assets/oc-logo-white.png'
export default {
    name: 'TopBar',
    props: ['showTabs', 'accessToken', 'role', 'currentUserId'],
    data: () => ({
        logo,
    }),
    methods: {
        goUsers() {
            this.$router.push({
                name: 'users', params: {
                    accessToken: this.accessToken,
                    role: this.role,
                    currentUserId: this.currentUserId,
                }
            });
        },
        goSurveys() {
            this.$router.push({
                name: 'surveys', params: {
                    accessToken: this.accessToken,
                    role: this.role,
                    currentUserId: this.currentUserId,
                }
            });
        },
        goLogin() {
            this.$router.push({ name: "login" });
        }
    },
}
</script>