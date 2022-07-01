<template>
  <v-row>
    <v-col cols="12" sm="2">
      <span>{{ survey.name }}</span>
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateSurvey" />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-format-list-bulleted-type"
        @click="viewSurvey"
      />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-trash-can"
        @click="deleteSurvey"
        :disabled="survey.surveys.length > 0 ? true : false"
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
