<template>
  <v-layout align-center fill-height justify-center>
    <v-flex md4 sm8 xs12>
      <v-card elevation-12>
        <v-toolbar color="primary">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              label="Username"
              name="username"
              prepend-icon="mdi-account"
              :rules="usernameRules"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="passwordConfirm"
              :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              counter
              label="Confirm Password"
              name="password-confirm"
              prepend-icon="mdi-lock"
              :rules="passwordConfirmRules"
              :type="showPasswordConfirm ? 'text' : 'password'"
              @click:append="showPasswordConfirm = !showPasswordConfirm"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!valid" @click="validate"
            >Sign Up</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "SignUpPage",
    data() {
      return {
        valid: true,
        username: "",
        usernameRules: [(v) => !!v || "Username is required"],
        password: "",
        passwordRules: [(v) => !!v || "Password is required"],
        passwordConfirm: "",
        passwordConfirmRules: [
          (v) => !!v || "Password confirmation is required",
          (v) => v === this.password || "Password confirmation doesn't match",
        ],
        showPassword: false,
        showPasswordConfirm: false,
      };
    },
    methods: {
      validate() {
        this.$refs.form.validate();
      },
    },
  };
</script>
