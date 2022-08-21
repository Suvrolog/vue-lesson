<template>
  <div class="itemPage">
    <!-- task -->

    <div class="list-group-item itemWidth">
      <div class="mb-3 itemTitle">
        <h3>{{ itItem[0].title }}</h3>
        <span class="myPosition">
          <button class="btn btn-primary" v-on:click="delItem()">
            X
          </button>
        </span>
      </div>
      <div class="mb-1">
        <div class="mb-3">
          <button
            v-bind:class="{
              'btn-success': this.itItem[0].done,
              'btn-secondary': !this.itItem[0].done,
            }"
            v-on:click="
              (this.itItem[0].done = !this.itItem[0].done),
                taskEdit()
            "
            class="btn"
          >
            {{ this.itItem[0].done ? "Completed" : "In order" }}
          </button>

          <span class="mouse" v-on:click="redact = !redact">
            {{ itItem[0].desc }}
          </span>
        </div>
        <div v-bind:class="{ activeRed: redact }" class="input-group mb-1">
          <input
            type="text"
            class="form-control"
            placeholder="Add new Task"
            v-model="itItem[0].desc"
          />
          <button
            v-on:click="
              (redact = !redact),
                taskEdit()
            "
            class="btn btn-primary"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
    <!-- sidebar -->
    <app-sidebar v-bind:arrayClone="$store.state.arrayClone" />
  </div>
</template>

<script>
import axios from "axios";
import AppSidebar from ".././components/AppSidebar.vue";
import { mapState } from "vuex";
export default {
  components: {
    "app-sidebar": AppSidebar,
  },
  data() {
    return {
      itItem: "",
      redact: false,
      id: this.$router.currentRoute.value.params.id,
    };
  },
  computed: {
    ...mapState(["todoItems", "arrayClone", "created", "updated"]),
  },

  methods: {
    async taskEdit() {
      console.log(this.itItem)
      await axios.put(`http://localhost:3000/todoItems/${this.id}`, {
        id: this.id,
        desc: this.itItem[0].desc,
        done: this.itItem[0].done,
        title: this.itItem[0].title,
        updated: this.updated,
      });
    },

    async delItem() {
      await axios.delete(`http://localhost:3000/todoItems/${this.id}`);
      this.$router.push("/tasklist");
    },
  },
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
      this.itItem = this.$store.state.arrayClone.filter((item) => {
        return item.id == this.id;
      });
    },
  },

  created() {
    this.itItem = this.$store.state.arrayClone.filter((item) => {
        return item.id == this.id;
    });
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
.activeRed {
  display: none;
}
.itemWidth {
  width: 78%;
  margin-right: 2%;
}
</style>