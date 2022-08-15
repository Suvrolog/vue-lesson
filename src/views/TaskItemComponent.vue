<template>
  <div class="about">
    <h1>Task by Id {{id}} </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$router.currentRoute.value.params.id
    }
  },
}
</script>