<template>
  <h1>User Add</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Username" v-model="user.username" />
    <v-text-field label="Email-id" v-model="user.emailid" />
    <v-select
      :items="surveys"
      item-text="name"
      item-value="id"
      label="password"
      solo
      v-model="user.survey"
    ></v-select>
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveUser()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import UserDataService from '../services/UserDataService';
import SurveyDataService from '../services/SurveyDataService';
export default {
  name: 'add-user',
  data() {
    return {
      //surveys: this.retrieveSurveys.response.data,
      surveys: [],
      user: {
        id: null,
        usernamr: '',
        emailid: '',
      },
      message: 'Enter data and click save',
    };
  },
  methods: {
    retrieveSurveys() {
      SurveyDataService.getAll()
        .then((response) => {
          this.surveysData = response.data;
          let surveys = [];
          response.data.forEach((survey) => {
            surveys.push(survey.name);
          });
          this.surveys = surveys;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    saveUser() {
      var data = {
        usernamr: this.user.usernamr,
        emailid: this.user.email-id,
        survey: this.surveysData.filter(
          (survey) => survey.name === this.user.survey
        )[0].id,
      };
      UserDataService.create(data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log('add ' + response.data);
          this.$router.push({ name: 'users' });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'users' });
    },
  },
  mounted() {
    this.retrieveSurveys();
  },
};
</script>
<style></style>
