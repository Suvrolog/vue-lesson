<template>
  <div>
    <!-- <app-carousel v-bind:itemList="itemList"/> -->

    <v-carousel 
      hide-delimiters 
      cycle
    >
      <v-carousel-item
        v-for="item in this.itemList"
        :key="item.id"
        transition="fade-transition"
        reverse-transition="fade-transition"
      >
        <router-link
          :to="{
            path: `/products/${item.id}`,
          }"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
      <v-img
            :aspect-ratio="16 / 9"
            height="100%" :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
            @click="navigate" :src="item.image" :alt="item.title"></v-img>
      </router-link>
      </v-carousel-item>
    </v-carousel>

    <div>
      <h3 class="head-name">Товары</h3>
      <app-item v-bind:itemList="itemList"/>
    </div>
    <div>
      <h3 class="head-name">Топ продаж</h3>
      <app-top-item :itemsToShow='4' v-bind:itemList="itemList"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

import AppItem from ".././components/AppItem.vue";
import AppTopItem from "../components/AppTopItem.vue";

export default {
  components: {

    "app-item": AppItem,
    "app-top-item": AppTopItem,
  },
  setup() {},
  computed: {
    ...mapState(["itemList"]),
  },

  methods: {
    ...mapMutations(["getItem"]),
    ...mapActions(["loadItem"]),
  },
   mounted() {
      this.$store.dispatch("loadItem");
     window.scrollTo( 0, 0 );
    },
};
</script>

<style lang="scss" >
  .head-name{
    margin-top: 90px;
    margin-bottom: 30px;
  }
</style>