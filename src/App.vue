<template>
    <TopBar showTabs=false /> 
    <router-view />
</template>

<script>
import TopBar from './views/TopBar.vue';
export default {
  name: 'App',
  components: {
    TopBar
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>