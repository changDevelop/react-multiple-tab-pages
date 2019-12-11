/**
 * Created by chang on 2019/1/5.
 */
import React from 'react';
import {connect} from 'react-redux';
import {updateLogin} from '../../../redux/actions/common-action'
import {switchMenu,clearMenu,replaceMenu,addMenu,deleteMenu,toggleMenu}  from '../../../redux/actions/menu-action';
import {encrypt,decrypt} from '../../../http/aes'
import { Layout,Icon,message,notification,Button } from 'antd';
import styles from './header.scss'
import Exit from '../img/header/exit.svg'
import '../../../http/WebSocket'
import storage from '../../../config/storage'
window.isActiveExit=false;//判断是否是主动退出
var ws = {}, timer = null,w = null,isFirst=true;//判断是否是第一次断开重连
ws.init = function () {
    if ('WebSocket' in window) {
        if(storage.getItem("token")){
            if(window.location.protocol==="http:"){
                w = new WebSocket('ws://' + window.location.host + '/host/abc/' + storage.getItem("token"));
            }else {
                w = new WebSocket('wss://' + window.location.host + '/host/abc/' + storage.getItem("token"));
            }
            window.customws = w;
            this.websocket = w;
        }else {
            return
        }
    } else {
        console.log('当前浏览器不支持 webSocket')
    }
    this.websocket.onopen = function (evt) {
        console.log("open");
        isFirst=true;
        if(timer){
            clearInterval(timer);
        }
        timer = setInterval(function () {
            if (w&&w.readyState===1) {
                if(storage.getItem('token')){
                    w.send("111");
                }else {
                    clearInterval(timer);
                    window.CustomRemind.open({onText: '确定',title: "会话失效",msg: "连接服务器超时，可能是您的网络问题",type: '3'});
                    window.CustomHeader.props.exit();
                }
            } else if(timer){
                clearInterval(timer);
            }
        }, 1000)
    };
    this.websocket.onclose = function (evt) {
        console.log("%c websocket关闭","color:red");
        console.log(evt);
        w = null;
        window.customws=null;
        reconnect()
    };
    this.websocket.onmessage = (evt)=> {
        console.log("message", evt);
        console.log(decrypt(evt.data));
        let res = decrypt(evt.data);
        if(res.code===10000){
        }
    };
    this.websocket.onerror = function (evt) {
        console.log("%c websocket连接错误","color:red");
        console.log(evt);
        w = null;
        window.customws=null;
        reconnect()
    };
}
/**
 * ws断线重连
 */
function reconnect(){
    if(isFirst&&storage.getItem("token")){
        isFirst=false;
        let amount = 0;
        if (!window.isActiveExit) {//判断是否是主动关闭
            ws.init();
            let t = setInterval(function () {
                if (!w||w.readyState!==1&&storage.getItem('token')) {
                    if (amount < 11) {
                        if(amount===2){
                            message.error("连接服务器超时，可能是您的网络问题，正在尝试重新连接...")
                        }
                        amount++;
                        ws.init();
                    } else {//不再重连
                        clearInterval(t);
                        console.log("连接服务器超时，可能是您的网络问题");
                        window.CustomRemind.open({onText: '确定',title: "会话失效",msg: "连接服务器超时，可能是您的网络问题",type: '3'});
                        window.CustomHeader.props.exit();
                    }
                } else {//重连成功，不再重连
                    clearInterval(t);
                }
            }, 3000)
        }else {
            window.isActiveExit=false;
        }
    }
}

const close = (code) => {
    console.log("关闭"+code)
};

const { Header } = Layout;
class CustomHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        window.CustomHeader = this;
        if(window.roleGrade==="1"){
            this.props.onReplaceMenu("31","83","呼叫中心管理")
        }
    }

    /**
     * 点击一级菜单查看二级菜单
     * @param key
     */
    clickMenu = (key)=> {
        this.props.switchMenu(key);
    }

    /**
     * 点击退出触发
     */
    exitLoginConfirm = ()=> {
        window.CustomConfirm.open({
            title:"退出登录",
            msg: '您确认退出登录吗？',
            onOk: ()=> {
                this.exitLogin()
            }
        })
    }

    exitLogin = ()=> {
        this.props.exitLogin()
    }
    render() {
        return (
            <Header className={styles.header}>
                <div className={styles.logo}>
                    <span /><span /><span>****************系统</span>
                    <Icon className={styles.exit} onClick={this.exitLoginConfirm} component={Exit}/>
                    <div>
                        {window.menuOneList.length > 0 && window.menuOneList.map(item=>
                            <span className={this.props.menu===item.key?styles.active:''}
                                  onClick={()=>{this.clickMenu(item.key)}} key={item.key}>{item.name}</span>
                        )}
                    </div>
                </div>
            </Header>
        )
    }

    componentDidMount() {
        if (this.props.isLogin) {
            ws.init()
        }
    }

    componentWillUnmount() {
        window.CustomHeader = undefined;
        if (timer) {
            clearInterval(timer)
        }
        this.setState = (state, callback) => {
            return
        };

    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu.menu,
        modularArr: state.menu.modularArr,
        activeKey: state.menu.activeKey,
        tabsActiveKey: state.menu.tabsActiveKey,
        panes: state.menu.panes,
        height: state.common.height,
        isLogin: state.common.isLogin
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        exitLogin: ()=> {
            dispatch(updateLogin(false));
            dispatch(clearMenu());
            //window.Axios({
            //    url: window.ApiName.ApiExit,
            //    method: 'post',
            //    data: {}
            //}).then(function (res) {
            //    console.log("%c退出登录", 'color:red');
            //    console.log(res);
            //    if (res.code === 10000) {
            //        window.isActiveExit=true;
            //        if (w) {
            //            w.close();
            //            window.customws=null;
            //        }
            //        dispatch(updateLogin(false));
            //        dispatch(clearMenu());
            //    } else {
            //        window.CustomRemind.open({onText: '确定', title: "失败", msg: res.msg, type: '2'});
            //    }
            //}).catch(err => {
            //    console.log(err)
            //})
        },
        exit: ()=> {
            dispatch(updateLogin(false));
            dispatch(clearMenu());
        },
        switchMenu: (menu)=> {
            dispatch(switchMenu(menu));
        },
        onReplaceMenu: (key, activeKey, activeTitle)=> {
            dispatch(replaceMenu(key, activeKey, activeTitle));
        },
        onAddClick: (key, title) => {
            dispatch(addMenu(key, title));
        },
        onDeleteClick: (key, activeKey) => {
            dispatch(deleteMenu(key, activeKey));
        },
        onToggleClick: (activeKey) => {
            dispatch(toggleMenu(activeKey));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader)