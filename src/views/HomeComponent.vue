<template>
  <div>
    <app-menu />
    <form
      class="row gx-3 gy-2 align-items-center centralize"
      @submit.prevent="onSubmit"
    >
      <div class="col-sm-3">
        <label class="visually-hidden" for="specificSizeInputGroupUsername"
          >email</label
        >
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            v-model="$store.state.formData.email"
            id="specificSizeInputGroupUsername"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="col-sm-3">
        <label class="visually-hidden" for="specificSizeInputName"
          >Password</label
        >
        <input
          type="text"
          class="form-control"
          v-model="$store.state.formData.password"
          id="specificSizeInputName"
          placeholder="Password"
        />
      </div>
      <div class="col-auto">
        <router-link
          :to="`/tasklist`"
          custom
          v-slot="{ isActive, isExactActive }"
        >
          <button
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
            @click="submit"
            type="submit"
            class="btn btn-primary"
          >
            {{ loginForm ? "Login" : "Register" }}
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import AppMenu from ".././components/AppMenu.vue";

export default {
  components: {
    "app-menu": AppMenu,
  },
  data() {
    return {
      loginForm: false,
      setUser: "",
    };
  },
  methods: {
    async onSubmit() {
      localStorage.setItem("user", JSON.stringify(this.$store.state.formData));
      await axios
        .post("http://localhost:3000/formData", this.$store.state.formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$router.push("../tasklist");
    },
  },

  mounted() {
    if (JSON.parse(localStorage.getItem("user") != null)) {
      this.$router.push("../tasklist");
    } else {
      this.loginForm = false;
    }
  },
};
</script>

<style scoped>
.centralize {
  justify-content: center;
}
</style>