import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
  },
  {
    path: '/:name*',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
