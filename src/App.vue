<template>
  <v-toolbar color="#FCE4EC" dense elevation="4" class="shrink mx-4">
    <v-img class="mx-2" :src="logo" max-height="40" max-width="40" contain></v-img>
    <v-tool-bar-title>Survey World!</v-tool-bar-title>
  </v-toolbar>
  <router-view />

</template>

<script>
import logo from './assets/oc-logo-white.png'
import './styles/_variables.scss'

import TopBar from './views/TopBar.vue';
export default {
  name: 'App',
  components: {
    TopBar
  },
  props: ['showTabs'],
  data: () => ({
    logo,
  }),
  methods: {
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #042e58;
  margin-top: 20px;
  margin-left: 20px;
    margin-block-start: 5px;
    margin-bottom: 5px;


}
</style>