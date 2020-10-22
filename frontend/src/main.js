import Vue from "vue";

import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";

import "@aws-amplify/ui-vue";
import Amplify from "aws-amplify";
import awsconfig from "../../src/aws-exports";
import vuetify from "./plugins/vuetify";

Amplify.configure(awsconfig);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
