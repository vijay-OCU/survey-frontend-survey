<template>
  <h1>Album Add</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Title" v-model="album.title" />
    <v-text-field label="Language" v-model="album.language" />
    <v-text-field label="Genre" v-model="album.genre" />
    <v-select
      :items="artists"
      item-text="name"
      item-value="id"
      label="Artist"
      solo
      v-model="album.artist"
    ></v-select>
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveAlbum()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import AlbumDataService from '../services/AlbumDataService';
import ArtistDataService from '../services/ArtistDataService';
export default {
  name: 'add-album',
  data() {
    return {
      //artists: this.retrieveArtists.response.data,
      artists: [],
      album: {
        id: null,
        title: '',
        language: '',
        genre: '',
      },
      message: 'Enter data and click save',
    };
  },
  methods: {
    retrieveArtists() {
      ArtistDataService.getAll()
        .then((response) => {
          this.artistsData = response.data;
          let artists = [];
          response.data.forEach((artist) => {
            artists.push(artist.name);
          });
          this.artists = artists;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    saveAlbum() {
      var data = {
        title: this.album.title,
        language: this.album.language,
        genre: this.album.genre,
        artist: this.artistsData.filter(
          (artist) => artist.name === this.album.artist
        )[0].id,
      };
      AlbumDataService.create(data)
        .then((response) => {
          this.album.id = response.data.id;
          console.log('add ' + response.data);
          this.$router.push({ name: 'albums' });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'albums' });
    },
  },
  mounted() {
    this.retrieveArtists();
  },
};
</script>
<style></style>
