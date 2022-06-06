<template>
  <div>
    <img alt="mev logo image" :src="require('../static/mev.png')" />
    <main class="p-4">
      <div class="columns">
        <div v-for="genre in genres" :key="genre.id" class="column">
          <nuxt-link
            class="box album"
            :to="{
              name: 'genres-path',
              params: { path: genre.path, genre: genre.name },
            }"
          >
            <div class="image is-square">
              <div
                class="has-ratio is-flex is-flex-direction-column is-justify-content-flex-end is-align-items-center"
              >
                <b-icon custom-size="mdi-96px" icon="disc" />
                <span class="mt-6 subtitle">{{ genre.name }}</span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "IndexPage",
    async asyncData({ $axios }) {
      const genres = await $axios.$get("/genres");
      return { genres };
    },
  });
</script>

<style>
  .album {
    transition: all 0.2s ease-in-out;
  }

  .album-title {
    position: absolute;
    bottom: 0;
  }

  .mdi-96px.mdi::before {
    font-size: 96px;
  }
</style>
