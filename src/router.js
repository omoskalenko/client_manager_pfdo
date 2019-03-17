import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/Login/Login.vue'
import Search from './components/Search/SearchBox.vue'
import Create from './components/Create/CreateForm.vue'
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
        if(token) next('/search');
        else next();
      }
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/create',
      component: Create
    },
    {
      path: '/search',
      component: Search
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