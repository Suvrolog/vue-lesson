<template>
  <div class="sidebarWidth">
    <router-link
      :to="`/tasklist`"
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
        Back to List
      </button>
    </router-link>
    <ul class="list-group mb-1">
      <li
        active-class="activeLink"
        class="list-group-item"
        v-for="item in  $store.state.arrayClone"
        :key="item.i"
        :item="item"
      >
        <div class="mb-1">
          <div class="mb-1">
            <router-link
              :to="{
                path: `/tasklist/${item.id}`,
     
              }"
              custom
              v-slot="{ navigate, isActive, isExactActive }"
            >
              <h4
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active',
                ]"
                @click="navigate"
                class="mouse"
              >
                {{ item.title }}
              </h4>
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    arrayClone: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebarWidth {
  width: 30%;
}

.router-link-active {
  text-decoration: underline rgb(13, 110, 253);
  cursor: pointer;
}
</style>
