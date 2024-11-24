<script setup lang="ts">

</script>

<template>
  <section class="d-flex justify-content-center align-items-center vh-100 w-100">
    <div class="card-login">
      <h1 class="text-center">Sign in</h1>
      <p class="text-center mb-4">Don't have an account? <a href="">Click here to sign up</a></p>


      <form>
        <div class="mb-3">
          <input type="email" class="form-control" placeholder="name@example.com">
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" id="inputPassword">
        </div>
        <a href="" class="float-end mb-3">Forgot password?</a>

        <button type="button" class="btn btn-primary w-100 mb-3">Login</button>
        <p class="text-center mb-0">2024. All rights reserved</p>

      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.card-login {
  min-width: 575px;
  padding: 3rem;
  background-color: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, .04);
  border-radius: .4rem;
  a {
    text-decoration: none;;
  }

  button {
    padding: 18px 24px;
  }
  @media(max-width: 575px) {
    min-width: 100%;
    padding: 2rem;
  }
}
</style>
