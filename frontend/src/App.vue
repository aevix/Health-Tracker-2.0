<template>
  <div class="app-container">
    <div id="app">
      <div id="nav">
        <router-link to="/"> Home </router-link> |
        <router-link to="/about"> About </router-link>
        <div v-if="authState !== 'signedin'">
          <router-link to="/profile"> Login </router-link>
        </div>
        <div v-if="authState === 'signedin' && user">
          <router-link to="/profile"> {{ user.username }} </router-link>
        </div>
        <div id="button-container"></div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";

export default {
  name: "HealthTracker",
  created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
    };
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
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
