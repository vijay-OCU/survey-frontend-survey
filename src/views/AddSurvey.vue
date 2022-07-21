<template>
  <h1>Create Survey</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Survey Name" v-model="survey.name" class="shrink mx-4" />
    <v-btn color="info" @click="add()">Add Question</v-btn>
    <div v-if="addQuestion">
      <Questions v-for="(question, index) in questionsList" :key="index"
        @deleteQuestion="deleteQuestion(question, index)" />
    </div>

    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveSurvey()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
//import TopBarVue from './TopBar.vue';
import SurveyDataService from '../services/SurveyDataService';
import Questions from '../components/Questions.vue';

export default {
  name: 'add-survey',
  props: ['accessToken', 'role', 'currentUserId'],
  data() {
    return {
      selectedQuestion: { id: 0 },
      survey: {
        name: '',
      },
      questionsList: [],
      addQuestion: true,
      message: 'Enter data and click save',
    };
  },
  components: {
    Questions,
  },
  methods: {
    saveSurvey() {
      console.log(this.currentUserId, 'current User in Add Survey');
      console.log("token: " + this.accessToken);
      var data = {
        name: this.survey.name,
        userId: this.currentUserId,
        accessToken: this.accessToken
      };
      SurveyDataService.create(data)
        .then((response) => {

      SurveyDataService.addQuestions(questionsData).then((questionResponse) => {
          this.$router.push({
            name: 'surveys',
            params: {
              accessToken: this.accessToken,
              role: this.role,
              currentUserId: this.currentUserId
            }
          });
        })
        .catch((e) => {
          this.message = e.response;
        });
      });




    },
    cancel() {
      this.$router.push({
        name: 'surveys', params: {
          accessToken: this.accessToken,
          role: this.role,
          currentUserId: this.currentUserId
        }
      });
    },
    add() {
      console.log(JSON.stringify(this.questionsList), '::::::::::');

      const questionIndex = this.questionsList.findIndex(x => x.id === this.selectedQuestion.id);
      this.selectedQuestion.id = this.selectedQuestion.id + 1;
      const question = {
        id: this.selectedQuestion.id,
      }
      this.questionsList.push(JSON.parse(JSON.stringify(question)));
            console.log("Added Index:",questionIndex, "Questions Length", this.questionsList.length);

    },
    editQuestion(question, index) {
      this.selectedQuestion = JSON.parse(JSON.stringify(question));
      this.selectedQuestion.questionNumber = index + 1;
    },
    deleteQuestion(question, index) {
      this.questionsList.splice(index, 1);
            console.log("Deleted Index:",index, "Questions Length", this.questionsList.length);

    },
  }
};
</script>
<style>
</style>