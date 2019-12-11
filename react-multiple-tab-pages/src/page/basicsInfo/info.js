/**
 * Created by chang on 2019/1/8.
 * editor zhao
 */
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input, Divider,Pagination, Select, DatePicker,Icon,Tooltip } from 'antd';
import { updateLogin } from '../../redux/actions/common-action'
import { addMenu, deleteMenu, toggleMenu } from '../../redux/actions/menu-action';

import { Title, CustomEmpty, antIcon } from '../components/common/common';

import commonStyles from '../common.scss';
import styles from './scss/info.scss'
import moment from "moment";

/**
 * 信息
 */
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    /*
    *跳转详情
    */
    toDetail = (data) => {
        if (this.props.modularArr.indexOf('details-' + data.id) > -1) {
            this.props.onToggleClick('details-' + data.id);
        } else {
            this.props.onAddClick('details-' + data.id, '详情');
        }
    }

    render() {
        return (
            <div className={styles.content} style={{ minHeight: this.props.height - 154, paddingBottom: "84px" }}>
                <Title title="信息" />
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
        exitLogin: () => {
            dispatch(updateLogin(false));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Info)