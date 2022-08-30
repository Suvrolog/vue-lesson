<template>
  <section class="header">
    <nav>
      <ul class="header__nav">
        <router-link
          :to="{
            path: `/home`,
          }"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
            @click="navigate"
            class="header__item"
          >
            <img
              class="header__logo"
              alt="Vue logo"
              src=".././assets/logo.png"
            /><span class="header__main"> VUE-SPA-SHOP </span>
          </li>
        </router-link>
        <router-link
          :to="{
            path: `/category`,
          }"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
            @click="navigate"
            class="header__item"
          >
            Категории
          </li>
        </router-link>

        <router-link
          :to="{
            path: `/news`,
          }"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
            @click="navigate"
            class="header__item"
          >
            Новости
          </li>
        </router-link>
        <router-link
          :to="{
            path: `/about`,
          }"
          custom
          v-slot="{ navigate, isActive, isExactActive }"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
            @click="navigate"
            class="header__item"
          >
            О нас
          </li>
        </router-link>
      </ul>
    </nav>
    <div>+7(499)999 99 99</div>
    <router-link
      :to="{
        path: `/basket`,
      }"
      custom
      v-slot="{ navigate, isActive, isExactActive }"
    >
      <div
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
        @click="navigate"
      >
        <img class="header__basket" src=".././assets/basket.png" alt="basket" />
        <div class="header__counter">{{ listBasket }}</div>
      </div>
    </router-link>
  </section>
</template>

<script>
export default {
  name: "app-header",
  props: {
    msg: String,
    listBasket: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  justify-content: space-between;
  width: 95%;
  display: flex;
  background-color: #c9def1;
  align-items: center;
  position: fixed;
  z-index: 1000;
  margin-bottom: 100px;
  &__nav {
    justify-content: space-between;
    display: flex;
    min-width: 800px;
    align-items: center;
    margin-top: 10px;
  }
  &__main {
    padding-top: -25px;
  }
  &__logo {
    width: 30px;
  }
  &__item {
    list-style-type: none;
    cursor: pointer;
  }
  &__basket {
    margin-left: -60px;
    cursor: pointer;
  }
  &__counter {
    position: absolute;
    margin-top: -42px;
    margin-left: -30px;
    color: white;
    font-size: 15px;
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
      margin-top: -1px;
      z-index: -1;
    }
  }
}
</style>
