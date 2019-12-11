import Axios from 'axios'
import qs from 'qs'
import store from '../redux';
import {updateLogin} from '../redux/actions/common-action'
import {clearMenu }  from '../redux/actions/menu-action';
import {encrypt,decrypt} from './aes'
var axios = Axios.create({
    baseURL: '',
    timeout: '0',  //请求超时时间
    headers: {        //header传值，例如：Authorization
        'X-Custom-Header': 'foobar',
        'Content-Type': "application/x-www-form-urlencoded",
        mtd: 'aes'
    }
})
let isEncryption = true;//是否加密
axios.interceptors.request.use(function (config) {
    if(!isEmptyObject(config.data)){
        console.log(`%c${config.url}`,'color:red');
        if(config.url!=='/login/to'){
            console.log(config.data);
        }
    }
    if (!isEncryption) {
        config.method === 'post'
            ? config.data = qs.stringify({...config.data})
            : config.params = {...config.data};
    } else {
        config.method === 'post'
            ? config.data = 'data=' + encrypt(JSON.stringify(config.data))
            : config.params = {...config.params};
    }
    //在发送请求之前做某事
    return config;
}, function (error) {
    //请求错误时做些事
    console.log(error);
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    //console.log(new Date(response.headers.date).getTime())
    if (!isEncryption) {
        return response.data;
    }else {
        var data = decrypt(response.data);
        if(data.code===10007){
            store.dispatch(updateLogin(false));
            store.dispatch(clearMenu());
            //window.location.href='/'
        }
        return data;
    }
}, function (error) {
    switch (parseInt(error.response.data.status,0)){
        case 500:
            break;
        case 404:
            break;
        default:
            break
    }
    if(error.response){
        return Promise.reject(error.response.data);
    }else {
        return Promise.reject(error);
    }
})
function isEmptyObject(obj) {
    for (var key in obj){
        return false;//返回false，不为空对象
    }
    return true;//返回true，为空对象
}
export default axios