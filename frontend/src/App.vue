<template>
  <div class="app-container">
    <amplify-authenticator>
      <div id="app">
        <div id="nav">
          <router-link to="/"> Home </router-link> |
          <router-link to="/about"> About </router-link>
          <div id="button-container">
            <amplify-sign-out></amplify-sign-out>
          </div>
        </div>
        <router-view />
      </div>
    </amplify-authenticator>
  </div>
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
}

.app-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: none;
}

amplify-authenticator {
  box-shadow: none;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  #button-container {
    width: 50px;
    margin: 10px;
  }
}
</style>
