<template>
  <div id="app">
    <div class="main-container">
      <Login msg="Welcome to My Health App" />
    </div>
  </div>
</template>

<script>
import Login from "./components/login";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Login,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("http://localhost:3000/hello").then((res) => {
        console.log(res.data);
      });
    },
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
