<template>
<v-row>
  <v-col  cols="12"
        sm="2">
      <span >{{ album.title }}</span>
  </v-col>
  <v-col  cols="12"
        sm="2">
      <span> {{ album.language }}</span>
  </v-col>
  <v-col  cols="12"
        sm="2">
      <span> {{ album.genre }}</span>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateAlbum"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-format-list-bulleted-type" @click="viewAlbum"/>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteAlbum"
      :disabled="album.tracks.length > 0 ? true : false"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    album: Object
  },
  data() {
    return {};
  },
  methods: {

    deleteAlbum() {
      this.$emit("deleteAlbum");
    },
    updateAlbum() {
      this.$emit("updateAlbum");
    },
    viewAlbum() {
      this.$emit("viewAlbum");
    }
  }
};
</script>

<style></style>
