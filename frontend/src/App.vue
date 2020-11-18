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
      <b-row>
        <router-view />
      </b-row>
      <b-row class="mt-0 mb-0 pt-0 pb-0">
        <Footer />
      </b-row>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

.login-container {
  display: inline-block;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
