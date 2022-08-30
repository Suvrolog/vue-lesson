<template>

    <Carousel :autoplay="1" :pauseAutoplayOnHover="true" :transition='7000'>
    <Slide v-for="item in itemList" :key="item">



  <div class="item">
    <div class="item__cart">
      <div class="item__img">
        <router-link
          :to="{
            path: `/products/${item.id}`,
          }"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
          ><img
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
            @click="navigate"
            :src="item.image"
            :alt="item.title"
          />
        </router-link>
      </div>
      <div class="item__text">
        <h6 class="item__title">{{ item.title }}</h6>
        <div class="item__price">
          <p>{{ sumPrice(item) }} $</p>

          <app-counter-item v-bind:item="item" v-bind:id="item.id"/>
          
        </div>
      </div>
    </div>
  </div>

</Slide>

    <template #addons>
      
    </template>
  </Carousel>

</template>

<script>
import { Carousel,   Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

import { mapMutations, mapState } from "vuex";
import AppCounterItem from "./AppCounterItem.vue";

export default {
    name: 'app-top-item',
  props: ['itemList'],
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
          return item.price * needItem.length;
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
.item {
  display: flex;
  margin-bottom: 20px;
  &__cart {
    border-radius: 20%;
    background: linear-gradient(to top, rgb(196, 196, 196) 50%, white 50%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 335px;
    height: 350px;
    border: 1px solid rgb(196, 196, 196);
    margin-top: 30px;
  }
  &__title{
    height: 4.8ch;
    margin-top: 15px;
    padding-left: 35px;
    padding-right: 35px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__img {
    height: 46%;
    margin-top: 2%;
    margin-bottom: 2%;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
  &__price {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    align-self: center;
  }
 
}

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
