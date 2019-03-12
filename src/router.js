import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './components/Dashboard/Dashboard.vue'
import Login from './components/Login/Login.vue'
import NotFound from './components/NotFound.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('access_token');
        if(token) next('/dashboard');
        else next();
      }
    },
    {
      path: '/dashboard',
      component: Dashboard
    },
    {
      path: '*',
      component: NotFound
    },

  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  if(!token && to.path !== '/login') next('/login');
  else next();
});


export default router;