/**
 * Created by chang on 2019/2/12.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from './noModule.scss';
import { CustomEmpty } from '../common/common';
/**
 * 模板信息
 */
class NoModule extends React.Component {
    render() {
        return (
            <div className={styles.content} style={{ height: this.props.height - 154 }}>
                <CustomEmpty className={styles.customEmpty} description="该模块暂未开发" />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        height: state.common.height
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoModule)