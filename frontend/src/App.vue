<template>
  <div id="app">
    <div class="main-container">
      <Login msg="Welcome to My Health App" />
    </div>
  </div>
</template>

<script>
import Login from "./components/login.vue";
export default {
  name: "App",
  components: {
    Login,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main-container {
  margin-left: 35%;
}
</style>
