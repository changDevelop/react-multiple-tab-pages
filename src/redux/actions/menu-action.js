export const ADDMENU = 'ADDMENU';//新添加打开页面
export const DELETEMENU = 'DELETEMENU';//关闭页面
export const TOGGLEMENU = 'TOGGLEMENU';//切换页面
export const REPLACEMENU = 'REPLACEMENU';//替换页面
export const SWITCHMENU = 'SWITCHMENU';//点击一级菜单切换菜单
export const CLEARMENU = 'CLEARMENU';//清除
/**
 * 新添加打开页面
 * @param key 页面的key
 * @param title 页面的title
 * @param previousPageData  页面所需要的额外数据
 * @returns {{type: string, payload: {key: *,title:*}}}
 */
export function addMenu(key, title, previousPageData) {
    return {
        type: ADDMENU,
        payload: { key, title, previousPageData }
    }
}
/**
 * 关闭页面
 * @param key 关闭页面的key
 * @param activeKey 关闭后显示页面的key
 * @returns {{type: string, payload: {key: *, activeKey: *}}}
 */
export function deleteMenu(key, activeKey) {
    return {
        type: DELETEMENU,
        payload: {
            key,
            activeKey
        }
    }
}
/**
 * 切换页面
 * @param activeKey 切换目标页面的key
 * @returns {{type: string, payload: {activeKey: *}}}
 */
export function toggleMenu(activeKey) {
    return {
        type: TOGGLEMENU,
        payload: {
            activeKey
        }
    }
}
/**
 * 替换页面
 * @param key 当前key
 * @param activeKey  目标页key
 * @param activeTitle 目标页标题
 * @returns {{type: string, payload: {key: *, activeKey: *, activeTitle: *}}}
 */
export function replaceMenu(key, activeKey, activeTitle) {
    return {
        type: REPLACEMENU,
        payload: {
            key,
            activeKey,
            activeTitle
        }
    }
}
/**
 * 点击一级菜单切换菜单
 * @param menu 一级菜单对应的key
 * @returns {{type: string, payload: {menu: *}}}
 */
export function switchMenu(menu) {
    return {
        type: SWITCHMENU,
        payload: {
            menu
        }
    }
}
/**
 * 点击一级菜单切换菜单
 * @param menu 一级菜单对应的key
 * @returns {{type: string, payload: {menu: *}}}
 */
export function clearMenu() {
    return {
        type: CLEARMENU,
        payload: {}
    }
}