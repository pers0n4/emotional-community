<template>
  <div>
    <img alt="mev logo image" :src="require('../static/mev.png')" />
    <main class="columns p-4">
      <section class="column">
        <div>
          <b-table :data="data" focusable>
            <template v-for="column in columns">
              <b-table-column :key="column.id" v-bind="column">
                <template
                  v-if="column.searchable && !column.numeric"
                  #searchable="props"
                >
                  <b-input
                    v-model="props.filters[props.column.field]"
                    icon="magnify"
                    placeholder="Search..."
                  />
                </template>
                <template #default="props">
                  {{ props.row[column.field] }}
                </template>
              </b-table-column>
            </template>
          </b-table>
          <div>
            <button id="write" @click="btn_write">글쓰기</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "IndexPage",
    data() {
      return {
        genres: [],
        data: [
          {
            id: 1,
            title: "mamamoo",
            nickname: "Simmons",
            date: "2016-10-15 13:43:27",
            view: "Male",
          },
          {
            id: 2,
            title: "viviz",
            nickname: "Jacobs",
            date: "2016-12-15 06:00:53",
            view: "Male",
          },
          {
            id: 3,
            title: "IU",
            nickname: "Gilbert",
            date: "2016-04-26 06:26:28",
            view: "Female",
          },
          {
            id: 4,
            title: "ive",
            nickname: "Flores",
            date: "2016-04-10 10:28:46",
            view: "Male",
          },
          {
            id: 5,
            title: "taeyeon",
            nickname: "Lee",
            date: "2016-12-06 14:38:38",
            view: "Female",
          },
        ],
        columns: [
          {
            field: "id",
            label: "ID",
            width: "100",
            numeric: true,
            searchable: false,
          },
          {
            field: "title",
            width: "400",
            label: "제목",
            searchable: true,
          },
          {
            field: "nickname",
            label: "닉네임",
            searchable: true,
          },
          {
            field: "date",
            label: "작성일",
            searchable: true,
          },
          {
            field: "view",
            label: "조회수",
          },
        ],
      };
    },
    created() {
      this.fetchGenres();
    },
    methods: {
      btn_write() {
        this.$router.push("/write");
      },
      async fetchGenres() {
        const genres = await this.$axios.$get("/genres");
        this.genres = genres;
      },
    },
  });
</script>
