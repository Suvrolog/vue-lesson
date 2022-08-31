<template>
  <div class="item">
    <div class="item__cart" v-for="item in itemList" :key="item">
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

          <app-counter-item v-bind:item="item" v-bind:id="item.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import AppCounterItem from "./AppCounterItem.vue";

export default {
  name: "app-item",
  props: ["itemList"],
  components: {
    "app-counter-item": AppCounterItem,
  },
  computed: {
    ...mapState(["listBasket"]),
  },
  mounted() {
    console.log(this.$store.state.listBasket);
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
                return (Math.ceil(((item.price * needItem.length)*100))/100);
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
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  &__title {
    height: 4.8ch;
    margin-top: 15px;
    padding-left: 35px;
    padding-right: 35px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__cart {
    border-radius: 20%;
    background: linear-gradient(to top, rgb(196, 196, 196) 50%, white 50%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 335px;
    height: 350px;
    border: 1px solid rgb(196, 196, 196);
    margin-top: 30px;
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
</style>
