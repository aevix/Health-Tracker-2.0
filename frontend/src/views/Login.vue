<template>
  <div class="row">
    <amplify-authenticator class="mx-auto">
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{ user.username }}</div>
      </div>
    </amplify-authenticator>
  </div>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";

export default {
  name: "AuthStateApp",
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
