import React from 'react';
import {connect} from 'react-redux';
import { addMenu,deleteMenu,toggleMenu }  from '../../../redux/actions/menu-action';
import {Icon,Select,Button } from 'antd';
import storage from '../../../config/storage';
import styles from './sider.scss'
import menuIcon from './icon'
import Indexsvg from '../img/sider/index.svg'
class Sider extends React.Component {
    constructor(props) {
        super(props);
        window.Sider=this;
    }
    handleClick = (key,title) => {
        if (key && (key !== this.props.tabsActiveKey||this.props.modularArr.indexOf(key.toString())===-1)) {
            let modularArr = this.props.modularArr;
            if (modularArr.indexOf(key) < 0) {
                this.props.onAddClick(key,title)
            } else {
                this.props.onToggleClick(key)
            }
        }
    }

    render() {
        let now = Date.now();
        return (<div className={styles.menuContent} >
            <div className={styles.header}></div>
            {window.menuTwoMap[this.props.menu]&&window.menuTwoMap[this.props.menu].map((item,index)=>{
                    return <div style={index===0?{marginTop: '0.4rem'}:{}} className={this.props.activeKey===item.key?styles.menuActive:styles.menuLi}
                         key={item.key}
                         onClick={()=>{this.handleClick(item.key,item.name)}}
                    ><Icon component={menuIcon[item.key]?menuIcon[item.key]:Indexsvg} fill={this.props.activeKey===item.key?"#FFFFFF":"#666666"} /><span>{item.name}</span></div>
            })}

        </div>);
    }
    componentWillUnmount() {
        window.Sider=undefined;
        this.setState = (state, callback) => {
            return
        };

    }
}
const mapStateToProps = (state) => {
    return {
        modularArr: state.menu.modularArr,
        menu: state.menu.menu,
        activeKey: state.menu.activeKey,
        tabsActiveKey: state.menu.tabsActiveKey
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
export default connect(mapStateToProps, mapDispatchToProps)(Sider)