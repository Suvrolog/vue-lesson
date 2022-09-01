<template>
  <v-app-bar class="header justify-space-between">
    <router-link
      class="header__item ml-7"
      :to="{
        path: `/home`,
      }"
      v-slot="{ navigate, isActive, isExactActive }"
    >
      <v-app-bar-title
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        @click="navigate"
      >
        <img
          class="header__logo"
          alt="Vue logo"
          src="https://raw.githubusercontent.com/Suvrolog/vue-lesson/57fdde69200cf77339c0bafa78067e978c18efea/logo.svg"
        /><span> VUE-SPA-SHOP </span>
      </v-app-bar-title>
    </router-link>
    <router-link
      class="header__item ml-7"
      :to="{
        path: `/category`,
      }"
      v-slot="{ navigate, isActive, isExactActive }"
    >
      <v-app-bar-title
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        @click="navigate"
      >
        Категории
      </v-app-bar-title>
    </router-link>

    <router-link
      class="header__item ml-7"
      :to="{
        path: `/news`,
      }"
      v-slot="{ navigate, isActive, isExactActive }"
    >
      <v-app-bar-title
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        @click="navigate"
      >
        Новости
      </v-app-bar-title>
    </router-link>
    <router-link
      class="header__item ml-7"
      :to="{
        path: `/about`,
      }"
      v-slot="{ navigate, isActive, isExactActive }"
    >
      <v-app-bar-title
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        @click="navigate"
      >
        О нас
      </v-app-bar-title>
    </router-link>

    <v-app-bar-title
      ><a class="header__item ml-10" href="tel:+7499999999">
        +7(499)999 99 99
      </a></v-app-bar-title
    >
    <router-link
      :to="{
        path: `/basket`,
      }"
      v-slot="{ navigate, isActive, isExactActive }"
    >
      <v-app-bar-title
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        @click="navigate"
      >
        <img
          class="header__basket"
          src="https://raw.githubusercontent.com/Suvrolog/vue-lesson/57fdde69200cf77339c0bafa78067e978c18efea/basket.svg"
          alt="basket"
        />
        <div class="header__counter">{{ reloadGetCount() }}</div>
      </v-app-bar-title>
    </router-link>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app-header",
  props: {
    msg: String,
    listBasket: Number,
  },
  data() {
    return {
      reloadCheck: [],
    };
  },
  computed: {
    ...mapGetters(["getCount"]),
  },
  methods: {
    reloadGetCount() {
      if (this.getCount != 0) {
        return this.getCount;
      } else {
        if (JSON.parse(localStorage.getItem("listBasket") != null)) {
          this.reloadCheck = JSON.parse(localStorage.getItem("listBasket"));
          return this.reloadCheck.length;
        } else {
          return 0;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  background-color: #c9def1;
  align-items: center;

  &__main {
    padding-top: -25px;
  }
  &__logo {
    width: 30px;
  }
  &__item {
    list-style-type: none;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
  &__basket {
    cursor: pointer;

    margin-right: 40px;
  }
  &__counter {
    position: absolute;
    margin-top: -45px;
    margin-left: 30px;
    color: white;
    font-size: 15px;
    z-index: 1000;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      width: 27px;
      height: 27px;
      -moz-border-radius: 7.5px;
      -webkit-border-radius: 7.5px;
      border-radius: 15px;
      background-color: red;
      right: -8px;
      margin-top: 3px;
      z-index: -1;
    }
  }
  .router-link-active {
    color: rgb(13, 110, 253);
  }
}
</style>
