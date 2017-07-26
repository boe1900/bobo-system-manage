import axios from 'axios';
import qs from 'qs';
import router from '../router';
import iView from 'iview';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8888/';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (localStorage.token) {
        config.headers.Authorization = 'bearer ' + localStorage.token;
    }
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    if (res.status != 200) {
        return Promise.reject(res);
    }
    //非法token做的一些操作
    if (res.data.code == 40021 || res.data.code == 40022) {
        router.replace({
            path: 'login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        });
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetch(url, params) {
    iView.LoadingBar.start();
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
                iView.LoadingBar.finish();
            }, err => {
                reject(err);
                iView.LoadingBar.error();
            })
            .catch((error) => {
                reject(error);
                iView.LoadingBar.error();
            });
    });
}

export default {
    /**
     * 用户登录
     */
    Login(params) {
        return fetch('/api/token/access_token', params);
    },

    //系统列表
    SystemList(params){
        return fetch('/api/system/list', params);
    }

};
