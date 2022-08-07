<template>
<div>
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
          
        
        <button class="btn btn-primary" >Search</button> 
        </div>
      </form>
</div>
</template>

<script>
export default {

    props: ['itemDone','todoItems','item.done'],
    methods:{
           
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
