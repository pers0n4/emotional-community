<template>
  <section class="has-background-light is-flex-grow-1 layout-sidebar">
    <div class="p-4">
      <b-menu>
        <b-menu-list label="Menu">
          <!-- <b-menu-item icon="account" label="My Account">
              <b-menu-item icon="account-box" label="내가 쓴 글"></b-menu-item>
              <b-menu-item
                icon="account-box"
                label="내가 쓴 댓글"
              ></b-menu-item>
            </b-menu-item> -->
          <b-menu-item
            icon="menu"
            label="전체 보기"
            @click="$router.push({ name: 'genres' })"
          />
          <b-menu-item expanded icon="album" label="장르별 보기">
            <b-menu-item
              v-for="genre in genres"
              :key="genre.path"
              icon="disc"
              :label="genre.name"
              @click="
                $router.push({
                  name: 'genres-path',
                  params: { path: genre.path, genre: genre.name },
                })
              "
            />
          </b-menu-item>
          <b-menu-item
            icon="heart"
            label="감정 보기"
            @click="$router.push({ name: 'sentiments' })"
          />
        </b-menu-list>
      </b-menu>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        genres: [],
      };
    },
    async fetch() {
      this.genres = await this.$axios.$get("/genres");
    },
  };
</script>

<style>
  .layout-sidebar {
    width: 240px;
  }
</style>
