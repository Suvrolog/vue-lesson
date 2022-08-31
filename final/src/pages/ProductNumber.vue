<template>
  <div>
    <p>Спасибо за заказ!</p>
    <p>Номер вашего заказа <span>№ {{ productId }}</span></p>
    <p>Наш менеджер свяжется с вами в ближайшее время</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productId: "",
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:3000/listBasket")
      .then((response) => this.productId = response.data[response.data.length - 1].id)
      .catch((error) => console.log(error));
    localStorage.removeItem("listBasket")
  },
  unmounted(){
    location.reload()
  }
};
</script>