<template>
  <div class="itemPage">
    <!-- task -->

    <div class="list-group-item itemWidth">
      <div class="mb-3 itemTitle">
        <h3>{{ titleItem }}</h3>
        <span class="myPosition">
          <button class="btn btn-primary" v-on:click="delItem(itemId)">
            X
          </button>
        </span>
      </div>
      <div class="mb-1">
        <div class="mb-3">
          <button
            v-bind:class="{
              'btn-success': itemDone,
              'btn-secondary': !itemDone,
            }"
            v-on:click="itemDone = !itemDone, taskEdit(itemId, deskItem, itemDone, titleItem, updated)"
            class="btn"
          >
            {{ itemDone ? "Completed" : "In order" }}
          </button>

          <span class="mouse" v-on:click="redact = !redact">
            {{ deskItem }}
          </span>
        </div>
        <div v-bind:class="{ activeRed: redact }" class="input-group mb-1">
          <input
            type="text"
            class="form-control"
            placeholder="Add new Task"
            v-model="deskItem"
          />
          <button
            v-on:click="redact = !redact,
              taskEdit(itemId, deskItem, itemDone, titleItem, updated)
            "
            class="btn btn-primary"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
    <!-- sidebar -->
    <app-sidebar v-bind:arrayClone="arrayClone" />
  </div>
</template>

<script>
import axios from "axios";
import AppSidebar from ".././components/AppSidebar.vue";
export default {
  components: {
    "app-sidebar": AppSidebar,
  },
  data() {
    return {
      arrayClone: [],
      redact: false,
      deskItem: "",
      itemId: "",
      titleItem: "",
      itemDone: Boolean(),
      updated: new Date().toLocaleString(),
    };
  },

  methods: {
    async taskEdit(itemId) {
      await axios.put(`http://localhost:3000/todoItems/${itemId}`, {
        id: itemId,
        desc: this.deskItem,
        done: this.itemDone,
        title: this.titleItem,
        updated: this.updated,
      });
    },

    async delItem(itemId) {
      await axios.delete(`http://localhost:3000/todoItems/${itemId}`);
      this.$router.push("/tasklist");
    },
  },
  watch: {
    $route(toR) {
      this.deskItem = toR.query["desk"];
      this.itemId = toR.query["id"];
      this.titleItem = toR.query["title"];
      this.itemDone = toR.query["done"] === 'true';
    },
  },
  mounted() {
    this.deskItem = this.$route.query.desk;
    this.itemId = this.$route.query.id;
    this.titleItem = this.$route.query.title;
    this.itemDone = this.$route.query.done === "true";
    console.log(this.$route.query);
  },
  created() {
    axios
      .get("http://localhost:3000/todoItems")
      .then((response) => {
        this.arrayClone = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
.mouse {
  cursor: pointer;
}
.itemTitle {
  display: flex;
  justify-content: space-between;
}
.itemPage {
  display: flex;
  margin-top: 5%;
}
.activeRed{
  display: none;
}
.itemWidth {
  width: 78%;
  margin-right: 2%;
}
</style>