<template>
  <h1>Albums List  {{this.artistName === undefined ? '': ' for '+ this.artistName }} </h1>
  <h4>{{ message }}</h4>
  <v-row>
    <v-col cols="12" sm="2">
      <v-btn color="success" @click="goAdd"> Add </v-btn>
    </v-col>
    <v-col col="12" sm="8">
      <v-text-field density="compact" clearable v-model="title" />
    </v-col>
    <v-col cols="12" sm="1">
      <v-btn color="success" @click="searchTitle"> Search </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="2">
      <span class="text-h6">Title</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Language</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Genre</span>
    </v-col>
    <v-col cols="12" sm="1">
      <span class="text-h6">Edit</span>
    </v-col>
    <v-col cols="12" sm="1">
      <span class="text-h6">View</span>
    </v-col>
    <v-col cols="12" sm="1">
      <span class="text-h6">Delete</span>
    </v-col>
  </v-row>
  <AlbumDisplay
    v-for="album in albums"
    :key="album.id"
    :album="album"
    @deleteAlbum="goDelete(album)"
    @updateAlbum="goEdit(album)"
    @viewAlbum="goView(album)"
  />

  <v-btn @click="removeAllAlbums"> Remove All </v-btn>
</template>
<script>
import AlbumDataService from '../services/AlbumDataService';
import AlbumDisplay from '@/components/AlbumDisplay.vue';
export default {
  name: 'albums-list',
  props: ['artistName', 'artistId'],
  data() {
    return {
      albums: [],
      currentAlbum: null,
      currentIndex: -1,
      title: '',
      message: 'Search, Edit or Delete Albums',
    };
  },
  components: {
    AlbumDisplay,
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'addAlbum' });
    },
    goEdit(album) {
      this.$router.push({ name: 'editAlbum', params: { id: album.id } });
    },
    goView(album) {
      this.$router.push({ name: 'view', params: { id: album.id } });
    },
    goDelete(album) {
      AlbumDataService.delete(album.id)
        .then(() => {
          this.retrieveAlbums();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveAlbums() {
      if (window.location.pathname === '/album-frontend/albums'|| window.location.pathname === '/album-frontend/') {
        AlbumDataService.getAll()
          .then((response) => {
            this.albums = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      } else {
        AlbumDataService.findByArtist(this.artistId)
          .then((response) => {
            this.albums = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
    refreshList() {
      this.retrieveAlbums();
      this.currentAlbum = null;
      this.currentIndex = -1;
    },
    setActiveAlbum(album, index) {
      this.currentAlbum = album;
      this.currentIndex = album ? index : -1;
    },
    removeAllAlbums() {
      AlbumDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    searchTitle() {
      AlbumDataService.findByTitle(this.title)
        .then((response) => {
          this.albums = response.data;
          this.setActiveAlbum(null);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveAlbums();
  },
  watch: {
    $route() {
      this.retrieveAlbums();
    },
  },
};
</script>
<style></style>
