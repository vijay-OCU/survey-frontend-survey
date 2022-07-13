<template>
    <h1>User Edit</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Username"
            v-model="user.title"
        />
        <v-text-field
            label="Emailid"
            v-model="user.emailid"
        />
        <v-row justify="center">
            <v-col col="2"> </v-col>
            <v-col col="2">
                <v-btn color="success" @click="updateUser()"
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
import UserDataService from "../services/UserDataService";
export default {
  name: "edit-user",
  props: ['id'],
  data() {
    return {
      user: {},
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveUser() {
      UserDataService.get(this.id)
        .then(response => {
          this.user= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateUser() {
      var data = {
        title: this.user.title,
        emailid: this.user.emailid,
      };
      UserDataService.update(this.id,data)
        .then(response => {
          this.user.id = response.data.id;
          console.log("add "+response.data);
          this.$router.push({ name: 'users' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'users' });
    }
  },
    mounted() {
    this.retrieveUser();
  }
}

</script>
<style>

</style>