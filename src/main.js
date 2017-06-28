import Vue from 'vue';
import router from './router';
import store from './store/store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';



new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
