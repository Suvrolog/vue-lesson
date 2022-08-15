<template>
  <nav>
    <router-link to="/" class="btn">Home</router-link>
    <router-link to="/about" class="btn">About</router-link>
    <router-link to="/tasklist" class="btn">Task List</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 60%;
  color: #2c3e50;
  margin: 10px auto 20px auto;
}

nav {
  margin-bottom:20px;
  display: flex;
  justify-content: space-around;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: white;
  background:rgb(13,110,253);
}

</style>
