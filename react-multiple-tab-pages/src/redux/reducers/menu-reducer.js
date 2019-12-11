import React from 'react';
import { ADDMENU, DELETEMENU, TOGGLEMENU, REPLACEMENU, SWITCHMENU, CLEARMENU } from '../actions/menu-action';

import NoModule from '../../page/components/noModule/noModule' //暂未开发模块
//基础信息
import Info from '../../page/basicsInfo/info' //电梯信息
import Details from '../../page/basicsInfo/details' //电梯详情
//系统设置
import PersonnelManagement from '../../page/system/personnelManagement'//人员管理
import PrivilegeManagement from '../../page/system/privilegeManagement'//权限管理

const defaultKey = '82';
const defaultTitle = '权限管理';
const defaultState = {
    modularArr: [defaultKey],//所有页面
    menu: menu(activeKey(defaultKey)),//一级菜单
    activeKey: activeKey(defaultKey),//二级菜单
    tabsActiveKey: defaultKey,//tabs
    panes: [module(defaultKey, defaultTitle)]
}
export default function (state = defaultState, action) {
    switch (action.type) {
        case ADDMENU:
            {
                let panes = state.panes;
                panes.push(module(action.payload.key, action.payload.title));
                return {
                    ...state,
                    modularArr: [...state.modularArr, action.payload.key],
                    menu: menu(activeKey(action.payload.key)),
                    activeKey: activeKey(action.payload.key),
                    tabsActiveKey: action.payload.key,
                    panes: panes,
                    previousPageData: action.payload.previousPageData
                }
            }

        case DELETEMENU:
            {
                return {
                    ...state,
                    modularArr: state.modularArr.filter(item => item !== action.payload.key),
                    menu: menu(activeKey(action.payload.activeKey)),
                    activeKey: activeKey(action.payload.activeKey),
                    tabsActiveKey: action.payload.activeKey,
                    panes: state.panes.filter(item => item.key !== action.payload.key)
                }
            }
        case TOGGLEMENU:
            {
                return {
                    ...state,
                    activeKey: activeKey(action.payload.activeKey),
                    menu: menu(activeKey(action.payload.activeKey)),
                    tabsActiveKey: action.payload.activeKey
                }
            }
        case REPLACEMENU:
            {
                let modularArr = state.modularArr;
                let panes = state.panes;
                let i = modularArr.indexOf(action.payload.key);
                modularArr[i] = action.payload.activeKey;
                panes[i] = module(action.payload.activeKey, action.payload.activeTitle);
                return {
                    ...state,
                    modularArr: modularArr,
                    menu: menu(activeKey(action.payload.activeKey)),
                    activeKey: activeKey(action.payload.activeKey),
                    tabsActiveKey: action.payload.activeKey,
                    panes: panes
                }
            }
        case SWITCHMENU:
            {
                return {
                    ...state,
                    menu: action.payload.menu
                }
            }
        case CLEARMENU:
            {
                return {
                    modularArr: [defaultKey],//所有页面
                    menu: menu(activeKey(defaultKey)),//一级菜单
                    activeKey: activeKey(defaultKey),//二级菜单
                    tabsActiveKey: defaultKey,//tabs
                    panes: [module(defaultKey, defaultTitle)]
                }
            }
        default:
            return state;
    }
}

/**
 * 添加相应的模块
 * @param key
 * @param title
 * @returns {{title: *, content: XML, key: *}}
 */
function module(key, title) {
    var k = key.split("");
    if (!isNaN(k[0])) {
        switch (parseInt(key, 0)) {
            case 10:
                return { title: title, content: <Info />, key: key };
            case 82:
                return { title: title, content: <PrivilegeManagement />, key: key };
            case 83:
                return { title: title, content: <PersonnelManagement />, key: key };
            default:
                return { title: title, content: <NoModule />, key: key };
        }
    } else {
        var index = key.indexOf('-');
        if (index === -1) {
            return { title: title, content: <NoModule />, key: key };
        }
        switch (key.substring(0, index)) {
            case 'details': //详情
                return { title: title, content: <Details />, key: key };
            default:
                return { title: title, content: <NoModule />, key: key };
        }
    }
}
/**
 * 获取二级目录
 * @param key
 */
function activeKey(key) {
    var k = key.split("");
    if (!isNaN(k[0])) {
        return key
    } else {
        var index = key.indexOf('-');
        if (index === -1) {
            return key
        }
        switch (key.substring(0, index)) {
            case 'elevatorDetails': //电梯详情
                return '10';
            case 'maintenanceUnitDetails': //维保单位详情
                return '11';
            default:
                return key;
        }
    }

}

/**
 * 获取二级目录相对应的一级目录
 * @param key
 */
function menu(key) {
    if (!window.menuTwoMap) {
        key = key.split("");
        switch (parseInt(key[0], 0)) {
            case 1:
                return 'basicsInfo';
            case 8:
                return 'system';
            default:
                return;
        }
    }
    for (var item in window.menuTwoMap) {
        for (var i = 0; i < window.menuTwoMap[item].length; i++) {
            if (window.menuTwoMap[item][i].key === key) {
                return item;
            }
        }
    }
}