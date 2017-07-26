import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';
import * as types from './store/types';
import iView from 'iview';

Vue.use(VueRouter);
Vue.use(iView);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/login",
    component: resolve => require(['./views/Login.vue'], resolve)
  },
  {
    path: "/index",
    component: resolve => require(['./views/Home.vue'], resolve),
    meta: {
      requireAuth: true
    },
    children:[
      {
        path: "/system-manage",
        component: resolve => require(['./views/SystemManage.vue'], resolve),
      }
    ]
  }
];


const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    // Util.title(to.meta.title);
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (localStorage.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;
