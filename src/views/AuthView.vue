<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <the-slogon></the-slogon>
        <div class="m-7">
          <form @submit.prevent="submitForm">
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >Email Address</label
              >
              <input
                type="email"
                name="email"
                id="email"
                v-model.trim="email"
                placeholder="email@company.com"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div class="mb-6">
              <div class="flex justify-between mb-2">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-400"
                  >Password</label
                >
              </div>
              <input
                type="password"
                name="password"
                id="password"
                v-model.trim="password"
                placeholder="Your Password"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div v-if="mode === 'Register'" class="mb-6">
              <div class="flex justify-between mb-2">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-400"
                  >Confirm Password</label
                >
              </div>
              <input
                type="password"
                name="password"
                id="password"
                v-model.trim="retypedPassword"
                placeholder="Re tape Password"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <the-alert
              v-if="!formIsValid"
              :alert-type="'red'"
              title="Ensure that these requirements are met:"
              :infos="errorMsg"
            >
            </the-alert>

            <div class="mb-6">
              <button
                @click="submitForm"
                type="button"
                class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                {{ submitButton }}
              </button>
            </div>
            <p class="text-sm text-center text-gray-400">
              <a
                @click="switchAuthMode"
                href="#!"
                class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >{{ switchModeButton }}</a
              >.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheSlogon from "@/components/ui/TheSlogon.vue";
import TheAlert from "@/components/layouts/TheAlert.vue";

export default {
  components: {
    TheSlogon,
    TheAlert
  },
  data() {
    return {
      email: "",
      password: "",
      retypedPassword: "",
      formIsValid: true,
      errorMsg: [],
      mode: "Login"
    };
  },
  computed: {
    submitButton() {
      if (this.mode === "Login") return "Login";
      else return "Register";
    },
    switchModeButton() {
      if (this.mode === "Login") return "Don't have an account yet?";
      else return "Already have an account? click to login";
    }
  },
  methods: {
    async submitForm() {
      this.errorMsg = [];
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 7
      ) {
        this.formIsValid = false;
        if (this.email === "" || !this.email.includes("@")) {
          this.errorMsg.push("Valid email adress");
        }
        if (this.password.length < 7) {
          this.errorMsg.push("Password contain more than 7 characters");
        }
        return;
      } else if (
        this.mode === "Register" &&
        this.password !== this.retypedPassword
      ) {
        this.formIsValid = false;
        this.errorMsg.push("The passwords are identic");
        return;
      }
      try {
        if (this.mode === "Login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password
          });
        } else {
          await this.$store.dispatch("register", {
            email: this.email,
            password: this.password
          });
        }
        this.$router.replace("/dashboard");
      } catch (err) {
        this.formIsValid = false;
        this.errorMsg.push("Valid Credentials");
      }
    },

    switchAuthMode() {
      if (this.mode === "Login") {
        this.errorMsg = [];
        this.mode = "Register";
      } else {
        this.errorMsg = [];
        this.mode = "Login";
      }
    }
  }
};
</script>
