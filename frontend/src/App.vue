<template>
  <amplify-authenticator>
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <div id="button-container">
          <amplify-sign-out></amplify-sign-out>
        </div>
      </div>
      <router-view />
    </div>
  </amplify-authenticator>
</template>

<script>
export default {
  name: "HealthTracker",
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

#nav {
  padding: 30px;
  display: inline-block;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#button-container {
  width: 50px;
}
</style>
