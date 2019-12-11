import storage from '../../config/storage';
import {storageDecrypt} from '../../http/aes'
window.menuOneList =storage.getItem('menuOneList')?JSON.parse(storageDecrypt(storage.getItem('menuOneList'))):undefined; //一级菜单
window.menuTwoMap = storage.getItem('menuTwoMap')?JSON.parse(storageDecrypt(storage.getItem('menuTwoMap'))):undefined;   //二级菜单
window.functionList = storage.getItem('functionList')?JSON.parse(storageDecrypt(storage.getItem('functionList'))):undefined; //功能点