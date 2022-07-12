<template>
  <v-row>
    <v-col cols="12" sm="2">
      <span>{{ survey.name }}</span>
    </v-col>
    <v-col cols="12" sm="2">
      <v-btn
        size="x-small"
        icon="mdi-format-list-bulleted-type"
        @click="viewSurvey"
      />
    </v-col>
    <v-col cols="12" sm="2">
      <v-btn
        size="x-small"
        icon="mdi-trash-can"
        @click="deleteSurvey"
        
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    survey: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteSurvey() {
      this.$emit('deleteSurvey');
    },
    updateSurvey() {
      this.$emit('updateSurvey');
    },
    viewSurvey() {
      this.$emit('viewSurvey');
    },
  },
};
</script>

<style></style>