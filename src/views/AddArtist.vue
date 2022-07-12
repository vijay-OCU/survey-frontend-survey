<template>
    <h1>Artist Add</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Name"
            v-model="artist.name"
        />
        <v-text-field
            label="Gender"
            v-model="artist.gender"
        />
        <v-text-field
            label="Location"
            v-model="artist.location"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveArtist()"
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
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "add-artist",
  data() {
    return {
      artist: {
        id: null,
        name: "",
        gender: "",
        location: ""
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveArtist() {
      var data = {
        name: this.artist.name,
        gender: this.artist.gender,
        location: this.artist.location
      };
      ArtistDataService.create(data)
        .then(response => {
          this.artist.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'artists' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'artists' });
    }
  }
}

</script>
<style>

</style>