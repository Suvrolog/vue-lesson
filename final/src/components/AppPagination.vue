<template>
  <div>
    <div id="pagination">
      <ul class="paginate__nav">
        <li class="paginate__button">
          <button
            @click="showProducts(this.$store.state.showProductsPosition, 'prev')"
            :disabled="this.$store.state.showProductsPosition === 0"
          >
            &lt;
          </button>
        </li>
        <li
          v-for="i in paginationList"
          :key="i"
          class="paginate__button"
          :class="{ active: i === this.$store.state.showProductsPosition + 1 }"
          @click="showProducts(i)"
        >
          {{ i }}
        </li>
        <li class="paginate__button">
          <button
            @click="showProducts(this.$store.state.showProductsPosition, 'next')"
            :disabled="
              this.$store.state.showProductsPosition === this.maxPageCount - 1
            "
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";

export default {
  props: ["paginationLength", "productsCount"],
  state() {
    return {
      showProductsPosition: 0,
    };
  },
  data() {
    return {
      paginationList: [],
      isActive: false,
      maxPageCount: 0,
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
    // ...mapMutations(["showProducts"]),
    showProducts(i, arrowName) {
      switch (arrowName) {
        case "prev":
          this.$store.state.showProductsPosition = i - 1;
          break;
        case "next":
          this.$store.state.showProductsPosition = i + 1;
          break;
        default:
          this.$store.state.showProductsPosition = i - 1;
          break;
      }
      window.scrollTo(0, 0);
    },
    calcPaginationButton() {
      this.maxPageCount = Math.ceil(this.paginationLength / this.productsCount);
      for (let i = 0; i < this.maxPageCount; i++) {
        this.paginationList.push(i + 1);
      }
    },
  },
};
</script>

<style lang="scss">
.paginate {
  &__nav {
    padding-top: 50px;
    display: flex;
    justify-content: center;
  }
  &__button {
    margin: 0 5px;
    width: 40px;
    height: 40px;
    border: solid 3px rgb(12, 140, 233);
    border-radius: 20%;
    background-color: rgb(201, 222, 241);
    cursor: pointer;
    text-align: center;
    list-style-type: none;
    &:hover {
      background-color: rgb(12, 140, 233);
    }
    &.active {
      background-color: rgb(13,110,253);
    }
  }
  .active {
    background-color: rgb(12, 140, 233);
  }
}
</style>