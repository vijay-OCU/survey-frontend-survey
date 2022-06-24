<template>
    <h1>Edit Track</h1>
    <h4>{{ message }}</h4>
    <h4>Album : {{albumId}} Track : {{trackId}}</h4>

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
import TrackDataService from "../services/TrackDataService";
export default {
  name: "edit-track",
  props: {albumId : String,trackId:String},
  data() {
    return {
      track: Object,
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveTrack() {
      TrackDataService.getTrack(this.albumId,this.trackId)
        .then(response => {
          this.track= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },
    saveTrack() {
      var data = {
        title: this.track.title,
        length: this.track.length,
        albumId : this.albumId
      };
      TrackDataService.updateTrack(this.albumId,this.track.id, data)
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
  },
    mounted() {
      this.retrieveTrack();
  }
}

</script>
<style>

</style>