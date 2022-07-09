<template>
  <h1>Survey List</h1>
  <h4>{{ message }}</h4>

  <v-row>
    <v-col cols="12" sm="2">
      <v-btn color="success" @click="goAdd"> Ceate Survey</v-btn>
    </v-col>
    <v-col col="12" sm="8">
      <v-text-field density="compact" clearable v-model="surveylist" />
    </v-col>
    <v-col cols="12" sm="1">
      <v-btn color="success" @click="searchName"> Search </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="2">
      <span class="text-h6">Surveyname</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">View</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Report</span>
    </v-col>
  </v-row>
  <SurveyDisplay
    v-for="survey in surveys"
    :key="survey.id"
    :survey="survey"
    @deleteSurvey="goDelete(survey)"
    @updateSurvey="goEdit(survey)"
    @viewSurvey="goView(survey)"
  />

  <v-btn @click="removeAllSurveys"> Remove All </v-btn>
</template>
<script>
import SurveyDataService from '../services/SurveyDataService';
import SurveyDisplay from '@/components/SurveyDisplay.vue';

export default {
  name: 'surveys-list',
  data() {
    return {
      surveys: [],
      currentSurvey: null,
      currentIndex: -1,
      title: '',
      message: 'Search, Edit or Delete Surveys',
    };
  },
  components: {
    SurveyDisplay,
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'addSurvey' });
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
      SurveyDataService.delete(survey.id)
        .then(() => {
          this.retrieveSurveys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveSurveys() {
      SurveyDataService.getAll()
        .then(response => {
          this.surveys = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
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
      SurveyDataService.findByName(this.title)
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
    //this.retrieveSurveys();
  },
};
</script>
<style></style>
