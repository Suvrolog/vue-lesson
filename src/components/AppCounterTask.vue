<template>
  <div>
    <ul class="list-group mb-3 d-flex column">
      <li class="list-group-item">Completed tasks {{ sum }}</li>
      <li class="list-group-item">All tasks {{ todoLength }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    sum: Number,
    todoLength: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
