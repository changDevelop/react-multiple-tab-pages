import React from 'react';
import { Input ,Button} from 'antd';
import storage from '../../config/storage';
import store from '../../redux';
import {storageEncrypt} from '../../http/aes'
import {updateLogin} from '../../redux/actions/common-action'
import styles from './login.scss'
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isClick: false,
            usernameError: false,
            passwordError: false
        };

        storage.clear();
    }

    onChangeUserName = (e) => {
        this.setState({username: e.target.value.replace(/\s/g, '')});
    }
    onChangePassword = (e) => {
        this.setState({password: e.target.value.replace(/\s/g, '')});
    }
    login = ()=> {
        var error = false;
        if (!this.state.username) {
            error = true;
            this.setState({
                usernameError: true
            })
        }
        if (!this.state.password) {
            error = true;
            this.setState({
                passwordError: true
            })
        }
        if (error) return;

        this.setState({
            isClick: true
        });
        //一级菜单
        window.menuOneList = [{
            name: "基础信息",
            permissionId: "66",
            permissionCode: "basicsInfo",
            key: "basicsInfo",
            order: "1"
        }, {
            key: "system",
            name: "系统设置",
            order: "8",
            permissionCode: "system",
            permissionId: "42"
        }];

        //二级菜单
        window.menuTwoMap = {
            basicsInfo:[{
                    key: "10",
                    name: "信息",
                    order: "1",
                    permissionCode: "10",
                    permissionId: "76"
                }],
            system: [{
                key: "82",
                name: "权限功能",
                order: "1",
                permissionCode: "82",
                permissionId: "43"
            }, {
                key: "83",
                name: "用户管理",
                order: "2",
                permissionCode: "83",
                permissionId: "64"
            }]
        };

        //具体每个功能
        window.functionList = ["8201", "8203"];
        window.Axios.defaults.headers.common['token'] = "123456789";//登录成功后把获取到的token加到header中
        storage.setItem('token', "123456789");
        storage.setItem('menuOneList', storageEncrypt(JSON.stringify(window.menuOneList)));
        storage.setItem('menuTwoMap', storageEncrypt(JSON.stringify(window.menuTwoMap)));
        storage.setItem('functionList', storageEncrypt(JSON.stringify(window.functionList)));
        store.dispatch(updateLogin(true));//更新登录状态
        //window.Axios({
        //    url: window.ApiName.ApiLogin,
        //    method: 'post',
        //    data: {
        //        username: this.state.username,
        //        password: this.state.password
        //    },
        //}).then(res => {
        //    console.log("%c登录",'color:red');
        //    console.log(res);
        //    this.setState({
        //        isClick: false
        //    });
        //    if (res.code === 10000) {
        //        let loginTime = Date.now();
        //        window.Axios.defaults.headers.common['token'] = res.data.token;//登录成功后把获取到的token加到header中
        //        storage.setItem('token', res.data.token);
        //        storage.setItem('loginTime',storageEncrypt(loginTime));
        //        window.loginTime=loginTime;
        //        window.menuOneList = res.data.menuMap.menuOneList; //一级菜单
        //        window.menuTwoMap = res.data.menuMap.menuTwoMap;   //二级菜单
        //        window.functionList = res.data.menuMap.functionList; //功能点
        //        storage.setItem('menuOneList', storageEncrypt(JSON.stringify(window.menuOneList)));
        //        storage.setItem('menuTwoMap', storageEncrypt(JSON.stringify(window.menuTwoMap)));
        //        storage.setItem('functionList', storageEncrypt(JSON.stringify(window.functionList)));
        //        store.dispatch(updateLogin(true));
        //    } else {
        //        window.CustomRemind.open({
        //            onText: '确定',  //按钮文本 非必传 默认 "确定"
        //            title: "登录失败", //提醒标题 非必传 默认 空字符串
        //            msg: res.msg, //提醒内容 非必传 默认 空字符串
        //            type: '2' //提醒类型 1:成功，2：失败，3：警告,4：企话宝提醒 必传
        //        });
        //    }
        //}).catch(err => {
        //    console.log(err);
        //    this.setState({
        //        isClick: false
        //    });
        //})
    }

    render() {
        return (
            <div className={styles.bg}>
                <div className={styles.top}>
                    <span /><span>****************系统</span>
                </div>
                <div className={styles.loginContent}>
                    <div >登录</div>
                    <div>用户名</div>
                    <Input className={[styles.username,this.state.usernameError?styles.error:''].join(" ")}
                           value={this.state.username}
                           onChange={this.onChangeUserName}
                           onFocus={()=>this.setState({usernameError:false})}
                           onPressEnter={this.login}
                           autoFocus
                           placeholder="请输入账号"/>
                    <span className={this.state.usernameError?styles.error:''}></span>
                    <div>密码</div>
                    <Input className={[styles.pwd,this.state.passwordError?styles.error:''].join(" ")}
                           type="password"
                           value={this.state.password}
                           onFocus={()=>this.setState({passwordError:false})}
                           onChange={this.onChangePassword}
                           onPressEnter={this.login}
                           placeholder="请输入密码"/>
                    <span className={this.state.passwordError?styles.error:''}></span>
                    <Button className={styles.submit} loading={this.state.isClick} type="primary"
                            onClick={this.login}>登录</Button>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        };
    }
}