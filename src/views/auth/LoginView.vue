<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import type { ILogin } from '@/interfaces/login';
import { Form as VeeForm, Field as VeeField} from 'vee-validate';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    username: Yup.string().required('Email is required').email("Must be a valid email address"),
    password: Yup.string().required('Password is required')
});

const loginAction : any = (values: { username: any; password: any; }, { setErrors }: any) => {
    const authStore = useAuthStore();
    const { username, password } = values;
    const data: ILogin = {
      email: username,
      password: password
    }
    return authStore.login(data)
      .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
  <section class="d-flex justify-content-center align-items-center vh-100 w-100">
    <div class="card-login">
      <h1 class="text-center">Sign in</h1>
      <p class="text-center mb-4">Don't have an account? <a href="">Click here to sign up</a></p>

      <vee-form class="form-login" @submit="loginAction" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="mb-3">
          <vee-field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" placeholder="cuenta@cuenta.com"/>
          <div class="invalid-feedback">{{errors.username}}</div>
        </div>

        <div class="mb-3">
          <vee-field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" placeholder="••••••••"/>
          <div class="invalid-feedback">{{errors.password}}</div>
        </div>
        <a href="" class="float-end mb-3">Forgot password?</a>
        <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="isSubmitting">Login</button>
        <p class="text-center mb-0">2024. All rights reserved</p>
      </vee-form>
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
