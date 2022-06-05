<template>
  <main class="p-4">
    <h2 class="is-size-2">{{ genre }}</h2>
    <b-table
      :columns="columns"
      :data="tracks"
      hoverable
      @click="clickTableRow"
    />
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
    data() {
      return {
        columns: [
          {
            label: "ID",
            field: "id",
            width: 50,
            numeric: true,
          },
          {
            label: "Title",
            field: "title",
          },
          {
            label: "Artist",
            field: "artist",
          },
        ],
      };
    },
    methods: {
      clickTableRow(track) {
        this.$router.push({
          name: "tracks-id",
          params: { id: track.id, track: `${track.title} - ${track.artist}` },
        });
      },
    },
  };
</script>
