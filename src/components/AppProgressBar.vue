<template>
  <div class="progress">
    <div class="progress-bar" v-bind:style="progressCalc"></div>
  </div>
</template>

<script>
export default {
  props: {
    max: Number,
    complete: Number,
  },
  computed: {
    progressCalc() {
      let width = (this.complete / this.max) * 100;
      return {
        width: width + "%",
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
