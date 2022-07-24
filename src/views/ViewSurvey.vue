<template>
    <TopBar :showTabs="this.role == 'admin' ? 'true' : 'false'" :accessToken="this.accessToken" :role="this.role"
        :currentUserId="this.currentUserId" />
    <h1>{{ survey?.name }}</h1>
    <form id="submit-form" @submit.prevent="getFormValues">
        <SurveyQuestions v-for="(question, index) in survey?.questions" :id="question.id" :question="question.question"
            :numbering="index + 1" :type="question.type" :options="question.options" :scales="question.scales" :form="form" />
        <div style="margin: 15px 0;">
            <label>Participant Name</label><br/>
            <input v-model="form['participantName']" placeholder="Enter name"/>
        </div>
        <div style="margin-bottom: 15px;">
            <label>Participant Email</label><br/>
            <input v-model="form['participantEmail']" placeholder="Enter Email"/>
        </div>
        <v-btn variant="text" type="submit" color="blue" elevation="10"
                x-large justify-end>
            Submit Survey
        </v-btn>
    </form>
</template>
<script>
import TopBar from './TopBar.vue';
import SurveyQuestions from '../components/SurveyQuestions.vue'
import SurveyDataService from '../services/SurveyDataService';

export default {
    name: "view-survey",
    props: ['accessToken', 'role', 'currentUserId', 'id'],
    data() {
        return {
            survey: {},
            form: {
                participantName: "",
                participantEmail: "",
                responses: {}
            }
        }
    },
    components: {
        TopBar,
        SurveyQuestions
    },
    methods: {
        retrieveSurvey() {
            const data = {}
            SurveyDataService.get(this.id, data)
                .then(response => {
                    this.survey = response.data[0];
                })
                .catch(e => {
                    this.message = e.response.data.message;
                });
        },
        getFormValues() {

          console.log(JSON.parse(JSON.stringify(this.form)))
        }
    },
    mounted() {
        this.retrieveSurvey();
    },
    watch: {
        $route() {
            this.retrieveSurvey();
        },
    },
}
</script>