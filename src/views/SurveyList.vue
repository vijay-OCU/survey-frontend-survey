<template>
  <TopBar showTabs=true :accessToken="this.accessToken" :role="this.role" :currentUserId="this.currentUserId" />
  <h1>Survey List</h1>
  <h4>{{ message }}</h4>
  <v-row>
    <v-col cols="12" sm="2">
      <v-btn color="success" @click="goAdd"> Create Survey</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="2">
      <span class="text-h6">Surveyname</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">View Survey</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">View Report</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Delete</span>
    </v-col>
  </v-row>
  <SurveyDisplay v-for="survey in surveys" :key="survey.id" :survey="survey"
            @viewSurvey="goViewSurvey(survey)"
            @viewReport="goViewReport(survey)"
            @deleteSurvey="goDelete(survey)"/>
  <v-btn @click="removeAllSurveys"> Remove All </v-btn>
</template>
<script>

import TopBar from './TopBar.vue';
import SurveyDataService from '../services/SurveyDataService';
import SurveyDisplay from '../components/SurveyDisplay.vue';

export default {
  name: 'surveys-list',
  props: ['accessToken', 'role', 'currentUserId'],
  data() {
    return {
      surveys: [],
      currentSurvey: null,
      currentIndex: -1,
      surveylist: '',
      message: 'Search, Edit or Delete Surveys',
    };
  },
  components: {
    SurveyDisplay, TopBar
  },
  methods: {
    goAdd() {
      console.log('current User in Survey List', this.role, this.accessToken, this.currentUserId );
      this.$router.push({ name: 'addSurvey', params: {
                  accessToken: this.accessToken,
                  role: this.role,
                  currentUserId: this.currentUserId,
                } });
    },
    goEdit(survey) {
      this.$router.push({ name: 'editSurvey', params: { id: survey.id } });
    },
    goView(survey) {
      this.$router.push({
        name: 'viewSurvey',
        params: { artistName: survey.name, artistId: survey.id },
      });
    },
    goDelete(survey) {
            var data = {
        accessToken: this.accessToken
      };
      SurveyDataService.delete(survey.id, data)
        .then(() => {
          this.retrieveSurveys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveSurveys() {
      var data = {
        accessToken: this.accessToken,
      };
      if(this.role == 'admin'){
      SurveyDataService.getAll(data)
        .then(response => {
          this.surveys = response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
      }
      else {
              SurveyDataService.getByUserId(this.currentUserId, data)
        .then(response => {
          this.surveys = response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
      }

    },
    refreshList() {
      this.retrieveSurveys();
      this.currentSurvey = null;
      this.currentIndex = -1;
    },
    setActiveSurvey(survey, index) {
      this.currentSurvey = survey;
      this.currentIndex = survey ? index : -1;
    },
    removeAllSurveys() {
      SurveyDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    searchName() {
      SurveyDataService.findByName(this.surveylist)
        .then((response) => {
          this.surveys = response.data;
          this.setActiveSurvey(null);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveSurveys();
  },
  watch: {
    $route() {
      this.retrieveSurveys();
    },
  },
};
</script>
<style>
</style>
