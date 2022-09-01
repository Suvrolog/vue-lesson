<template>
  <section class="category">
    <form>
      <input
        name="filter"
        type="radio"
        checked
        id="all"
        v-on:click="this.filter = `all`"
      />
      <label for="all">Все товары</label>

      <input
        v-on:click="this.filter = `men`"
        name="filter"
        type="radio"
        id="men"
      />
      <label for="men">Мужские вещи</label>

      <input
        v-on:click="this.filter = `women`"
        name="filter"
        type="radio"
        id="women"
      />
      <label for="women">Женские вещи</label>

      <input
        v-on:click="this.filter = `jewelery`"
        name="filter"
        type="radio"
        id="jewelery"
      />
      <label for="jewelery">Ювелирные изделия</label>

      <input
        v-on:click="this.filter = `electronics`"
        name="filter"
        type="radio"
        id="electronics"
      />
      <label for="electronics">Электроника</label>
    </form>
    
    <app-items class="mt-6" v-bind:products="filteredItems()" />

    <h6>Топ продаж</h6>
    <app-top-item :itemsToShow="4" v-bind:itemList="itemLst" />
  </section>
</template>

<script>
import AppItems from "../components/AppItems.vue";
import { mapState,mapGetters,mapActions } from "vuex";
import AppTopItem from "../components/AppTopItem.vue";

export default {
  components: {
    "app-items": AppItems,
    "app-top-item": AppTopItem,
  },
  data() {
    return {
      filter: `all`,
      page: 1,
      paginationItemsPage: 8,
      paginationOffset: 0,
      filteredArr: "",
      listBasket: this.$store.state.listBasket,
      itemLst:'',
    };
  },
  computed: {
    ...mapState(["itemList"]),
    ...mapActions("loadItem"),
    pagesCount() {
      return Math.ceil(this.paginationItemTotal / this.paginationItemsPage);
    },
    ...mapGetters(["itemAll", "itemMen", "itemJewelery","itemElectronics","iitemWomen"]),
  },
  methods: {

    filteredItems() {
      if (this.filter == `all`) return this.$store.getters.itemAll;
      if (this.filter == `men`) return this.$store.getters.itemMen;
      if (this.filter == `jewelery`) return this.$store.getters.itemJewelery;
      if (this.filter == `electronics`)
        return this.$store.getters.itemElectronics;
      if (this.filter == `women`) return this.$store.getters.itemWomen;
    },
    
  },
   created() {
    this.loadItem
    console.log("load")
    if (JSON.parse(localStorage.getItem("itemList") != null)){
      this.itemLst = JSON.parse(
        localStorage.getItem("itemList")
      );}else{
      this.itemLst = this.$store.state.itemList
      }
  },
};
</script>

<style lang="scss" scoped>
input[type="radio"] {
  display: none;

  &:checked {
    + label {
      background: rgb(87, 222, 84);
      border-color: rgb(87, 222, 84);
      color: #fff;
      transition: all 125ms ease-out;
    }
  }
}

label {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  color: #444;
  cursor: pointer;
  font-size: 11px;
  display: inline-block;
  padding: 10px;
  text-transform: uppercase;
  transition: none;
}

input,
label {
  margin-left: 10px;
}
</style>