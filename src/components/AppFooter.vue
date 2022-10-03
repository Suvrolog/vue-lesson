<template>
  <section class="footer">
    <address>Moscow 123456, b123 st. 212dsaasd</address>
    <span>all rights reserved</span>
  </section>
</template>

<script>
export default {
  name: "app-footer",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footer {
  justify-content: space-between;
  height: 70px;
  align-items: center;
  display: flex;
  background-color: #c9def1;
}
</style>
