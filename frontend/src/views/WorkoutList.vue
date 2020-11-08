<template>
  <div id="app">
    <h1>My Workout</h1>
    <b-form inline>
      <b-form-textarea
        id="textarea-no-resize"
        class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
        no-resize
        type="text"
        v-model="name"
        placeholder="Workout Name"
      />
      <b-form-textarea
        id="textarea-no-resize"
        class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
        no-resize
        type="text"
        v-model="description"
        placeholder="Workout Description"
      />
      <b-button
        class="mb-2 mr-sm-2 mb-sm-0 ml-sm-2"
        variant="outline-primary"
        v-on:click="createTodo"
        >Create Todo</b-button
      >
    </b-form>
    <b-table striped hover :items="todos"></b-table>
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
      name: "",
      description: "",
      todos: [],
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
      for (var i = 0; i < todos.data.listTodos.items.length; i++) {
        this.todos.push({
          name: todos.data.listTodos.items[i].name,
          description: todos.data.listTodos.items[i].description,
        });
      }
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
