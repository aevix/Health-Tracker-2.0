<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="main-container">
      <h1>Hello this is the home page!</h1>
      <p>hello this is version testing</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      text: null,
    };
  },
  created() {
    this.getData();
  },
  components: {},
  methods: {
    getData() {
      axios.get("http://localhost:3000/hello").then((req) => {
        this.text = req.data.text;
      });
    },
  },
};
</script>
