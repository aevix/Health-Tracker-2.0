<template>
  <amplify-authenticator>
    <div id="app">
      <h1>My Profile</h1>
      <b-form inline @submit="updateProfile">
        <b-container>
          <b-row>
            <b-form-textarea
              label="Age: "
              id="textarea-no-resize"
              class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
              no-resize
              type="integer"
              placeholder="Enter Your Age"
              v-model="form.age"
            />
          </b-row>
          <b-row>
            <div>
              <b-form-group label="Gender: ">
                <b-form-radio
                  v-model="form.gender"
                  name="some-radios"
                  value="Male"
                  >Male</b-form-radio
                >
                <b-form-radio
                  v-model="form.gender"
                  name="some-radios"
                  value="Female"
                  >Female</b-form-radio
                >
                <b-form-radio
                  v-model="form.gender"
                  name="some-radios"
                  value="Other"
                  >I choose not to Identify</b-form-radio
                >
              </b-form-group>
            </div>
          </b-row>
          <b-row>
            <b-form-group label="Height: ">
              <b-row>
                <b-col>
                  <b-input-group class="column" size="xs" append="ft">
                    <b-form-textarea
                      id="textarea-no-resize"
                      class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
                      no-resize
                      type="integer"
                      v-model="form.ft"
                    />
                  </b-input-group>
                </b-col>
                <b-col>
                  <b-input-group class="column" size="xs" append="in">
                    <b-form-textarea
                      id="textarea-no-resize"
                      class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
                      no-resize
                      type="integer"
                      v-model="form.inches"
                    />
                  </b-input-group>
                </b-col>
              </b-row>
            </b-form-group>
          </b-row>
          <b-row>
            <b-button
              class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
              variant="outline-primary"
              type="submit"
              @click="updateProfile()"
              >Update Profile</b-button
            >
          </b-row>
        </b-container>
      </b-form>
      <h4>Age: {{ age }}</h4>
      <h4>Height: {{ ft }}' {{ inches }}"</h4>
      <h4>Gender: {{ gender }}</h4>
    </div>
  </amplify-authenticator>
</template>

<script>
import { API } from "aws-amplify";
import * as mutations from "../../../src/graphql/mutations";
import * as queries from "../../../src/graphql/queries";

export default {
  data() {
    return {
      form: {
        age: undefined,
        ft: undefined,
        inches: undefined,
        gender: undefined,
      },
      user: this.$route.params.user,
      age: undefined,
      ft: undefined,
      inches: undefined,
      gender: undefined,
      v: undefined,
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    async createProfile() {
      const profile = {
        id: this.user,
        age: this.form.age,
        gender: this.form.gender,
        ft: this.form.ft,
        inches: this.form.inches,
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
      this.v = list.data.getProfile._version;
      this.age = list.data.getProfile.age;
      this.ft = list.data.getProfile.ft;
      this.inches = list.data.getProfile.inches;
      this.gender = list.data.getProfile.gender;
    },
    async updateProfile() {
      if (!this.age && !this.gender && !this.ft && !this.inches) {
        return this.createProfile();
      }
      var profile = {
        id: this.user,
        age: this.form.age,
        ft: this.form.ft,
        inches: this.form.inches,
        gender: this.form.gender,
        _version: this.v,
      };
      await API.graphql({
        query: mutations.updateProfile,
        variables: { input: profile },
      });
    },
  },
};
</script>
