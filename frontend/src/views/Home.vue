<template>
  <div id="app">
    <div class="d-flex flex-column justify-space-between align-center">
      <v-img src="../assets/homeImg.jpg" :width="width" :aspect-ratio="ratio">
      </v-img>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { createTodo } from "../../../src/graphql/mutations";
import { listTodos } from "../../../src/graphql/queries";
import { onCreateTodo } from "../../../src/graphql/subscriptions";

export default {
  name: "App",
  components: {},
  created() {
    this.getTodos();
    this.subscribe();
  },
  data() {
    return {
      width: screen.width,
      ratio: 16 / 9,
    };
  },
  methods: {
    async createTodo() {
      const { name, description } = this;
      if (!name || !description) return;
      const todo = { name, description };
      this.todos = [...this.todos, todo];
      await API.graphql({
        query: createTodo,
        variables: { input: todo },
      });
      this.name = "";
      this.description = "";
    },
    async getTodos() {
      const todos = await API.graphql({
        query: listTodos,
      });
      this.todos = todos.data.listTodos.items;
    },
    subscribe() {
      API.graphql({ query: onCreateTodo }).subscribe({
        next: (eventData) => {
          let todo = eventData.value.data.onCreateTodo;
          if (this.todos.some((item) => item.name === todo.name)) return; // remove duplications
          this.todos = [...this.todos, todo];
        },
      });
    },
  },
};
</script>
