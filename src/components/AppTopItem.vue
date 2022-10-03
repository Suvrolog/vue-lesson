<template>
  <Carousel :autoplay="1" :pauseAutoplayOnHover="true" :transition="7000">
    <Slide v-for="item in itemList" :key="item">
      <v-row class="mb-5" justify="space-between">
        <v-card
          class="mb-3 rounded-xl"
          width="335px"
          height="370px"
          :key="item"
        >
          <router-link
            :to="{
              path: `/products/${item.id}`,
            }"
            custom
            v-slot="{ navigate, isActive, isExactActive }"
            ><v-img class="mt-5 pointer"
              :aspect-ratio="16 / 9"
              width="333px"
              height="192px"
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
              ]"
              @click="navigate"
              :src="item.image"
              :alt="item.title"
            />
          </router-link>
          <div class="item__cart">
            <v-card-title>{{ item.title }}</v-card-title>
            <v-row
              class="blue-grey lighten-3 ml-1 mr-1 mt-5"
              justify="space-between"
            >
              <v-card-text>{{ sumPrice(item) }} $</v-card-text>
              <v-card-actions>
                <app-counter-item v-bind:item="item" v-bind:id="item.id" />
              </v-card-actions>
            </v-row>
          </div>
        </v-card>
      </v-row>
    </Slide>

    <template #addons> </template>
  </Carousel>
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

import { mapMutations, mapState } from "vuex";
import AppCounterItem from "./AppCounterItem.vue";

export default {
  name: "app-top-item",
  props: ["itemList"],
  components: {
    Carousel,
    Slide,

    "app-counter-item": AppCounterItem,
  },
  computed: {
    ...mapState(["listBasket"]),
  },

  methods: {
    ...mapMutations(["buyItem"]),
    sumPrice(item) {
      if (this.listBasket.length == 0) {
        return item.price;
      } else {
        let needItem = this.listBasket.filter(
          (product) => product.id == item.id
        );
        if (needItem.length > 1) {
          return Math.ceil(item.price * needItem.length * 100) / 100;
        } else {
          return item.price;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item__cart {
  margin-top: 10px;
  background: rgb(196, 196, 196);
  height: 350px;
}
.pointer{
  cursor: pointer;
}
</style>
