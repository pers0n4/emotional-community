<template>
  <main class="p-4">
    <h2 class="title">{{ title }} - {{ artist }}</h2>
    <section class="is-flex">
      <v-chart class="chart" :option="sentimentChart" />
      <v-chart class="chart" :option="wordCloud" />
    </section>
    <section class="mb-5">
      <b-field label="Comment">
        <b-input
          v-model="commentModel"
          :disabled="!$auth.loggedIn"
          expanded
          has-counter
          :placeholder="
            !$auth.loggedIn && '코멘트를 작성하려면 로그인해주세요.'
          "
          type="textarea"
        />
        <p class="control">
          <b-button
            class="comment-button"
            :disabled="!$auth.loggedIn"
            label="작성"
            type="is-primary"
            @click="writeComment"
          />
        </p>
      </b-field>
    </section>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="notification is-light mb-2 p-4"
      :class="[classes[comment.confirmedSentiment]]"
    >
      {{ comment.body }}
    </div>
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
        commentModel: "",
        sentimentChart: null,
        wordCloud: null,
        classes: {
          POSITIVE: "is-info",
          NEGATIVE: "is-danger",
          NEUTRAL: "is-success",
          MIXED: "is-warning",
        },
        chartColors: {
          POSITIVE: "#5470c6",
          NEGATIVE: "#ee6666",
          NEUTRAL: "#91cc75",
          MIXED: "#fac858",
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
              itemStyle: {
                color: this.chartColors[key],
              },
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
    methods: {
      async writeComment() {
        const { id, commentModel } = this;
        await this.$axios.$post(
          `/comments`,
          {
            body: commentModel,
            trackId: Number(id),
          },
          {
            headers: {
              Authorization: this.$auth.strategy.token.get(),
            },
          },
        );
        this.commentModel = "";

        setTimeout(() => {
          this.$nuxt.refresh();
        }, 500);
      },
    },
  };
</script>

<style scoped>
  .chart {
    height: 400px;
  }

  .comment-button {
    height: 100%;
  }
</style>
