<template>
    <v-app>
        <v-app-bar color="#FCE4EC" dense elevation="1" flat outlined prominent rounded>
            <v-img class="mx-2" :src="logo" max-height="40" max-width="40" contain></v-img>
            <v-app-bar-title>Survey World</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items color="green">
                <v-btn variant="text" @click="goUsers" v-if="this.showTabs == 'true' ? true : false">
                    Users
                </v-btn>
                <v-btn variant="text" @click="goSurveys" v-if="this.showTabs == 'true' ? true : false">
                    Surveys
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
    </v-app>
</template>

<script>
import logo from '../assets/oc-logo-white.png'
export default {
    name: 'TopBar',
    props: ['showTabs'],
    data: () => ({
        logo,
    }),
    methods: {
        goUsers() {
            this.$router.push({ name: 'users' });
        },
        goSurveys() {
            this.$router.push({ name: 'surveys' });
        }
    },
}
</script>

