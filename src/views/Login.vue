<template>
  <h1>Login Page</h1>
  <v-form>
    <v-text-field label="Username" v-model="user.username" class="shrink mx-4"/>
    <v-text-field :type="passwordFieldType" label="Password"
      :append-icon="passwordFieldType == 'password' ? 'mdi-eye' : 'mdi-eye-off'" @click:append="switchVisibility"
      v-model="user.password" class="shrink mx-4"/>
    <h4>{{ user.message }}</h4>
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="loginUser()">Login</v-btn>
      </v-col>
    </v-row>
  </v-form>

</template>
<script>
import UserDataService from "../services/UserDataService";
import LoginDataService from "../services/LoginDataService";
export default {
  name: "login",
  props: ['showTabs'],
  data() {
    return {
      user: {
        username: "",
        password: "",
        message: "",
        accessToken: "",
        role: "",
        id: "",
      },
      passwordFieldType: "password",
    };
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    loginUser() {
      var data = {
        username: this.user.username,
        password: this.user.password,
      };
      LoginDataService.login(data)
        .then((response) => {
          this.user.password = "",
            console.log("response", response.status);
          if (response.status == 200) {
            this.user.role = response.data.role;
            this.user.accessToken = response.data.accessToken;
            this.user.message = "";
            this.user.id = response.data.userId;
            console.log('Current User Id after Login ->', this.user.id, response.data.userId);
            if (response.data.role == "admin") {
              this.$router.push({
                name: 'users', params: {
                  accessToken: this.user.accessToken,
                  role: this.user.role,
                  currentUserId: this.user.id,
                }
              });
            }
            else {
              this.$router.push({ name: 'surveys' , params: {
                  accessToken: this.user.accessToken,
                  role: this.user.role,
                  currentUserId: this.user.id,
                }
              })
            }
          }

        })
        .catch((e) => {
          this.isAuthorized = false;
          this.user.message = e.response.data.message;
          console.log("Un-Authorized", this.user.message);
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
          console.log("add " + response.data);
          this.$router.push({ name: "users" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "users" });
    },
  },
};
</script>