<template>
  <main class="p-4">
    <h2 class="is-size-2">{{ id }}</h2>
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
      const { id } = params;

      const comments = await $axios.$get(`/comments`, {
        params: {
          track: id,
        },
      });

      return { id, comments };
    },
  };
</script>
