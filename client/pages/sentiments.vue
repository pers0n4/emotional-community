<template>
  <main class="p-4">
    <h2 class="title">감정 보기</h2>
    <b-table :data="tracks" hoverable @click="clickTableRow">
      <b-table-column v-slot="props" field="id" label="ID" numeric width="50">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column v-slot="props" field="title" label="Titlte">
        {{ props.row.title }}
      </b-table-column>

      <b-table-column v-slot="props" field="artist" label="Artist">
        {{ props.row.artist }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        cell-class="has-background-info-light"
        field="POSITIVE"
        header-class="has-background-info-light"
        label="POSITIVE"
        numeric
        sortable
      >
        <span class="tag is-info is-light">
          {{ props.row.POSITIVE }}
        </span>
      </b-table-column>

      <b-table-column
        v-slot="props"
        cell-class="has-background-danger-light"
        field="NEGATIVE"
        header-class="has-background-danger-light"
        label="NEGATIVE"
        numeric
        sortable
      >
        <span class="tag is-danger is-light">
          {{ props.row.NEGATIVE }}
        </span>
      </b-table-column>

      <b-table-column
        v-slot="props"
        cell-class="has-background-warning-light"
        field="MIXED"
        header-class="has-background-warning-light"
        label="MIXED"
        numeric
        sortable
      >
        <span class="tag is-warning is-light">
          {{ props.row.MIXED }}
        </span>
      </b-table-column>

      <b-table-column
        v-slot="props"
        cell-class="has-background-success-light"
        field="NEUTRAL"
        header-class="has-background-success-light"
        label="NEUTRAL"
        numeric
        sortable
      >
        <span class="tag is-success is-light">
          {{ props.row.NEUTRAL }}
        </span>
      </b-table-column>
    </b-table>
  </main>
</template>

<script>
  export default {
    async asyncData({ $axios }) {
      const tracks = await $axios.$get(`/tracks`, {
        params: {
          statistics: true,
        },
      });

      const cleanedTracks = tracks.map((track) => {
        const { id, title, artist, comments, sentiments } = track;

        const keys = ["POSITIVE", "NEGATIVE", "MIXED", "NEUTRAL"];

        keys.forEach((key) => {
          if (typeof sentiments[key] === "undefined") {
            sentiments[key] = 0;
          }
        });

        return {
          id,
          title,
          artist,
          comments,
          ...sentiments,
        };
      });

      return { tracks: cleanedTracks };
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
          {
            label: "POSITIVE",
            field: "POSITIVE",
            numeric: true,
            sortable: true,
            headerClass: "has-background-info-light",
            cellClass: "has-background-info-light",
          },
          {
            label: "NEGATIVE",
            field: "NEGATIVE",
            numeric: true,
            sortable: true,
            headerClass: "has-background-danger-light",
            cellClass: "has-background-danger-light",
          },
          {
            label: "MIXED",
            field: "MIXED",
            numeric: true,
            sortable: true,
            headerClass: "has-background-warning-light",
            cellClass: "has-background-warning-light",
          },
          {
            label: "NEUTRAL",
            field: "NEUTRAL",
            numeric: true,
            sortable: true,
            headerClass: "has-background-success-light",
            cellClass: "has-background-success-light",
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
