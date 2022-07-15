<template>
    <h1>User Edit</h1>
    <h4>{{ message }}</h4>
    <v-form>
       <v-text-field
            label="Username"
            v-model="user.username"
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
  props: ['accessToken', 'role', 'currentUser','id'],
  data() {
    return {
      user: {},
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveUser() {
      var data = {
        accessToken: this.accessToken
      };
      UserDataService.get(this.id,data)
        .then(response => {
          this.user= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },

    updateUser() {
      var data = {
        username: this.user.username,
        emailid: this.user.emailid,
        accessToken: this.accessToken
      };
      UserDataService.update(this.id,data)
        .then(response => {
          this.$router.push({
                name: 'users', params: {
                  accessToken: this.accessToken,
                  role: this.role,
                  currentUser: this.username
                }
              });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({
                name: 'users', params: {
                  accessToken: this.accessToken,
                  role: this.role,
                  currentUser: this.username
                }
              });
    }
  },
    mounted() {
    this.retrieveUser();
  }
}

</script>
<style>

</style>