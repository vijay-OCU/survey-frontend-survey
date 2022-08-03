<template>
    <TopBar v-if="this.accessToken" :showTabs="this.role == 'admin' ? 'true' : 'false'" :accessToken="this.accessToken"
        :role="this.role" :currentUserId="this.currentUserId" />
    <h1>{{ survey?.name }}</h1>
    <h1>{{ this.message }}</h1>
    <form id="submit-form" v-if="!this.message" :id="'submit-form'" @submit.prevent="getFormValues">
        <SurveyQuestions v-for="(question, index) in survey?.questions" :id="question.id" :question="question.question"
            :numbering="index + 1" :type="question.type" :options="question.options" :scales="question.scales"
            :form="form" />
        <div class="pa-5" v-bind:style="{ 'fontWeight': 'bold' }"> Please enter the data below and submit the survey!
        </div>
        <div style="margin: 15px 0;">
            <label>Participant Name</label><br />
            <input v-model="form['participantName']" placeholder="Enter name" />
        </div>
        <div style="margin-bottom: 15px;">
            <label>Participant Email</label><br />
            <input v-model="form['participantEmail']" placeholder="Enter Email" />
        </div>
        <v-btn v-if="!this.accessToken" variant="text" type="submit" color="blue" elevation="10" x-large justify-end>
            Submit Survey
        </v-btn>
        <v-btn v-if="this.accessToken" variant="text" @click="goBack()" type="button" color="blue" elevation="10"
            x-large justify-end>
            Cancel
        </v-btn>
        <div v-if="submitted">
            Successfully submitted the survey
        </div>
    </form>
</template>
<script>
import TopBar from './TopBar.vue';
import SurveyQuestions from '../components/SurveyQuestions.vue'
import SurveyDataService from '../services/SurveyDataService';

export default {
    name: "view-survey",
    props: ['accessToken', 'role', 'currentUserId', 'id', 'message'],
    data() {
        return {
            isSubmitted: false,
            survey: {},
            message: null,
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
                    if (response.data.length > 0)
                        this.survey = response.data[0];
                    else this.message = "No survey found"
                })
                .catch(e => {
                    console.log(e)
                    this.message = e.response.data.message;
                });
        },
        goBack() {
            this.$router.push({
                name: 'surveys', params: {
                    accessToken: this.accessToken,
                    role: this.role,
                    currentUserId: this.currentUserId
                }
            });
        },
        getFormValues() {
            const values = this.form
            let responses = [];
            for (let key in values?.responses) {
                if (key?.includes('checkbox-')) {
                    const questionId = key?.split("-")[1];
                    const choice = key?.split("-")[2];
                    const found = responses.find((res) => res.questionId == questionId)
                    if (found) {
                        found.choices.push(choice);
                        responses = responses.map((res) => {
                            let final = res;
                            if (res.questionId == questionId) {
                                final.choices = found.choices
                            }
                            return final;
                        })
                    } else {
                        responses.push({ questionId: Number(questionId), choices: [choice] })
                    }
                } else {
                    responses.push({ questionId: Number(key), choices: [values?.responses[key]] })
                }

            }

            const postbody = {
                participantName: values?.participantName,
                participantEmail: values?.participantEmail,
                responses
            }

            SurveyDataService.submit(this.id, postbody).then(() => {
                console.log("coming here")
                this.$router.push({
                    name: `submitted-survey`,
                    params: {
                        accessToken: this.accessToken,
                        role: this.role,
                        currentUserId: this.currentUserId,
                    },
                });
            }).catch((err) => {
                console.log(err)
            })
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