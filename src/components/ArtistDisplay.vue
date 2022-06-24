<template>
  <v-row>
    <v-col cols="12" sm="2">
      <span>{{ artist.name }}</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span> {{ artist.gender }}</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span> {{ artist.location }}</span>
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateArtist" />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-format-list-bulleted-type"
        @click="viewArtist"
      />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-trash-can"
        @click="deleteArtist"
        :disabled="artist.albums.length > 0 ? true : false"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    artist: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteArtist() {
      this.$emit('deleteArtist');
    },
    updateArtist() {
      this.$emit('updateArtist');
    },
    viewArtist() {
      this.$emit('viewArtist');
    },
  },
};
</script>

<style></style>
