<template>
  <div class="app-container">
    <div id="app">
      <div id="nav">
        <v-img
          src="./assets/logo.png"
          max-width="70"
          :aspect-ratio="4 / 4"
        ></v-img>
        <div class="router">
          <router-link to="/"> Home </router-link> |
          <router-link to="/about"> About </router-link>
        </div>
        <div class="login-profile" v-if="authState !== 'signedin'">
          <router-link to="/profile"> Login </router-link>
        </div>
        <div class="login-profile" v-if="authState === 'signedin' && user">
          <router-link to="/profile"> {{ user.username }} </router-link>
        </div>
      </div>
      <div class="view-container">
        <router-view />
      </div>
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
  width: 100%;
}

.app-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: none;
}

.view-container {
  display: flex;
  align-content: center;
  justify-content: center;
}

#nav {
  padding: 30px;
  display: flex;
  height: fit-content;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: black;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 2;

  a {
    font-weight: bold;
    color: #727086;
    margin: 10px;

    &.router-link-exact-active {
      color: #a5b3d1;
    }
  }

  #button-container {
    width: 50px;
    margin: 10px;
  }

  .login-profile {
    position: absolute;
    right: 40px;
  }

  .v-image {
    height: 70px;
    width: 70px;
    position: absolute;
    left: 40px;
    padding: 10px;
  }
}

form {
  box-shadow: none;
  border: none;
}
</style>
