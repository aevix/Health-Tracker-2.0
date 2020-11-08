<template>
  <amplify-authenticator>
    <div id="app">
      <h1>My Profile</h1>
      <b-form inline>
        <b-form-textarea
          id="textarea-no-resize"
          class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
          no-resize
          type="integer"
          placeholder="age"
        />
        <b-form-textarea
          id="textarea-no-resize"
          class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
          no-resize
          type="text"
          placeholder="gender"
        />
        <b-form-textarea
          id="textarea-no-resize"
          class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
          no-resize
          type="integer"
          placeholder="height"
        />
        <b-button
          class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
          variant="outline-primary"
          @click="updateProfile"
          >Update Profile</b-button
        >
      </b-form>
      <h4>Age: {{ age }}</h4>
      <h4>Height: {{ height }}</h4>
      <h4>Gender: {{ gender }}</h4>
    </div>
  </amplify-authenticator>
</template>

<script>
import { API } from "aws-amplify";
import * as mutations from "../../../src/graphql/mutations";
import * as queries from "../../../src/graphql/queries";

export default {
  created() {
    this.fetchUserProfile();
    // console.log(userProfile);
    // if (userProfile.data.getProfile === null) {
    //   this.createProfile();
    //   console.log("it worked");
    // }
    // userProfile = this.fetchUserProfile();
    // this.age = userProfile.getProfile.age;
    // this.height = userProfile.getProfile.height;
    // this.gender = userProfile.getProfile.gender;
  },
  data() {
    return {
      user: this.$route.params.user,
      age: undefined,
      height: undefined,
      gender: undefined,
    };
  },
  methods: {
    async createProfile() {
      const profile = {
        id: this.user,
        age: 0,
        height: 0,
        gender: "unspecified",
      };
      const newProfile = await API.graphql({
        query: mutations.createProfile,
        variables: { input: profile },
      });
      return newProfile;
    },
    async fetchUserProfile() {
      const list = await API.graphql({
        query: queries.getProfile,
        variables: { id: this.user },
      });
      this.age = list.data.getProfile.age;
      this.height = list.data.getProfile.height;
      this.gender = list.data.getProfile.gender;
    },
    async updateProfile() {
      var profile = {
        id: this.user,
        age: this.age,
        height: this.height,
        gender: this.gender,
      };
      await API.graphql({
        query: mutations.updateProfile,
        variables: { input: profile },
      });
    },
  },
};
</script>
