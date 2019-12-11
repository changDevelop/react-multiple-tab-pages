/**
 * Created by chang on 2019/1/8.
 * Changed by zhao on 2019/1/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Modal, Tree, Divider, Pagination, Icon, Table, Select } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { addMenu } from '../../redux/actions/menu-action';
import { Title, CustomEmpty } from '../components/common/common';
import { Resizable } from 'react-resizable';
import styles from "./scss/privilegeManagement.scss";
import commonStyles from '../common.scss';
import Error from '../../img/error.svg';

/**
 * 权限管理
 */
class PrivilegeManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                权限管理
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
        height: state.common.height
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddClick: (key, title) => {
            dispatch(addMenu(key, title));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivilegeManagement)