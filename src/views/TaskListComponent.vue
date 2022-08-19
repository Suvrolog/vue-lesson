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
          v-model.trim="todoItems.title"
          placeholder="Add Title Task"
        />
      </div>
      <div class="mb-3">
        <textarea
          type="text"
          class="form-control"
          v-model.trim="todoItems.desc"
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

    <app-counter-task v-bind:todoLength="todoItems.length" v-bind:sum="sum()" />

    <app-progress-bar
      class="mb-3"
      v-bind:max="todoItems.length"
      v-bind:complete="sum()"
    ></app-progress-bar>

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
      <form class="input-group mb-3" action="" v-on:submit.prevent="filterTask">
        <div class="input-group mb-3">
          <input
            placeholder="Search"
            class="form-control"
            type="text"
            v-model.trim="search"
          />
          <button class="btn btn-primary" type="submit">Search</button>
        </div>
      </form>
    </div>

    <!-- Item -->
    <ul class="list-group">
      <li
      v-bind:class="{
                'task-success': item.done,
                'task-secondary': !item.done,
              }"
        class="list-group-item"
        v-for="item in arrayClone"
        :key="item.id"
        :item="item"
      ><router-link
                :to="{
                  path: `/tasklist/${item.id}`,
                  query: {
                    desk: item.desc,
                    title: item.title,
                    done: item.done,
                    id: item.id,
                  },
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
            <!-- <button
              v-bind:class="{
                'btn-success': item.done,
                'btn-secondary': !item.done,
              }"
              v-on:click="item.done = !item.done"
              class="btn"
            >
              {{ item.done ? "Completed" : "In order" }}
            </button> -->
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
import axios from "axios";

export default {
  name: "App",
  components: {
    "app-progress-bar": AppProgressBar,
    "app-counter-task": AppCounterTask,
  },

  data() {
    return {
      search: "",
      i: 1,
      todoItems: [],
      arrayClone: [],
      done: "",
      desc: "",
      title: "",
      created: new Date().toLocaleString(),
    };
  },

  methods: {
    doneTask() {
      this.arrayClone = this.todoItems.filter((item) => item.done);
      return this.arrayClone.length;
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },

    addTask() {
      if (
        this.todoItems.desc !== undefined &&
        this.todoItems.desc.length !== 0 &&
        this.todoItems.title != undefined &&
        this.todoItems.title !== 0
      ) {
        this.todoItems.push({
          id: this.i,
          desc: this.todoItems.desc,
          done: false,
          title: this.todoItems.title,
        });
        (this.desc = this.todoItems.desc),
          (this.done = false),
          (this.title = this.todoItems.title),
          axios
            .post(
              "http://localhost:3000/todoItems",
              {
                id: this.i,
                desc: this.desc,
                done: this.done,
                title: this.title,
                created: this.created,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        this.i++;
        this.todoItems.desc = undefined;
        this.todoItems.title = undefined;
        this.arrayClone = this.todoItems;
      }
    },

    filterFalse() {
      this.arrayClone = this.todoItems.filter((item) => !item.done);
    },

    filterTrue() {
      this.arrayClone = this.todoItems.filter((item) => item.done);
    },

    filterAll() {
      this.arrayClone = this.todoItems;
    },

    filterTask() {
      if (this.search.length == 0) {
        this.arrayClone = this.todoItems;
      } else {
        this.arrayClone = this.arrayClone.filter((item) => {
          return item.desc.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    },
    sum() {
      let sum = this.todoItems.filter((item) => item.done);
      return sum.length;
    },
  },

  watch: {
    todoItems: {
      handler() {
        if (this.todoItems.length !== 0) {
          localStorage["arrayLocal"] = JSON.stringify(this.todoItems);
          localStorage["id"] = JSON.stringify(this.i);
        }
      },
      deep: true,
    },
  },

  computed: {
    buttonSwitch() {
      return {
        "btn-secondary": this.todoItems.desc == undefined,
        "btn-primary": this.todoItems.desc != undefined,
      };
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
        this.todoItems = response.data;

        if (response.data.length !== 0) {
          const ids = response.data.map(item => item.id);
          this.i = Math.max.apply(ids) + 1;
          this.arrayClone = this.todoItems;
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
