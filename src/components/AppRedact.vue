<template>
<div>
  <div class="input-group mb-3" v-if="isActive">
    <input
      type="text"
      class="form-control"
      placeholder="Add new Task"
      v-bind:value=value
    />
    <button v-on:click="x" class="btn">X</button>
  </div>
</div>
</template>

<script>
export default {
  props: ['value', 'isActive'],
  data() {
    return {
      active: false
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
