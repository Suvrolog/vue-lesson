<template>
  <div>
    <div id="pagination" class="paginate__nav">
      <ul v-for="i in paginationList" :key="i">
        <li
          class="paginate__button"
          @click="showProducts(i)"
        >
          {{ i }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["paginationLength", "productsCount"],
  data() {
    return {
      paginationList: [],
      isActive: false,
    };
  },
  mounted() {
    this.calcPaginationButton();
  },
  beforeUpdate() {
    this.paginationList = [];
    this.calcPaginationButton();
  },
  methods: {
    showProducts(i) {
      this.$store.state.showProductsPosition = i - 1;

      window.scrollTo(0, 0);
    },
    calcPaginationButton() {
      for (let i = 0; i < this.paginationLength / this.productsCount; i++) {
        this.paginationList.push(i + 1);
      }
    },
    getActive(i) {
      this.active = this.paginationList.filter((item) => item.i == i);
      console.log(this.active);
      return true;
    },
  },
};
</script>

<style lang="scss">
.paginate {
  &__nav {
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
  &__button {
    width: 40px;
    border: solid 3px rgb(12, 140, 233);
    border-radius: 20%;
    background-color: rgb(201, 222, 241);
    flex: wrap;
    cursor: pointer;
    text-align: center;
    list-style-type: none;
    &:hover {
      background-color: rgb(12, 140, 233);
    }
  }
  .active {
    background-color: rgb(12, 140, 233);
  }
}
</style>