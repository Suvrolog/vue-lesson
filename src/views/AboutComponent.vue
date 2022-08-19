<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link
      :to="`/`"
      custom
      v-slot="{ navigate, isActive, isExactActive }"
    >
      <button
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        @click="navigate"
        class="btn btn-primary mb-3"
      >
        Back to Home
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>