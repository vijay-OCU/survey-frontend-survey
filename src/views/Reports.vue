<template>
    <h1>Reports</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Surveyname"
            v-model="surveylist.title"
        />
        <v-text-field
            label="Summary"
            v-model="surveylist.summary"
        />
    </v-form>
</template>
<script>
import ReportsDataService from "../services/ReportsDataService";
export default {
  name: "reports-survey",
  props: ['id'],
  data() {
    return {
      user: {},
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveSurvey() {
      ReportsDataService.get(this.id)
        .then(response => {
          this.survey= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateSurvey() {
      var data = {
        surveyname: this.survey.surveyname,
        summary: this.survey.summary,
      };
      ReportsDataService.update(this.id,data)
        .then(response => {
          this.survey.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'surveys' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'surveys' });
    }
  },
    mounted() {
    this.retrieveSurvey();
  }
}

</script>
<style>

</style>