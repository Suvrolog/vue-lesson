<template>
  <Carousel :autoplay="3000" :wrap-around="true">
    <Slide v-for="item in itemList" :key="item">


      <router-link
          :to="{
            path: `/products/${item.id}`,
          }"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
      <img :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
            @click="navigate" class="carousel__item" :src="item.image" :alt="item.title">
      </router-link>

    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>


import { defineComponent } from 'vue';
import { Carousel, Navigation,  Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'app-carousel',
  props: ['itemList'],
  components: {
    Carousel,
    Slide,
   
    Navigation,
  },
});
</script>

<style>
.carousel__item {
  min-height: 200px;
  width: 15%;
  background-color: var(--vc-clr-primary);
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
