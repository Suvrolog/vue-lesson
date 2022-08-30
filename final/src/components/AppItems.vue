<template>
  <div>
    <app-item v-bind:itemList="productsShow" />
    <app-pagination
      :paginationLength="products.length"
      :productsCount="productsCount"
    />
  </div>
</template>

<script>
//расшифровкой нижележащего кода можно пытать людей...
import AppItem from "../components/AppItem.vue";
import AppPagination from "../components/AppPagination.vue";
import { mapState } from "vuex";

export default {
  props: ["products"],
  components: {
    "app-item": AppItem,
    "app-pagination": AppPagination,
  },
  computed: {
    ...mapState(["showProductsPosition"]),
  },
  data() {
    return {
      productsShow: [],
      productsCount: 8,
    };
  },
  mounted() {
    this.showProducts(this.showProductsPosition);
  },
  methods: {
    showProducts(showProductsPosition) {
      const start = showProductsPosition * this.productsCount;
      const end =
        showProductsPosition * this.productsCount + this.productsCount;
      this.productsShow = this.products.slice(start, end);
    },
  },
  watch: {
    products: {
      handler() {
        if (this.$store.state.showProductsPosition === 0) {
            this.showProducts(this.showProductsPosition);
        } else {
            this.$store.state.showProductsPosition = 0;
        }
      },
      deep: true,
    },
    showProductsPosition: {
      handler() {
        this.showProducts(this.showProductsPosition);
      },
      deep: true,
    },
  },
};
</script>