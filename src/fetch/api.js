import axios from 'axios';
import qs from 'qs';
import store from '../store/store';
import router from '../router';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8888/';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (localStorage.token) {
        config.headers.Authorization = `bearer ` + localStorage.token;
    }
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.status != 200){
        return Promise.reject(res);
    }
    //非法token做的一些操作
    if(res.data.code == 40021 || res.data.code == 40022){
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
    /**
     * 用户登录
     */
    Login(params) {
        return fetch('/api/token/access_token', params)
    },
    Test(params) {
       return fetch('/api/test');
    }


}
