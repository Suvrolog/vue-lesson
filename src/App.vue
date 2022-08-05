<template>
  <div class="sample">
      <h2 v-show="todoItems.length == 0">Please add new task</h2>
      <h2 v-show="todoItems.length != 0"> {{ message }} </h2>
      
      

      <form class="input-group  mb-3" action="" v-on:submit.prevent="filterAll">
        <div class="input-group mb-3" >
          <input type="text" class="form-control" v-model.trim="todoItems.text" placeholder="Add new Task">
          <button v-bind:class="buttonSwitch" v-on:click="addTask"  class="btn" >Add</button> 
        </div>
          
      </form>

 <ul class="list-group mb-3 d-flex column">
        <li class="list-group-item " >
            Completed tasks {{ sum() }}  
        </li>
        <li class="list-group-item"  >
            All tasks {{ todoItems.length }}
        </li>
        
      </ul>
        
      <div>
        <app-progress-bar class="mb-3" v-bind:max="todoItems.length" v-bind:complete="sum()"  ></app-progress-bar>
      </div>

      <div class="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" v-on:click="filterAll" autocomplete="off" checked>
        <label class="btn btn-outline-primary" for="btnradio1">All Task</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" v-on:click="filterTrue" autocomplete="off">
        <label class="btn btn-outline-primary" for="btnradio2">Comleted Task</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" v-on:click="filterFalse" autocomplete="off">
        <label class="btn btn-outline-primary" for="btnradio3">Uncompleted Task</label>
      </div>

      
      
      <form class="input-group mb-3" action="" v-on:submit.prevent="filterTask">
        <div class="input-group mb-3" >
        <input placeholder="Search" class="form-control" type="text" v-model.trim="search" />
        <button class="btn btn-primary" >Search</button> 
        </div>
      </form>

      
            
      <ul class="list-group">
        <li class="list-group-item" v-for="item in arrayClone" :key="item.id">
            <div class="mb-1">
              <button v-bind:class="{ 'btn-success':item.done == true, 'btn-secondary':item.done == false }" v-on:click="item.done = !item.done" class="btn" >{{ item.done ? "Completed" : "In order" }}</button>  
              <span v-on:click="isActive=!isActive"> {{ item.text }} </span>
              
              <span class="myPosition">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
              </button> 
              
              <button class="btn btn-primary" v-on:click="delItem(item)">X</button>
            </span>
            </div>

          <form class="input-group" v-show="isActive" action="" v-on:submit.prevent="">
            <div class="input-group" >
            
            <button class="btn btn-primary" v-on:click="isActive=!isActive">Accept</button> 
            </div>
          </form>

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Editing</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                 <input placeholder="Add Task" v-model="item.text" class="form-control" type="text"/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </li>
      </ul>
      
    </div>
</template>

<script>
import AppProgressBar from './components/AppProgressBar.vue'
export default {
  name: 'App',
  components: {
    'app-progress-bar':AppProgressBar
  },
   data() {
          return {
            'btn-basic': false,
            'btn-primary': true,
            search: '',
            i: 0,
            message: 'I suffered for a very long time',
            isActive: false,
            todoItems: [],
            arrayClone: [],
          }
        },

        methods: {
          doneTask (){
            this.arrayClone =  this.todoItems.filter((item) => item.done == true);
            return this.arrayClone.length;
          },


          delItem(item){
              var myIndex = this.arrayClone.indexOf(item);
              if (myIndex !== -1) {
                  this.arrayClone.splice(myIndex, 1);
              }
          },

          addTask(){
            if(this.todoItems.text !== undefined && this.todoItems.text.length !== 0) {
              this.todoItems.push({id: this.i, text: this.todoItems.text, done: false});
              this.i++;
              this.todoItems.text = undefined;
            } else {
              alert("Вы не ввели текст задачи");
            }
          },

          filterFalse(){
            this.arrayClone = this.todoItems.filter((item) => !item.done);
          },

          filterTrue(){
            this.arrayClone =  this.todoItems.filter((item) => item.done);
          },

          filterAll(){
            this.arrayClone = this.todoItems;
          },

          filterTask(){
            this.arrayClone = this.arrayClone.filter(item => {
              return item.text.toLowerCase().includes(this.search.toLowerCase())
            });
          },
          sum(){
            let sum = this.todoItems.filter((item) => item.done == true);
            return sum.length;
          },
        
        },

        computed: {

          
          buttonSwitch() {
            return {
              'btn-secondary': this.todoItems.text == undefined,
              'btn-primary': this.todoItems.text != undefined,
            }
          },

        
         
        },
}
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
.displaynone{
  display: none;
}
.myPosition{
  right: 2%;
  position: absolute;
  display: inline-flex;
  justify-content: space-between;
  width: 120px;
}
</style>
