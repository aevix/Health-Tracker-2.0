<template>
  <div class="app-container ml-0">
    <div id="app">
      <div id="nav" class="ml-0">
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
          <router-link to="/login"> Login </router-link>
        </div>
        <div class="login-profile" v-if="authState === 'signedin'">
          <b-dropdown
            id="dropdown-right"
            right
            :text="user.username"
            class="m-md-2"
          >
            <b-dropdown-item>
              <router-link
                :to="{
                  path: `/profile/${user.username}`,
                }"
              >
                Account
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/workout">My Workouts</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/charts">My Charts</router-link>
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item>
              <amplify-sign-out @click="reload()" />
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <b-row class="m-0 pt-0">
        <router-view />
      </b-row>
      <b-row class="m-0 p-0">
        <footerComponent />
      </b-row>
    </div>
  </div>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import footerComponent from "./components/Footer.vue";

export default {
  name: "HealthTracker",
  components: {
    footerComponent,
  },
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
  methods: {
    reload() {
      location.replace("/");
    },
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

  .dropdown-item {
    margin: 0px;
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
