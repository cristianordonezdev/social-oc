<script setup lang="ts">
import { RouterLink } from 'vue-router';

const logout = ():void => {
  localStorage.clear();
  window.location.href = '/login';
}
</script>

<template>
  <nav class="main-navbar">
    <div class="d-flex justify-content-between w-1200">
      <div class="d-flex align-items-center">
        <i class="bi bi-caret-right-square-fill icon-brand-logo"></i>
        <div class="container-search d-none d-md-block">
          <i class="bi bi-search icon-search"></i>
          <input type="text" class="form-control" placeholder="Search..." aria-describedby="basic-addon1">
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="fw-bold me-2 cursor-pointer d-none d-md-block">
          Home
        </div>
        <div class="icon-container-actions d-md-none"  data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          <i class="bi bi-list"></i>
        </div>
        <div class="collapse collapse-responsive" id="collapseExample">
          <div class="card card-body">
            <div class="px-3 pt-3">
              <div class="container-search mb-3">
                <i class="bi bi-search icon-search"></i>
                <input type="text" class="form-control" placeholder="Search..." aria-describedby="basic-addon1">
              </div>
            </div>

            <div class="fw-bold cursor-pointer p-3">
              Home
            </div>
          </div>
        </div>
        <RouterLink :to="{name: 'chat'}" class="icon-container-actions" >
          <i class="bi bi-chat-left-text-fill"></i>
        </RouterLink>
        <div class="icon-container-actions">
          <i class="bi bi-gear-fill"></i>
        </div>
        <div class="icon-container-actions">
          <i class="bi bi-bell-fill"></i>
        </div>
        <div class="icon-container-actions" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
          <i class="bi bi-person-fill"></i>
        </div>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuClickable">
          <div class="d-flex align-items-center px-2 flex-wrap mb-3">
            <div class="avatar-profile">
              <i class="bi bi-person-fill"></i>
            </div>
            <strong class="ms-2">User cool</strong>
            <button type="button" class="btn btn-primary w-100 mt-2">View profile</button>
          </div>
          <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings & privacy</a></li>
          <li><hr class="dropdown-divider"></li>
          <li @click="logout()"><a class="dropdown-item" href="#"><i class="bi bi-power me-2"></i>Sign out</a></li>
        </ul>
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

  .avatar-profile {
    background-color: #eff2f6;
    width: 48px;
    height: 48px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
  .w-1200 {
    max-width: 1200px;
    margin: 0 auto;
  }
  .collapse-responsive {
    position: absolute;
    width: 100%;
    left: 0;
    top: 4rem;

    .card-body {
      padding: 0 !important;
    }
    box-shadow: rgba(0, 0, 0, 0.11) 0px 20px 30px;
  }
}
</style>
