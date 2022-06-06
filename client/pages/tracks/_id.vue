<template>
  <main class="p-4">
    <h2 class="title">{{ title }} - {{ artist }}</h2>
    <section class="is-flex">
      <v-chart class="chart" :option="sentimentChart" />
      <v-chart class="chart" :option="wordCloud" />
    </section>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="notification is-light"
      :class="[classes[comment.confirmedSentiment]]"
    >
      {{ comment.body }}
    </div>

    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.body }}
      </li>
    </ul>
  </main>
</template>

<script>
  import { PieChart } from "echarts/charts";
  import {
    LegendComponent,
    TitleComponent,
    TooltipComponent,
  } from "echarts/components";
  import { use } from "echarts/core";
  import theme from "echarts/lib/theme/light";
  import { CanvasRenderer } from "echarts/renderers";
  import VChart from "vue-echarts";

  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  ]);

  export default {
    components: {
      VChart,
    },
    async asyncData({ $axios, params }) {
      const { id } = params;

      const { title, artist, comments, sentiments, entities } =
        await $axios.$get(`/tracks/${id}`);

      return {
        id,
        title,
        artist,
        comments,
        sentiments,
        entities,
      };
    },
    data() {
      return {
        sentimentChart: null,
        wordCloud: null,
        classes: {
          POSITIVE: "is-success",
          NEGATIVE: "is-danger",
          NEUTRAL: "is-info",
          MIXED: "is-warning",
        },
      };
    },
    created() {
      this.sentimentChart = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Sentiment",
            type: "pie",
            radius: "50%",
            data: Object.entries(this.sentiments).map(([key, value]) => ({
              value,
              name: key,
            })),
          },
        ],
      };

      this.wordCloud = {
        series: [
          {
            type: "wordCloud",
            // shape: "circle",
            // keepAspect: false,
            // left: "center",
            // top: "center",
            // width: "70%",
            // height: "80%",
            // right: null,
            // bottom: null,
            // sizeRange: [12, 60],
            // rotationRange: [-90, 90],
            // rotationStep: 45,
            // gridSize: 8,
            // drawOutOfBound: false,
            // layoutAnimation: true,
            textStyle: {
              fontFamily: "sans-serif",
              fontWeight: "bold",
              color() {
                return theme.color[
                  Math.floor(Math.random() * theme.color.length)
                ];
              },
            },
            data: Object.entries(this.entities).map(([key, value]) => ({
              name: key,
              value,
            })),
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .chart {
    height: 300px;
  }
</style>
