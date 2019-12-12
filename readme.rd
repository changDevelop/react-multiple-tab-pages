# 项目布局
├── build                                                   // 打包出来的文件
├── config                                                  // webpack配置文件
├── public
│   ├── index.css                                           // 项目公共样式
│   ├── index.html                                          // 项目入口html
│   ├── logo.ico                                            // logo
├── src                                                     // 源码目录
│   ├── config
│   │   ├── globalConfig.js                                 // 全局变量
│   │   ├── storage.js                                      // sessionStorage
│   ├── http
│   │   ├── aes.js                                          // 加解密方法
│   │   ├── httpApiName.js                                  // 接口地址、日志打印
│   │   ├── index.js                                        // axios配置
│   │   ├── WebSocket.js                                    //
│   │   ├── WebSocket.swf                                   //
│   ├── img                                                 //项目中的img，svg文件
│   │   ├── login                                           // 登录页图片
│   │   │     ├── bg.jpg                                    // 登录页背景图片
│   │   │     ├── logo.png                                  // 登录页logo
│   │   ├── address.svg                                     // 位置图标
│   │   ├── call.png                                        //
│   │   ├── error.svg                                       // 错误提醒图标
│   ├── page                                                // 页面
│   │   ├── basicsInfo                                      // 基础信息
│   │   │   ├── details.js                                  // 详情                key:"details-"
│   │   │   ├── info.js                                     // 信息页面            key:10
│   │   ├── components                                      // 组件
│   │   │   ├── common                                      // 公共组件
│   │   │   ├── header                                      // 头部组件 （websocket连接放在该模块）
│   │   │   ├── img                                // 组件用到媒体资源
│   │   │   ├── noModule                           // 没有组件时展示组件
│   │   │   ├── sider                              // 左部组件
│   │   │   ├── tabs                               //
│   │   │   ├── menu                               // 存储登录信息
│   │   ├── login                                     // 登录
│   │   ├── system                                    // 系统设置
│   │   │   ├── personnelManagement.js             // 人员管理页面        key:80
│   │   │   ├── privilegeManagement.js             // 权限管理页面        key:82
│   │   ├── basic.scss                                // 变量
│   │   ├── common.js                                 // 公共方法
│   │   ├── common.scss                               // 公共样式
│   │   ├── index.js                                  // 页面框架
│   │   ├── index.scss                                // 页面框架样式
│   │   ├── index.scss                                // 页面框架样式
│   │   ├── redux                                     // 状态管理
│   │   │   ├── actions
│   │   │   │   ├── common-action.js            // 公共
│   │   │   │   ├── menu-action.js              // 菜单，页面切换
│   │   │   ├── reducers
│   │   │   │   ├── common-reducer.js           // 公共（登录）
│   │   │   │   ├── menu-reducer.js             // 菜单，页面切换
│   │   │   │   ├── index.js
│   │   │   ├── index.js
│   │   ├── index.js                                  // 入口
│   │   ├── registerServiceWorker.js
│   │   ├── routerPage.js                             //路由(没太大用)



npm i 安装依赖

npm run start 运行项目
