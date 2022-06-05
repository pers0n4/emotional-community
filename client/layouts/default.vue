<template>
  <div class="root is-flex is-flex-direction-column">
    <LayoutHeader />
    <div class="is-flex-grow-1 is-flex">
      <aside class="is-flex is-flex-direction-column">
        <LayoutSidebar />
      </aside>
      <section class="is-flex-grow-1">
        <Nuxt />
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DefaultLayout",
  };
</script>

<style>
  .root {
    min-height: 100vh;
  }
</style>
