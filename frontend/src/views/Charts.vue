<template>
  <JSCharting :options="options" class="columnChart"></JSCharting>
</template>

<script>
import JSCharting from "jscharting-vue";
export default {
  data() {
    return {
      name: "columnChart",
      options: {
        type: "line",
        series: [
          {
            points: [
              { x: "A", y: 50 },
              { x: "B", y: 30 },
              { x: "C", y: 50 },
            ],
          },
        ],
      },
    };
  },
  components: {
    JSCharting,
  },
};
</script>

<style>
.columnChart {
  height: 300px;
}
</style>
