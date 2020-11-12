<template>
  <div id="chartDiv" style="width: 100%; height: 400px"></div>
</template>

<script>
import * as JSC from "jscharting";

export default {
  name: "Charts",
  data() {
    return {
      data: JSC.csv2Json(
        "date,actual,goal\n1/1/2018,5409,7000\n1/2/2018,4893,7000"
      ),
      points: undefined,
    };
  },
  created() {
    JSC.Chart("chartDiv", {
      series: [
        {
          points: [{ points: this.points }],
          xAxis_scale_type: "time",
        },
      ],
    });
    this.data.map((d) => {
      return { x: d.date, y: d.actual };
    });
  },
};
</script>
