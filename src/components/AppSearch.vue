<template>
  <form class="input-group mb-3" action="" v-on:submit.prevent="filterTask">
    <div class="input-group mb-3">
      <input
        placeholder="Search"
        class="form-control"
        type="text"
        v-model.trim="this.$store.state.search"
      />
      <button class="btn btn-primary" type="submit">Search</button>
    </div>
  </form>
</template>


<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["todoItems", "arrayClone", "created", "updated", "search"]),
    filterTask() {
      return this.$store.getters.filterTask;
    },
  },
  methods:{
    ...mapState(["updateArrayClone"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
