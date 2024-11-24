<script setup lang="ts">
</script>

<template>
  <nav class="main-navbar">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <i class="bi bi-caret-right-square-fill icon-brand-logo"></i>
        <div class="container-search">
          <i class="bi bi-search icon-search"></i>
          <input type="text" class="form-control" placeholder="Search..." aria-describedby="basic-addon1">
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="fw-bold me-2 cursor-pointer">
          Home
        </div>

        <div class="icon-container-actions">
          <i class="bi bi-chat-left-text-fill"></i>
        </div>
        <div class="icon-container-actions">
          <i class="bi bi-gear-fill"></i>
        </div>
        <div class="icon-container-actions">
          <i class="bi bi-bell-fill"></i>
        </div>
        <div class="icon-container-actions">
          <i class="bi bi-person-fill"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.main-navbar {
  background-color: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, .04);
  color: #676A79;
  padding: 10px 12px;

  .icon-brand-logo {
    color: #0d6efd;
    font-size: 40px;
    margin-right: 1rem;
    line-height: 10px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .container-search {
    height: 40px;
    position: relative;
    cursor: pointer;
    .icon-search {
      position: absolute;
      top: 7px;
      left: 9px;
    }
    .form-control {
      height: 100%;
      background-color: #eff2f6;
      padding: 0 0 0 2.5rem;
    }
  }

  .icon-container-actions {
    background-color: #eff2f6;
    padding: 10px 14px;
    color: #676A79;
    margin-left: 0.7rem;
    border-radius: .4rem;
    cursor: pointer;
  }

}
</style>
