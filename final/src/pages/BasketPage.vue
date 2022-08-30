<template>
  <section class="basket">
    <div class="basket__main">
      <div class="basket__item">
        <div><h3>Ваша корзина</h3></div>
        <p v-if="listBasket.length == 0">Ваша корзина пуста</p>
        <app-item v-bind:itemList="uniqueItem()" />
      </div>
      <div class="basket__buyForm">
        <p>Итого: {{ basketSum() }}$</p>
        <form v-show="buyForm" lass="basket__form" action="">
          <input
            v-model="client.name"
            class="basket__input"
            type="text"
            placeholder="Ваше имя"
          />
          <input
            v-model="client.number"
            class="basket__input"
            type="text"
            placeholder="Номер телефона"
          />
          <input
            v-model="client.adress"
            class="basket__input"
            type="text"
            placeholder="Адрес"
          />
          <input
            v-model="client.city"
            class="basket__input"
            type="text"
            placeholder="Город"
          />
          <button @click.prevent="createBuy" class="basket__button">
            Оформить
          </button>
        </form>
        <button
          v-show="!buyForm"
          @click="buyForm = !buyForm"
          class="basket__button"
        >
          Оформить
        </button>
      </div>
    </div>
    <div>
      <h3>Топ продаж</h3>
      <app-top-item
        :itemsToShow="3"
        class="basket__topItem"
        v-bind:itemList="itemList"
      />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import AppItem from ".././components/AppItem.vue";
import { mapState } from "vuex";
import AppTopItem from "../components/AppTopItem.vue";

export default {
  data() {
    return {
      client: {
        name: "",
        number: "",
        adress: "",
        city: "",
      },
      buyForm: false,
    };
  },
  components: {
    "app-item": AppItem,
    "app-top-item": AppTopItem,
  },
  computed: {
    ...mapState(["itemList", "listBasket"]),
  },
  methods: {
    uniqueItem() {
      let ids = [];
      
      return this.listBasket.filter(item => {
        const isIdExist = ids.indexOf(item.id) === -1;
        if (ids.indexOf(item.id) === -1) ids.push(item.id);
        return isIdExist;
      });
    },
    async createBuy() {
      if (
        this.client.name != "" &&
        this.client.number != "" &&
        this.client.adress != "" &&
        this.client.city != ""
      ) {
        await axios
          .post(
            "http://localhost:3000/listBasket",
            { product: this.$store.state.listBasket, client: this.client },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log(this.$store);
        this.$router.push("../productNumber");
      } else {
        alert("Вы ввели не все данные!");
      }
    },
    basketSum() {
      if (this.listBasket.length != 0){
      let basketSum = [];
      this.listBasket.forEach((item) => basketSum.push(item.price));
      const total = basketSum.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      return total;
      }else{
        return 0
      }
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem("listBasket") != null))
      this.$store.state.listBasket = JSON.parse(
        localStorage.getItem("listBasket")
      );
      window.scrollTo( 0, 0 );
  },
};
</script>

<style lang="scss" scoped>
.basket {
  &__buyForm {
    position: fixed;
    right: 2.5%;
    padding-top: 80px;
  }
  &__main {
    display: flex;
  }
  &__item {
    width: 75%;
  }
  &__form {
    width: 300px;
    display: flex;
  }
  &__input {
    display: block;
    margin-bottom: 0.25rem;
    width: 334px;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  &__topItem {
    width: 75%;
  }
  &__button {
    background-color: rgb(87, 222, 84);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 7px 20px 10px 20px;

    width: 334px;
  }
}
</style>
