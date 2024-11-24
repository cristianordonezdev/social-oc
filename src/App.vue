<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';

</script>

<template>
  <header>

    <div class="wrapper ">
      <navbar-component></navbar-component>
    </div>
  </header>

  <div class="main-container-router-view">
    <RouterView class="max-1400"/>
  </div>
</template>

<style scoped lang="scss">
.main-container-router-view {
  width: 100%;;
  display: flex;
  justify-content: center;
  height: 100%;
  
  .max-1400 {
    max-width: 1400px;
    margin: 0 auto;
    height: 100%;
    padding: 0 1em;
  }
}
</style>
