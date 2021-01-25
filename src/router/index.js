import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'list',
    component: () => import(/* webpackChunkName: "list" */ '@/views/List.vue'),
  },
  {
    path: '/:name*',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
