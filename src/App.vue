<template>
  <v-app>
    <v-main>
      <app-header :listBasket="listBasket.length" />
      <router-view class="margin" />
      <app-footer />
    </v-main>
  </v-app>
</template>

<script>

import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["listBasket"]),
  },
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter,
  },
  methods: {
    // calcListBasketLength() {
    //   return this.listBasket.length === 0 ? 0 : this.listBasket.length;
    // }
  },
};
</script>

<style lang="scss">
#app {
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.margin {
  padding-top: 80px;
}
</style>