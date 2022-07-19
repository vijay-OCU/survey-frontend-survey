<template>
<v-row>
  <v-col  cols="12"
        sm="2">
      <span >{{ login.username }}</span>
  </v-col>
  <v-col  cols="12"
        sm="2">
      <span> {{ login.password }}</span>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateLogin"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-format-list-bulleted-type" @click="viewLogin"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteLogin"
      :disabled="user.tracks.length > 0 ? true : false"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    user: Object
  },
  data() {
    return {};
  },
  methods: {

    deleteLogin() {
      this.$emit("deleteLogin");
    },
    updateLogin() {
      this.$emit("updateLogin");
    },
    viewLogin() {
      this.$emit("viewLogin");
    }
  }
};
</script>

<style></style>
