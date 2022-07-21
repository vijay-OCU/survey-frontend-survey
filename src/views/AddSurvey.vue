<template>
  <h1>Create Survey</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Survey Name" v-model="survey.name" class="shrink mx-4"/>
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
export default {
  name: 'add-survey',
  props: ['accessToken', 'role', 'currentUserId'],
  data() {
    return {
      survey: {
        name: '',
      },
      message: 'Enter data and click save',
    };
  },
  components:{
    //TopBarVue
  },
  methods: {
    saveSurvey() {
      console.log(this.currentUserId, 'current User in Add Survey');
      console.log("token: "+this.accessToken);
      var data = {
        name: this.survey.name,
        userId: this.currentUserId,
        accessToken: this.accessToken
      };
      SurveyDataService.create(data)
        .then((response) => {
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
  } 
};
</script>
<style></style>