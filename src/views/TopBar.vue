<template>
    <v-toolbar-items color="#0918DA">
        <v-btn variant="text" @click="goUsers" v-if="this.showTabs == 'true' ? true : false" color="blue" elevation="10"
            x-large justify-end>
            Users
        </v-btn>
        <v-btn variant="text" @click="goSurveys" v-if="this.showTabs == 'true' ? true : false" color="blue"
            elevation="10" x-large justify-end>
            Surveys
        </v-btn>
    </v-toolbar-items>
</template>

<script>
import logo from '../assets/oc-logo-white.png'
export default {
    name: 'TopBar',
    props: ['showTabs', 'accessToken', 'role', 'currentUser'],
    data: () => ({
        logo,
    }),
    methods: {
        goUsers() {
            console.log('access Token:::', this.accessToken);
                        console.log('Role :::', this.role);

            this.$router.push({
                name: 'users', params: {
                    accessToken: this.accessToken,
                    role: this.role,
                    currentUser: this.username,
                }
            });
        },
        goSurveys() {
            this.$router.push({
                name: 'surveys', params: {
                    accessToken: this.accessToken,
                    role: this.role,
                    currentUser: this.username,
                }
            });
        }
    },
}
</script>

