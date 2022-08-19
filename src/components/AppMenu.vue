<template>
  <nav class="navPosition">
    <router-link to="/" class="btn">Home</router-link>
    <router-link to="/about" class="btn">About</router-link>
    <router-link to="/tasklist" class="btn">Task List</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navPosition {
  margin-top: 5%;
  margin-bottom: 15%;
}

nav {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}

nav a {
  font-weight: bold;
  color: rgb(13, 110, 253);
}

nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  color: white;
}
</style>
