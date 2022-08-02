<template>
 <TopBar v-if="this.accessToken" :showTabs="this.role == 'admin' ? 'true' : 'false'" :accessToken="this.accessToken"
        :role="this.role" :currentUserId="this.currentUserId" />
    <h2 style="text-align: center;margin-top: 50px;">
        You have successfully submitted the survey!
    </h2>
</template>
<script>
import TopBar from './TopBar.vue';
export default {
    name: "submitted-survey",
    props: ['accessToken', 'role', 'currentUserId'],
    data() {
        return {
        }
    },
    components: {
        TopBar,
    },
}
</script>