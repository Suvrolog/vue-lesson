<template>
  <div class="counter">
    <div v-show="!showButton(item)" class="counter__count">
      <button @click="delItem(item)" class="counter__button">-</button>
      <input class="counter__input" type="number" v-bind:value="counterValue(item)" />
      <button @click="buyItem(item)" class="counter__button">+</button>
    </div>
    <button
      @click="buyItem(item)"
      v-show="showButton(item)"
      class="counter__buyButton"
    >
      Купить
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "app-counter",
  props: {
    id: Number,
    item: Object,
  },

  computed: {
    ...mapState(["listBasket"]),
  },
  methods: {
    ...mapMutations(["buyItem", "delItem"]),
    showButton(item) {
     let needItem = this.listBasket.filter((product) => product.id == item.id);
     if(needItem.length == 0 ){
      return true;
     } else {
      return false;
     }
    },
    counterValue(item){
      let needItem = this.listBasket.filter((product) => product.id == item.id);
      return needItem.length
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.counter {
  &__count {
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    background-color: white;
    padding-bottom: -5px;
  }
  &__input {
    width: 50px;
    text-align: center;
    margin: 0;
    border: none;
  }

  &__button {
    border: 1px solid #bdbdbd;
    background-color: white;
    border: none;
  }
  &__buyButton {
    background-color: rgb(87, 222, 84);
    color: white;
    border: none;
    border-radius: 8%;
    padding: 2px 25px 6px 25px;
    margin-top: -8px;
  }
}
</style>
