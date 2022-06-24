<template>
<v-row>
  <v-col  cols="8"
        sm="2">
      <span >{{ track.title }}</span>
  </v-col>
  <v-col  cols="8"
        sm="2">
      <span> {{ track.length }}</span>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateTrack"/>
  </v-col>
  <v-col  cols="8"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteTrack"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    track: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteTrack() {
      this.$emit("deleteTrack");
    },
    updateTrack() {
      this.$emit("updateTrack");
    }
  }
};
</script>

<style></style>
