import React from 'react';
import {connect} from 'react-redux';
import { Layout,ConfigProvider} from 'antd';
import { Map } from 'react-amap';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {CustomRemind,CustomConfirm} from './components/common/common';
import { updateLogin,updateHeight,updateWidth} from '../redux/actions/common-action'
import { addMenu,deleteMenu,toggleMenu }  from '../redux/actions/menu-action';

import { Scrollbars } from 'react-custom-scrollbars';
import './components/menu'
import SiderComponent from './components/sider/sider'
import Header from './components/header/header'
import MyTabs from './components/tabs/tabs'
import Login from './login'
import styles from './index.scss'
const { Sider, Content} = Layout;

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollLeft: 0
        }
        window.onresize = function () {
            this.setHeight();
        }.bind(this);
    }

    setHeight = ()=> {
        this.props.updateHeight();
        this.props.updateWidth();
    }

    /**
     * 横向滚动自定义tab条也相应滚动
     */
    scrollUpdate = ()=> {
        this.setState({
            scrollLeft: this.refs.scrollbars.getScrollLeft()
        })
    }

    shouldComponentUpdate(newProps, newState) {
        if (newProps.isLogin !== this.props.isLogin) {
            if (!this.props.isLogin) {
                this.setState({
                    scrollLeft: 0
                })
            }
        }
        return true
    }

    renderTrackHorizontal = ()=> {
        return (<div
            style={{position: 'absolute', right: '2px',bottom: '2px', borderRadius: '5px',height:'10px',width:'100%'}}>

        </div>)
    }

    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <div className={styles.body}>
                    {this.props.isLogin ? <Scrollbars
                        style={{ width: 'auto',height:this.props.height}}
                        thumbMinSize={30}
                        autoHeightMax={this.props.height}
                        autoHeight
                        renderTrackHorizontal={this.renderTrackHorizontal}
                        onScroll={this.scrollUpdate}
                        ref="scrollbars"
                    >
                        <Layout
                            style={{ minHeight: '100vh',width:'auto',minWidth:'15rem' }}>
                            <Header />
                            <Layout style={{height:'calc(100vh - 78px)'}}>
                                <Sider width={"2.1rem"} style={{color:'#000'}}>
                                    <SiderComponent />
                                </Sider>
                                <Content ref="test" className={styles.content}>
                                    <Scrollbars
                                        style={{ width: 'auto',height:this.props.height-120}}
                                        thumbMinSize={30}
                                        autoHeightMax={this.props.height-120}
                                        autoHeight
                                    >
                                        <MyTabs scrollLeft={this.state.scrollLeft}/>
                                    </Scrollbars>
                                </Content>
                                <CustomConfirm />
                            </Layout>
                        </Layout>
                    </Scrollbars> : <Login />}
                    <CustomRemind  />
                </div>
            </ConfigProvider>
        )
    }

    componentDidMount() {
        document.onkeydown = (event)=> {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && (e.keyCode == 27 || e.keyCode == 122)) { // 按 Esc或F11
                this.setState({
                    isStatistics: false
                })
                if (e && e.preventDefault) {
                    e.preventDefault();
                }
                //IE中组织浏览器行为
                else {
                    window.event.returnValue = false;
                    return false;
                }

            }
        };
        //监听不同浏览器的全屏事件，并件执行相应的代码
        document.addEventListener("webkitfullscreenchange", ()=> {//
            if (document.webkitIsFullScreen) {
                //全屏后要执行的代码
            } else {
                //退出全屏后执行的代码
                this.setState({
                    isStatistics: false
                })
            }
        }, false);

        document.addEventListener("fullscreenchange", ()=> {
            if (document.fullscreen) {
                //全屏后执行的代码
            } else {
                //退出全屏后要执行的代码
                this.setState({
                    isStatistics: false
                })
            }
        }, false);

        document.addEventListener("mozfullscreenchange", ()=> {
            if (document.mozFullScreen) {
                //全屏后要执行的代码
            } else {
                //退出全屏后要执行的代码
                this.setState({
                    isStatistics: false
                })
            }
        }, false);

        document.addEventListener("msfullscreenchange", ()=> {
            if (document.msFullscreenElement) {
                //全屏后要执行的代码
            } else {
                //退出全屏后要执行的代码
                this.setState({
                    isStatistics: false
                })
            }
        }, false)
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }

    }
}
const mapStateToProps = (state) => {
    return {
        modularArr: state.menu.modularArr,
        activeKey: state.menu.activeKey,
        panes: state.menu.panes,
        isLogin: state.common.isLogin,
        height: state.common.height
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddClick: (key, title) => {
            dispatch(addMenu(key, title));
        },
        onDeleteClick: (key, activeKey) => {
            dispatch(deleteMenu(key, activeKey));
        },
        onToggleClick: (activeKey) => {
            dispatch(toggleMenu(activeKey));
        },
        exitLogin: ()=> {
            dispatch(updateLogin(false));
        },
        updateHeight: ()=> {
            dispatch(updateHeight(document.body.clientHeight))
        },
        updateWidth: ()=> {
            dispatch(updateWidth(document.body.clientWidth))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)