<template>
  <v-app>
    <v-app-bar app>
      <v-btn icon nuxt to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "DefaultLayout",
    data() {
      return {
        title: "Vuetify.js",
      };
    },
  };
</script>
