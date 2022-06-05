<template>
  <main class="p-4">
    <h2 class="is-size-2">{{ genre }}</h2>
    <ul>
      <li v-for="track in tracks" :key="track.id">
        <nuxt-link :to="{ name: 'tracks-id', params: { id: track.id } }">
          {{ track.id }}
        </nuxt-link>
        {{ track }}
      </li>
    </ul>
  </main>
</template>

<script>
  export default {
    async asyncData({ $axios, params }) {
      const { path, genre } = params;

      const tracks = await $axios.$get(`/tracks`, {
        params: {
          genre,
        },
      });

      return { path, genre, tracks };
    },
  };
</script>
