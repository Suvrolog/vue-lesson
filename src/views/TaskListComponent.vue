<template>
  <div class="sample">
    <div id="headers" class="myposition mb-3">
      <span><h2>Please add new task</h2></span>

      <button @click="logout" type="submit" class="btn btn-warning">
        Logout
      </button>
    </div>
    <form v-on:submit.prevent="addTask">
      <div>
        <input
          type="text"
          class="form-control"
          v-model.trim="$store.state.todoItems.title"
          placeholder="Add Title Task"
        />
      </div>
      <div class="mb-3">
        <textarea
          type="text"
          class="form-control"
          v-model.trim="$store.state.todoItems.desc"
          placeholder="Add new Task"
        />
      </div>
      <button
        type="submit"
        v-bind:class="buttonSwitch"
        class="btn mb-3 mywidth"
      >
        Add
      </button>
    </form>

    <app-counter-task v-bind:todoLength="$store.state.todoItems.length" v-bind:sum="sum()" />

    <app-progress-bar
      class="mb-3"
      v-bind:max="$store.state.todoItems.length"
      v-bind:complete="sum()"
    ></app-progress-bar>
    <app-search/>
    <!-- filter -->
    <div>
      <div
        class="btn-group mb-3"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          v-on:click="filterAll"
          autocomplete="off"
          checked
        />
        <label class="btn btn-outline-primary" for="btnradio1">All Task</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          v-on:click="filterTrue"
          autocomplete="off"
        />
        <label class="btn btn-outline-primary" for="btnradio2"
          >Comleted Task</label
        >

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          v-on:click="filterFalse"
          autocomplete="off"
        />
        <label class="btn btn-outline-primary" for="btnradio3"
          >Uncompleted Task</label
        >
      </div>
      
    </div>

    <!-- Item -->
    <ul class="list-group">
      <li
      v-bind:class="{
                'task-success': item.done,
                'task-secondary': !item.done,
              }"
        class="list-group-item"
        v-for="item in $store.state.arrayClone"
        :key="item.id"
        :item="item"
      ><router-link
                :to="{
                  path: `/tasklist/${item.id}`,
                
                }"
                custom
                v-slot="{ navigate, isActive, isExactActive }"
              >
        <div class="mb-1 mouse" :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                  ]"
                  @click="navigate">
          <div class="mb-3" >
            <div class="mb-3"
            >
              
                <h3
                >
                  Title task: {{ item.title }} 
                </h3>
              
            </div>
            <span>
              Task text: {{ item.desc }}
            </span>
          </div>
        </div>
        </router-link>
      </li>
    </ul>
    <a class="btn btn-primary myPosition active" href="#headers">^</a>
  </div>
</template>

<script>
import AppProgressBar from ".././components/AppProgressBar.vue";
import AppCounterTask from ".././components/AppCounterTask.vue";
import AppSearch from ".././components/AppSearch.vue";
import axios from "axios";
import { mapMutations, mapState } from 'vuex'

export default {
  name: "App",
  components: {
    "app-progress-bar": AppProgressBar,
    "app-counter-task": AppCounterTask,
    "app-search":AppSearch,
  },

  data() {
    return {

      i:1,
      done: "",
      desc: "",
      title: "",
    };
  },

    computed: {
      ...mapState(["todoItems","arrayClone","created","updated","search"]),
    buttonSwitch() {
      
      return {
        "btn-secondary": this.$store.state.todoItems.desc == undefined,
        "btn-primary": this.$store.state.todoItems.desc != undefined,
      };
    },

  },

  methods: {
    ...mapMutations(["addTask","filterFalse","filterTrue","filterAll"]),
    doneTask() {
      this.$store.state.arrayClone = this.$store.state.todoItems.filter((item) => item.done);
      return this.$store.state.arrayClone.length;
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
    
    sum() {
      let sum = this.$store.state.todoItems.filter((item) => item.done);
      return sum.length;
    },
  },

  watch: {
    todoItems: {
      handler() {
        if (this.$store.state.todoItems.length !== 0) {
          localStorage["arrayLocal"] = JSON.stringify(this.$store.state.todoItems);
          localStorage["id"] = JSON.stringify(this.i);
        }
      },
      deep: true,
    },
  },


  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("user") !== null) {
      next(true);
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/todoItems")
      .then((response) => {
        this.$store.state.todoItems = response.data;

        if (response.data.length !== 0) {
          const ids = response.data.map(item => item.id);
          this.$store.state.i = Math.max.apply(ids) + 1;
          this.$store.state.arrayClone = this.$store.state.todoItems;
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
.myPosition {
  right: 2%;
  position: absolute;
  display: inline-flex;
  justify-content: space-between;
}
.active {
  display: none;
}

.myposition {
  display: flex;
  justify-content: space-between;
}
.mywidth {
  width: 100%;
}
.task-success{
  background-color: rgb(25,135,84);
}
.task-secondary{
  background-color: rgb(108,117,125);
}

.mouse {
  cursor: pointer;
}
</style>
