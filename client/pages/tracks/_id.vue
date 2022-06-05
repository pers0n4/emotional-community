<template>
  <main class="p-4">
    <h2 class="is-size-2">{{ track }}</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.body }}
      </li>
    </ul>
  </main>
</template>

<script>
  export default {
    async asyncData({ $axios, params }) {
      const { id, track } = params;

      const comments = await $axios.$get(`/comments`, {
        params: {
          track: id,
        },
      });

      return { id, track, comments };
    },
  };
</script>
