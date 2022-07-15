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
        icon="mdi-format-list-bulleted-type"
        @click="viewReport"
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
    viewSurvey() {
      this.$emit('viewSurvey');
    },
    viewReport() {
      this.$emit('viewReport');
    },
    deleteSurvey() {
      this.$emit('deleteSurvey');
    }
  },
};
</script>
<style>
</style>