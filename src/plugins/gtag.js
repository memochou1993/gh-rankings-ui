import Vue from 'vue';
import VueGtag from 'vue-gtag';
import router from '@/router';

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GA_TRACKING_ID },
}, router);
