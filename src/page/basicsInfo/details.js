/**
 * Created by chang on 2019/2/25.
 */
import React from 'react';
import { connect } from 'react-redux';
import { addMenu, deleteMenu, toggleMenu } from '../../redux/actions/menu-action';

import { Title } from '../components/common/common';

import commonStyles from '../common.scss';
import styles from './scss/details.scss'

/**
 * 详情
 */
class Details extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            id: this.props.tabsActiveKey.substr(8),
            data: []
        }
    }



    /*
    *获取详情
    */
    getDetails = () => {
    }
    render() {
        return (
            <div className={styles.content} style={{ height: this.props.height - 104 }}>
                <Title title={this.state.id + '基础信息'} />
                <div className={commonStyles.operation} style={{ "marginTop": 24, "height": '100%' }}>

                </div>
            </div>
        )
    }

    componentDidMount() {
        //获取详情
        this.getDetails()
    }
}
const mapStateToProps = (state) => {
    return {
        modularArr: state.menu.modularArr,
        activeKey: state.menu.activeKey,
        panes: state.menu.panes,
        isLogin: state.common.isLogin,
        height: state.common.height,
        tabsActiveKey: state.menu.tabsActiveKey
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details)