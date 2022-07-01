<template>
<v-row>
  <v-col  cols="8"
        sm="2">
      <span >{{ report.surveyname }}</span>
  </v-col>
  <v-col  cols="8"
        sm="2">
      <span> {{ report.summary }}</span>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateReport"/>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteReport"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    report: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteReport() {
      this.$emit("deleteReport");
    },
    updateReport() {
      this.$emit("updateReport");
    }
  }
};
</script>

<style></style>