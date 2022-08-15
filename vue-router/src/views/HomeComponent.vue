<template>
  <form class="row gx-3 gy-2 align-items-center centralize">
  <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeInputName">Name</label>
    <input type="text" class="form-control" id="specificSizeInputName" placeholder="Name">
  </div>
  <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeInputGroupUsername">Username</label>
    <div class="input-group">
      <div class="input-group-text">@</div>
      <input type="text" class="form-control" id="specificSizeInputGroupUsername" placeholder="Username">
    </div>
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">Login</button>
  </div>
</form>
</template>

<script>

</script>

<style scoped>
.centralize {
  justify-content: center;
}
</style>