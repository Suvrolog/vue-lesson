<template>
  <div>
    <app-carousel v-bind:itemList="itemList"/>
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
import AppCarousel from ".././components/AppCarousel.vue";
import AppItem from ".././components/AppItem.vue";
import AppTopItem from "../components/AppTopItem.vue";

export default {
  components: {
    "app-carousel": AppCarousel,
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