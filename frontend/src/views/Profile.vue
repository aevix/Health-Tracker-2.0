<template>
  <amplify-authenticator>
    <div class="ml-5">
      <b-row>
        <h1>My Profile</h1>
      </b-row>
      <b-row>
        <b-form>
          <b-row>
            <b-column>
              <h5>Age:</h5>
            </b-column>
            <b-column class="pr-5">
              <b-form-textarea
                id="textarea-no-resize"
                class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2 w-25"
                no-resize
                type="integer"
                placeholder="age"
                :value="age"
              />
            </b-column>
          </b-row>
          <b-row>
            <b-column>
              <h5>Gender:</h5>
            </b-column>
            <b-column class="pr-5">
              <b-form-group>
                <b-form-radio v-model="selected" name="gender" value="Male"
                  >Male</b-form-radio
                >
                <b-form-radio v-model="selected" name="gender" value="Female"
                  >Female</b-form-radio
                >
                <b-form-radio
                  v-model="selected"
                  name="gender"
                  value="Not Specified"
                  >I rather not say</b-form-radio
                >
              </b-form-group>

              <div class="mt-3">
                Selected: <strong>{{ selected }}</strong>
              </div>
            </b-column>
          </b-row>
          <b-row>
            <b-column>
              <h5>Height:</h5>
            </b-column>
            <b-column class="pr-5">
              <b-row>
                <b-form-textarea
                  id="textarea-no-resize"
                  class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2 w-25"
                  no-resize
                  type="integer"
                  placeholder="ft"
                  :value="height.ft"
                />
                <b-form-textarea
                  id="textarea-no-resize"
                  class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2 w-25"
                  no-resize
                  type="integer"
                  placeholder="in"
                  :value="height.inches"
                />
              </b-row>
            </b-column>
            <b-column class="pr-5">
              <b-button
                class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
                variant="outline-primary"
                @click="updateProfile()"
                >Update Profile</b-button
              >
            </b-column>
          </b-row>
        </b-form>
      </b-row>
      <b-row>
        <h4>Age: {{ age }}</h4>
        <h4>Height: {{ height.ft }}' {{ height.inches }}"</h4>
        <h4>Gender: {{ gender }}</h4>
      </b-row>
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
  },
  data() {
    return {
      user: this.$route.params.user,
      age: 24,
      height: {
        ft: 5,
        inches: 8,
      },
      gender: "Male",
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
