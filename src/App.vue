<template>
  <div class="sample">
    <h2 v-show="todoItems.length == 0">Please add new task</h2>
    <h2 v-show="todoItems.length != 0">{{ message }}</h2>

    <form class="input-group mb-3" action="" v-on:submit.prevent="filterAll">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model.trim="todoItems.text"
          placeholder="Add new Task"
        />
        <button v-bind:class="buttonSwitch" v-on:click="addTask" class="btn">
          Add
        </button>
      </div>
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
          <button class="btn btn-primary">Search</button>
        </div>
      </form>
    </div>

    <ul class="list-group">
      <li class="list-group-item" v-for="item in arrayClone" :key="item.id">
        <div class="mb-1">
          <div  class="mb-3">
          <button
            v-bind:class="{
              'btn-success': item.done == true,
              'btn-secondary': item.done == false,
            }"
            v-on:click="item.done = !item.done"
            class="btn"
          >
            {{ item.done ? "Completed" : "In order" }}
          </button>
          <span v-on:click="item.isActive = !item.isActive"> {{ item.text }} </span>
          <span class="myPosition">
            <button class="btn btn-primary" v-on:click="delItem(item)">
              X
            </button>
          </span>
          </div>
           <div v-bind:class="{ active: item.isActive }" class="input-group mb-1">
            <input
              type="text"
              class="form-control"
              placeholder="Add new Task"
              v-model="item.text"
            />
            <button v-on:click="item.isActive = !item.isActive" class="btn btn-primary">
              X
            </button>
          </div>
        
          
        </div>
        
      </li>
    </ul>
  </div>
  
</template>

<script>
import AppProgressBar from "./components/AppProgressBar.vue";
import AppCounterTask from "./components/AppCounterTask.vue";
import AppProgressBar from "./components/AppProgressBar.vue";
//import AppRedact from "./components/AppRedact.vue";
//import AppFilter from "./components/AppFilter.vue";
export default {
  name: "App",
  components: {
    "app-progress-bar": AppProgressBar,
    "app-counter-task": AppCounterTask,
    //"app-redact": AppRedact,
    //"app-filter": AppFilter,
  },
  data() {
    return {
      "btn-basic": false,
      "btn-primary": true,
      search: "",
      i: 0,
      message: "I suffered for a very long time",
      todoItems: [],
      arrayClone: [],
      isActive: '',
    };
  },
  methods: {
    doneTask() {
      this.arrayClone = this.todoItems.filter((item) => item.done == true);
      return this.arrayClone.length;
    },

    delItem(item) {
      var myIndex = this.arrayClone.indexOf(item);
      if (myIndex !== -1) {
        this.arrayClone.splice(myIndex, 1);
      }
    },

    addTask() {
      if (
        this.todoItems.text !== undefined &&
        this.todoItems.text.length !== 0
      ) {
        this.todoItems.push({
          i: this.i,
          text: this.todoItems.text,
          done: false,
          isActive: true,
        });
        this.i++;
        this.todoItems.text = undefined;
      } else {
        alert("Вы не ввели текст задачи");
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
      this.arrayClone = this.arrayClone.filter((item) => {
        return item.text.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    sum() {
      let sum = this.todoItems.filter((item) => item.done == true);
      return sum.length;
    },
  },
  watch: {
    todoItems: {
      handler() {
        if(localStorage.getItem('arrayLocal') !== null){
          localStorage['arrayLocal'] = JSON.stringify(this.todoItems);
          localStorage['id'] = JSON.stringify(this.id);
        }
      },
      deep: true
    },
  },
  created() {
    if(localStorage.getItem('arrayLocal') !== null){
      this.arrayClone = JSON.parse(localStorage.arrayLocal);
      localStorage['arrayLocal'] = JSON.stringify(this.todoItems);
      this.todoItems = this.arrayClone;

      this.id = JSON.parse(localStorage.id);
      localStorage['id'] = JSON.stringify(this.id);
    }
  },
  computed: {
    buttonSwitch() {
      return {
        "btn-secondary": this.todoItems.text == undefined,
        "btn-primary": this.todoItems.text != undefined,
      };
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 60%;
  color: #2c3e50;
  margin: 60px auto 20px auto;
}

.myPosition {
  right: 2%;
  position: absolute;
  display: inline-flex;
  justify-content: space-between;
}
.active{
  display: none;
}
</style>
