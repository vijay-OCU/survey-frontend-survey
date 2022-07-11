<template>
  <TopBarVue showTabs=false :accessToken="this.accessToken" :role="this.role" :currentUser="this.currentUser" />
  <h1>User Add</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Username" v-model="user.username" class="shrink mx-4"/>
    <v-text-field label="Password" v-model="user.password" class="shrink mx-4"/>
    <v-select
      :items="roles"
      label="Role"
      solo
      v-model="user.role"
      class="shrink mx-4"
    ></v-select>
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveUser()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import TopBarVue from './TopBar.vue';
import UserDataService from '../services/UserDataService';
export default {
  name: 'add-user',
  props: ['accessToken', 'role', 'currentUser'],
  data() {
    return {
      roles:['admin','user'],
      user: {
        id: null,
        username: '',
        password: ''
      },
      message: 'Enter data and click save',
    };
  },
  components:{
    TopBarVue
  },
  methods: {
    saveUser() {
      console.log("toooken:"+this.accessToken);
      var data = {
        username: this.user.username,
        password: this.user.password,
        role: this.user.role,
        accessToken: this.accessToken
      };
      UserDataService.create(data)
        .then((response) => {
          //this.user.id = response.data.id;
          console.log('add ' + response.data);
          this.$router.push({ 
            name: 'users', 
            params: {
                  accessToken: this.accessToken,
                  role: this.role,
                  currentUser: this.username
                }
              });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'users' });
    },
  } 
};
</script>
<style></style>