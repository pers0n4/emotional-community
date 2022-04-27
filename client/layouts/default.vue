<template>
  <v-app>
    <v-app-bar app>
      <v-btn icon nuxt to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu bottom offset-y right>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item nuxt to="/signin">
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item>
          <v-list-item nuxt to="/signup">
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
