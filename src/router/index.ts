import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/utils/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/chat/ChatView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const public_pages = ['/login'];
  const authRequired = !public_pages.includes(to.path);

  if (authRequired && !isAuthenticated()) {
      return '/login';
  } 
  else if (to.path === public_pages[0] && isAuthenticated()){
    return '/'
  }
});

export default router
