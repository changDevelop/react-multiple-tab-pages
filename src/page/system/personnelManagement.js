/**
 * Created by chang on 2019/1/8.
 */
import React from 'react';
import {connect} from 'react-redux';
import { Input ,Button,Modal} from 'antd';
import {updateLogin} from '../../redux/actions/common-action'
import { addMenu,deleteMenu,toggleMenu,switchMenu,replaceMenu }  from '../../redux/actions/menu-action';

/**
 * 人员管理
 */
class PersonnelManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                人员管理
            </div>
        )
    }

    componentDidMount() {

    }
}
const mapStateToProps = (state) => {
    return {
        modularArr: state.menu.modularArr,
        activeKey: state.menu.activeKey,
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
        },
        exitLogin: ()=> {
            dispatch(updateLogin(false));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonnelManagement)