<template>
  <div class="is-flex is-justify-content-center mt-6">
    <section class="card">
      <header class="card-header has-background-primary">
        <h2 class="card-header-title has-text-light">Sign In</h2>
      </header>
      <div class="card-content">
        <div class="content">
          <b-field label="Email" label-position="on-border">
            <b-input
              v-model="email"
              icon="email"
              placeholder="Email"
              size="is-medium"
              type="email"
            ></b-input>
          </b-field>
          <b-field label="Password" label-position="on-border">
            <b-input
              v-model="password"
              icon="lock"
              password-reveal
              placeholder="Password"
              size="is-medium"
              type="password"
            ></b-input>
          </b-field>
          <b-field label="Confirm" label-position="on-border">
            <b-input
              v-model="confirmPassword"
              icon="lock"
              password-reveal
              placeholder="Confirm"
              size="is-medium"
              type="password"
            ></b-input>
          </b-field>
          <b-field>
            <b-button class="is-right" type="is-primary">Next</b-button>
          </b-field>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "SignUpPage",
    data() {
      return {
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
  };
</script>
