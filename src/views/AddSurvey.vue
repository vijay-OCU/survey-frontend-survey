<template>
  <h1>Create Survey</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Survey Name" v-model="survey.name" class="shrink mx-4" />
    <v-btn color="info" @click="add()">Add Question</v-btn>
    <v-row>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-card class="pa-md-1 mx-sm-auto" color="purple" width="300px" v-if="this.questionsList.length == 0">
        <v-card-title>Note!</v-card-title>
        <v-card-text>Click Save on Each Question before Saving the Survey</v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row>
    <div v-if="addQuestion">
      <Questions v-for="(question, index) in questionsList" :key="index" :question="question"
        @deleteQuestion="deleteQuestion(question, index)" @addQuestion="saveQuestion(question, index)" />
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
import Questions from '../components/QuestionsDisplay.vue';

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
          var questionData = JSON.stringify(this.questionsList);
          console.log('created survey', questionData, 'ressp', response.data.surveyId);

          SurveyDataService.addQuestions(response.data.surveyId, questionData, this.accessToken)
            .then((questionResponse) => {
              console.log('Added Question');
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
        }).catch((e) => {
          this.message = e.response;
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
      // const questionIndex = this.questionsList.findIndex(x => x.id === this.selectedQuestion.id);
      const question = {
        id: this.selectedQuestion.id,
        text: '',
        type: 'EMPTY',
        options: [],
        scale: []
      }
      this.questionsList.push(JSON.parse(JSON.stringify(question)));
      console.log(JSON.stringify(this.questionsList), 'Adding Question');
      console.log("Added Empty question, Questions Length", this.questionsList.length);
      this.selectedQuestion.id = this.selectedQuestion.id + 1;
    },

    saveQuestion(question, index) {
      console.log(JSON.stringify(this.questionsList), 'Saving Question, with Index ->', index);
      const updatedQuestion = {
        id: question.id,
        question: question.text,
        type: question.type,
        options: [],
        scale: []
      }
      // const questionIndex = this.questionsList.findIndex(x => x.id === index);
      if (index >= 0) {
        this.questionsList.splice(index, 1, updatedQuestion);
      } else {
        // this.questionsList.push(JSON.parse(JSON.stringify(updatedQuestion)));
      }
      console.log("Saved Question:", index, "Questions Length", this.questionsList.length, JSON.stringify(this.questionsList));

    },

    editQuestion(question, index) {
      this.selectedQuestion = JSON.parse(JSON.stringify(question));
      this.selectedQuestion.questionNumber = index + 1;
    },
    deleteQuestion(question, index) {
      this.questionsList.splice(index, 1);
      console.log("Deleted Question with Index:", index, "Questions Length", this.questionsList.length);
    },
  }
};

</script>
<style>
</style>