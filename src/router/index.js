import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/Index.vue'),
  },
  {
    path: '/:name*',
    name: 'show',
    component: () => import(/* webpackChunkName: "show" */ '@/views/Show.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
