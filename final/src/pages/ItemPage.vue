<template>
  <section class="itItem">
    <div>
      <h3>{{ this.itItem[0].title }}</h3>
      <div class="itItem__top">
        <div class="itItem__carousel">
          <app-carousel v-bind:itemList="this.itItem" />
        </div>
        <div class="itItem__buy">
          <p>Цена: {{ sumPrice(this.itItem[0]) }} $</p>

          <app-counter-item
            v-bind:item="itItem[0]"
            v-bind:id="this.itItem[0].id"
          />
        </div>
      </div>

      <ul class="itItem__ul">
        <li
          v-bind:class="{ active: this.charact }"
          @click="
            (this.charact = true), (this.descr = false), (this.rating = false)
          "
          class="itItem__li"
        >
          Характеристики
        </li>

        <li
          v-bind:class="{ active: this.descr }"
          @click="
            (this.charact = false), (this.descr = true), (this.rating = false)
          "
          class="itItem__li"
        >
          Описание
        </li>

        <li
          v-bind:class="{ active: this.rating }"
          @click="
            (this.charact = false), (this.descr = false), (this.rating = true)
          "
          class="itItem__li"
        >
          Отзывы
        </li>
      </ul>
      <div class="itItem__show" v-show="charact">
        {{ this.itItem[0].title }}
      </div>
      <div class="itItem__show" v-show="descr">
        {{ this.itItem[0].description }}
      </div>
      <div class="itItem__show" v-show="rating">
        <p>UserName</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          voluptates, assumenda error laudantium in laboriosam dolorum sint eos
          nemo cupiditate consectetur ducimus quam. Error aspernatur rem alias
          veniam molestiae neque?
        </p>
      </div>
      <div>
        <h3>Топ продаж</h3>
        <app-top-item :itemsToShow="4" v-bind:itemList="itemList" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppCarousel from ".././components/AppCarousel.vue";
import AppCounterItem from "../components/AppCounterItem.vue";
import AppTopItem from "../components/AppTopItem.vue";

export default {
  data() {
    return {
      itItem: "",
      charact: true,
      descr: false,
      rating: false,
      id: this.$router.currentRoute.value.params.id,
    };
  },
  components: {
    "app-carousel": AppCarousel,
    "app-counter-item": AppCounterItem,
    "app-top-item": AppTopItem,
  },
  computed: {
    ...mapState(["itemList","listBasket"]),
  },
  methods:{
    ...mapMutations(["getItem"]),
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
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
      this.itItem = this.itemList.filter((item) => {
        return item.id == this.id;
      });
    },
  },
    created() {
    if (JSON.parse(localStorage.getItem("listBasket") != null))
      this.$store.state.listBasket = JSON.parse(
        localStorage.getItem("listBasket")
      );
      if (JSON.parse(localStorage.getItem("itemList") != null))
      this.$store.state.itemList = JSON.parse(
        localStorage.getItem("itemList")
      );
      this.itItem = this.itemList.filter((item) => {
      return item.id == this.id;
    });
    window.scrollTo( 0, 0 );
  },
};
</script>

<style lang="scss">
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.itItem {
  &__top {
    display: flex;
  }
  &__ul {
    margin-top: 50px;
    display: flex;
    width: 500px;
    justify-content: space-between;
  }
  &__li {
    list-style-type: none;
    cursor: pointer;
    background-color: rgb(201, 222, 241);
    padding: 5px 10px;
    border-radius: 7px 7px 0px 0px;
  }
  &__carousel {
    width: 70%;
  }
  &__buy {
    margin-left: 40px;
    display: flex;
    justify-content: space-around;
    height: 40px;
  }
  &__show {
    background-color: rgb(12, 140, 233);
    padding: 20px 5px;
    margin-top: -20px;
    border-radius: 7px;
  }
  &__counter {
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    &-input {
      width: 50px;
      text-align: center;
      margin: 0;
      border: none;
    }
  }
  &__button {
    &-count {
      border: 1px solid #bdbdbd;
      background-color: white;
      border: none;
    }
    &-buy {
      background-color: rgb(87, 222, 84);
      color: white;
      border: none;
      border-radius: 5px;
      padding: 2px 25px 6px 25px;
      margin-left: 10px;
    }
  }
}

.active {
  background-color: rgb(12, 140, 233);
}
</style>