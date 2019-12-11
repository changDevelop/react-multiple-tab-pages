import React from 'react';
import {connect} from 'react-redux';
import { Tabs,Icon } from 'antd';
import { addMenu,deleteMenu,toggleMenu }  from '../../../redux/actions/menu-action';
import styles from './tabs.scss'
const TabPane = Tabs.TabPane;
class MyTabs extends React.Component {
    constructor(props) {
        super(props);
        window.MyTabs = this;
    }

    onChange = (e, tabsActiveKey) => {
        if (tabsActiveKey === this.props.tabsActiveKey) return;
        this.props.onToggleClick(tabsActiveKey)
    }

    remove = (e, targetKey) => {
        e.stopPropagation();
        e.cancelBubble = true;
        let tabsActiveKey = this.props.tabsActiveKey;
        if (targetKey === tabsActiveKey) {//删除当前显示的
            const panes = this.props.panes.filter(pane => pane.key !== targetKey);
            tabsActiveKey = panes[panes.length - 1].key;
            this.props.onDeleteClick(targetKey, tabsActiveKey)
        } else {//删除不是当前显示的
            this.props.onDeleteClick(targetKey, tabsActiveKey)
        }
    }
    customTabBar = ()=> {
        const len=this.props.panes.length;
        let width= len>10?Math.floor(1686/len)-24:136;
        return (
            <div className={styles.tabBar} style={{marginLeft:-this.props.scrollLeft}}>
                {this.props.panes.map(pane => <span style={{width:width}} className={pane.key===this.props.tabsActiveKey?styles.active:""}
                                                    key={pane.key} onClick={(e)=>{this.onChange(e,pane.key)}}>
                    {pane.title}
                    {pane.key !== "82"? <Icon className={styles.icon} type="close" onClick={(e)=>{this.remove(e,pane.key)}}/> : ""}
                </span>)}
            </div>
        )
    }

    render() {
        return (
            <Tabs
                style={{minWidth:'calc(1200px - 2.56rem)'}}
                onChange={this.onChange}
                activeKey={this.props.tabsActiveKey}
                type="editable-card"
                hideAdd={true}
                renderTabBar={this.customTabBar}
            >
                {this.props.panes.map(pane => <TabPane tab={pane.title} key={pane.key} forceRender={true}
                                                       closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
        );
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        };
    }
}
const mapStateToProps = (state) => {
    return {
        modularArr: state.menu.modularArr,
        activeKey: state.menu.activeKey,
        tabsActiveKey: state.menu.tabsActiveKey,
        panes: state.menu.panes,
        isLogin: state.common.isLogin
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddClick: (key,title) => {
            dispatch(addMenu(key,title));
        },
        onDeleteClick: (key, activeKey) => {
            dispatch(deleteMenu(key, activeKey));
        },
        onToggleClick: (activeKey) => {
            dispatch(toggleMenu(activeKey));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyTabs)
