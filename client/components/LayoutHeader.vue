<template>
  <b-navbar type="is-primary">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon icon="home"></b-icon>
        <span>Home</span>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <nuxt-link class="button is-primary" to="/signup">
            <strong>Sign up</strong>
          </nuxt-link>
          <nuxt-link class="button is-light" to="/signin">Sign in</nuxt-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
