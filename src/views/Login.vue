<template>
  <h1>Login Page</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Username" v-model="user.username" />
    <v-text-field label="Password" v-model="user.password" />
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="loginUser()">Login</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import UserDataService from '../services/UserDataService';
import LoginDataService from '../services/LoginDataService';
export default {
  name: 'add-user',
  data() {
    return {
      //logins: this.retrieveLogins.response.data,
      logins: [],
      user: {
        id: null,
        username: '',
        password: '',
      },
    };
  },
  methods: {
    retrieveUsers() {
      LoginDataService.getAll()
        .then((response) => {
          this.surveysData = response.data;
          let logins = [];
          response.data.forEach((login) => {
            logins.push(login.name);
          });
          this.logins = logins;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    saveUser() {
      var data = {
        username: this.user.username,
        password: this.user.password,
        login: this.surveysData.filter(
          (login) => login.name === this.user.login
        )[0].id,
      };
      UserDataService.create(data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log('add ' + response.data);
          this.$router.push({ name: 'users' });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'users' });
    },
  },
  mounted() {
    this.retrieveLogins();
  },
};
</script>
<style></style>
