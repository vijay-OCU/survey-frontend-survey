<template>
    <h1>Album Edit</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Title"
            v-model="album.title"
        />
        <v-text-field
            label="Language"
            v-model="album.language"
        />
        <v-text-field
            label="Genre"
            v-model="album.genre"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="updateAlbum()"
                    >Save</v-btn
                >
            </v-col>
            <v-col col="2">
                <v-btn color="info" @click="cancel()">Cancel</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "edit-album",
  props: ['id'],
  data() {
    return {
      album: {},
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveAlbum() {
      AlbumDataService.get(this.id)
        .then(response => {
          this.album= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateAlbum() {
      var data = {
        title: this.album.title,
        language: this.album.language,
        genre: this.album.genre
      };
      AlbumDataService.update(this.id,data)
        .then(response => {
          this.album.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'albums' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'albums' });
    }
  },
    mounted() {
    this.retrieveAlbum();
  }
}

</script>
<style>

</style>