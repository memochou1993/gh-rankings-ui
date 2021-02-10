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

router.afterEach((to) => {
  Vue.nextTick(() => {
    const { name } = to.params;
    const prefix = name ? `${name} - ` : '';
    document.title = `${prefix}GH Rankings`;
  });
});

export default router;
