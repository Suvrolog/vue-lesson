<template>
  <div>
    <h3>Задание 3</h3>
    <input type="number" class="input-group mb-1" v-model.trim="price" />
    <ul class="list-group">
      <li class="list-group-item">
        {{ convert }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: "",
    };
  },
  props: {
    sum: Number,
    todoLength: Number,
  },
  computed: {
    convert: function () {
      var num = this.price.toString();
      return (
        num.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ") + " руб."
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
