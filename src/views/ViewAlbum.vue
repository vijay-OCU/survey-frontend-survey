<template>
  <h2>Album View ({{ album.title || '' }})</h2>
  <h4>{{ message }}</h4>
  <h3></h3>
  <v-btn color="success" @click="goEditAlbum()">Edit</v-btn>
  <v-btn color="success" @click="goAddTrack(id)">Add Track</v-btn>

  <v-row>
    <v-col cols="8" sm="2">
      <span class="text-h6">Title</span>
    </v-col>
    <v-col cols="8" sm="2">
      <span class="text-h6">Length</span>
    </v-col>
    <v-col cols="8" sm="1">
      <span class="text-h6">Edit</span>
    </v-col>
    <v-col cols="8" sm="1">
      <span class="text-h6">Delete</span>
    </v-col>
  </v-row>
  <TrackDisplay
    v-for="track in tracks"
    :key="track.id"
    :track="track"
    @deleteTrack="goDeleteTrack(track)"
    @updateTrack="goEditTrack(track)"
  />
</template>
<script>
import AlbumDataService from '../services/AlbumDataService';
import TrackDataService from '../services/TrackDataService';
import TrackDisplay from '@/components/TrackDisplay.vue';
export default {
  name: 'view-album',
  props: ['id'],
  components: {
    TrackDisplay,
  },
  data() {
    return {
      album: {},
      tracks: [],
      message: 'Add, Edit or Delete Tracks',
    };
  },
  methods: {
    retrieveTracks() {
      AlbumDataService.get(this.id)
        .then((response) => {
          this.album = response.data;
          TrackDataService.getAllTracks(this.id)
            .then((response) => {
              this.tracks = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    goEditAlbum() {
      this.$router.push({ name: 'editAlbum', params: { id: this.id } });
    },
    goEditTrack(track) {
      this.$router.push({
        name: 'editTrack',
        params: { albumId: this.id, trackId: track.id },
      });
    },
    goAddTrack() {
      this.$router.push({ name: 'addTrack', params: { albumId: this.id } });
    },

    goDeleteTrack(track) {
      TrackDataService.deleteTrack(track.albumId, track.id)
        .then(() => {
          this.retrieveTracks();
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
    this.retrieveTracks();
  },
};
</script>

<style></style>
