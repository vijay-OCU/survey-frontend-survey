<template>
    <h1>Add Track</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{albumId}}</h4>
    <v-form>
       <v-text-field
            label="Title"
            v-model="track.title"
        />
        <v-text-field
            label="Length"
            v-model="track.length"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="saveTrack()"
                    >Save</v-btn>
            </v-col>
            <v-col col="2">
                <v-btn color="info" @click="cancel()">Cancel</v-btn>
            </v-col>
            <v-col col="2"> </v-col>
        </v-row>
    </v-form>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
export default {
  name: "add-track",
  props: ['albumId'],
  data() {
    return {
      track: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: "Enter data and click save"
    };
  },
  methods: {
    saveTrack() {
      var data = {
        title: this.track.title,
        length: this.track.length
      };
      TrackDataService.createTrack(this.albumId, data)
        .then(response => {
          this.track.id = response.data.id;
        
          this.$router.push({ name: 'view' , params: { id: this.albumId }} );
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'view' , params: { id: this.albumId }} );
    }
  }
}

</script>
<style>

</style>