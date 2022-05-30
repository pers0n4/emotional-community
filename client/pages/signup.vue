<template>
  <div class="is-flex is-justify-content-center mt-6">
    <section class="card">
      <header class="card-header has-background-primary">
        <h2 class="card-header-title has-text-light">Sign Up</h2>
      </header>
      <div class="card-content">
        <div class="content">
          <b-field label="Email" label-position="on-border">
            <b-input
              v-model="email"
              icon="email"
              placeholder="Email"
              type="email"
            ></b-input>
          </b-field>
          <b-field label="Password" label-position="on-border">
            <b-input
              v-model="password"
              icon="lock"
              password-reveal
              placeholder="Password"
              type="password"
            ></b-input>
          </b-field>
          <b-field label="Confirm" label-position="on-border">
            <b-input
              v-model="confirmPassword"
              icon="lock"
              password-reveal
              placeholder="Confirm"
              type="password"
            ></b-input>
          </b-field>
          <b-field>
            <b-button class="is-right" type="is-primary" @click="signUp"
              >Next</b-button
            >
          </b-field>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "SignUpPage",
    middleware: "auth",
    auth: "guest",
    data() {
      return {
        email: "test@example.org",
        password: "",
        confirmPassword: "",
      };
    },
    methods: {
      async signUp() {
        try {
          await this.$axios.$post("/users", {
            email: this.email,
            password: this.password,
          });

          this.$router.push("/signin");
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      },
    },
  };
</script>
