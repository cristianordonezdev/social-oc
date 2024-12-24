<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
import { isAuthenticated } from './utils/auth';

</script>

<template>
  <header>

    <div class="wrapper" v-if="isAuthenticated()">
      <navbar-component></navbar-component>
    </div>
  </header>

  <div class="main-container-router-view mt-4">
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
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
  }
}
</style>
