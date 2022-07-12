<template>
  <TopBar showTabs=true :accessToken="this.accessToken" :role="this.role" :currentUser="this.currentUser" />
  <h1>Users List</h1>
  <h4>{{ message }}</h4>
  <v-row>
    <v-col cols="12" sm="2">
      <v-btn color="success" @click="goAdd"> Add User</v-btn>
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
      <span class="text-h6">Username</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Role</span>
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
  <UserDisplay v-for="user in users" :key="user.id" :user="user" @deleteUser="goDelete(user)" @updateUser="goEdit(user)"
    @viewUser="goView(user)" />

  <v-btn @click="removeAllUsers()"> Remove All </v-btn>
</template>
<script>
import TopBar from './TopBar.vue';
import UserDataService from '../services/UserDataService';
import UserDisplay from '@/components/UserDisplay.vue';
export default {
  name: 'users-list',
  props: ['accessToken', 'role', 'currentUser'],
  data() {
    return {
      users: [],
      currentIndex: -1,
      title: '',
      message: 'Search, Edit or Delete Users',
      // accessToken: this.accessToken,
      // role: this.role,
      // currentUser: this.currentUser,
    };
  },
  components: {
    UserDisplay, TopBar
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'addUser', params: {
                  accessToken: this.accessToken,
                  role: this.role,
                  currentUser: this.username,
                }
              });
    },
    goEdit(user) {
      this.$router.push({ name: 'editUser', params: { id: user.id } });
    },
    goView(user) {
      this.$router.push({ name: 'view', params: { id: user.id } });
    },
    goDelete(user) {
      UserDataService.delete(user.id)
        .then(() => {
          this.retrieveUsers();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveUsers() {
      var data = {
        accessToken: this.accessToken,
      };
      UserDataService.getAll(data)
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },
    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = user ? index : -1;
    },
    removeAllUsers() {
      UserDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },

    searchTitle() {
      UserDataService.findByTitle(this.title)
        .then((response) => {
          this.users = response.data;
          this.setActiveUser(null);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveUsers();
  },
  watch: {
    $route() {
      this.retrieveUsers();
    },
  },
};
</script>
<style>
</style>