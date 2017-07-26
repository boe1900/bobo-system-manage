import Vue from 'vue';
import router from './router';
import store from './store/store';
import App from './app.vue';
import '!style-loader!css-loader!less-loader!./theme/index.less';


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
