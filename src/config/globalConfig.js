import storage from './storage'
import Axios from '../http'
import {ApiName} from '../http/httpApiName'
if(storage.getItem('token')){
    Axios.defaults.headers.common['token'] = storage.getItem('token');//登录成功后把获取到的token加到header中
}
window.Axios = Axios;
window.ApiName = ApiName;
//高德地图相关配置
window.mapKey = "";//高德地图key
window.mapVersion = "";//地图版本
window.mapStyle = "";//自定义地图样式
//是否打印日志
if (!true) {
    console = console || {};
    console.log = function () {
    };
}