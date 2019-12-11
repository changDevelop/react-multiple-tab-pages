/**
 * Created by chang on 2019/1/14.
 */
import React from 'react';
import moment from "moment"
import { Icon, Spin, Button, Modal,Empty,message,Select,Checkbox,Input  } from 'antd';
import styles from './commons.scss';
import commonStyles from '../../common.scss';
import Error from './img/error.svg';
import Success from './img/success.svg';
import Warning from './img/warning.svg';
import EmptyImg from './img/empty.png';
import storage from '../../../config/storage';
import { Scrollbars } from 'react-custom-scrollbars';
/**
 * 表格数据加载转圈圈
 * @type {XML}
 */
export const antIcon = <Icon type="loading" style={{ fontSize: 40,marginTop:50 }} spin/>;

/**
 *
 */
export class Title extends React.Component {
    render() {
        return (
            <div className={styles.title}>
                <span>{this.props.title}</span>
                <span
                    onClick={this.props.clickFunction?this.props.clickFunction:function(){}}>{this.props.rightTitle ? this.props.rightTitle : ''}</span>
            </div>
        )
    }

    componentDidMount() {

    }
}


/**
 *loading图标
 */
export class DiyLoading extends React.Component {
    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 40,color:"#108ae0"}} spin/>;
        return (
            <div className={styles.diyLoading} style={this.props.style}>
                <Spin indicator={antIcon} tip={this.props.tip ? this.props.tip : ''}
                      size={this.props.size ? this.props.size : 'default'}/>
            </div>
        )
    }

    componentDidMount() {

    }
}

/**
 *空状态
 * this.props.descriptionType（number类型）1：暂无数据，2：未分配权限，不传显示暂无数据
 */
export class CustomEmpty extends React.Component {
    render() {
        return (
            <div style={this.props.style} className={this.props.className?this.props.className:styles.customEmpty}>
                <Empty
                    description={this.props.description ? this.props.description : this.props.descriptionType===2?"未分配权限":"暂无数据"}
                    image={this.props.image ? this.props.image : EmptyImg}/>
            </div>
        )
    }
}


/**
 * 打开信息框
 * window.CustomRemind.open({
 * onText:string,  //按钮文本 非必传 默认 "确定"
 * title:string, //提醒标题 非必传 默认 空字符串
 * msg:string //提醒内容 非必传 默认 空字符串
 * type:string //提醒类型 1:成功，2：失败，3：警告 必传
 * onOk: ()=>{} //点击按钮触发事件 非必传
 * })
 */
export class CustomRemind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            okText: '确定',
            type: '',
            msg: '',
            title: '',
            onOk: () => {//点击按钮触发事件
            }
        };
        window.CustomRemind = this;
    }

    /**
     * 打开信息框
     * @param params
     */
    open = (params)=> {
        this.setState({
            visible: true,
            okText: params.okText ? params.okText : '确定',
            title: params.title ? params.title : '',
            type: params.type.toString(),
            msg: params.msg ? params.msg : '',
            onOk: params.onOk ? params.onOk : () => {//点击按钮触发事件
                this.setState({
                    visible: false
                });
                setTimeout(function () {
                    this.setState({
                        okText: '确定',
                        msg: '',
                        type: '',
                        title: ''
                    })
                }.bind(this), 100)
            }
        })
    }

    render() {
        return (
            <Modal
                className={styles.customRemind}
                visible={this.state.visible}
                width={"5.26rem"}
                footer={null}
                maskClosable={false}
                keyboard={false}
                closable={false}
                zIndex={99999999}
            >
                <div className={styles.icon}>{this.state.type === "1" ?
                    <Icon component={Success} style={{ color: '#2497e8'}}/> : (this.state.type === "2" ?
                    <Icon component={Error} style={{ color: '#df0b10'}}/> :
                    <Icon component={Warning} style={{ color: '#ff811c'}}/>)}</div>
                <div className={styles.confirmTitle}
                     style={this.state.type === "1" ?{color:"#2497e8"}:(this.state.type === "2"?{color: '#df0b10'}:{color: '#ff811c'})}>{this.state.title}</div>
                <div className={styles.confirmMsg}
                     style={this.state.type === "4" ?{textAlign:"center"} :{textAlign:"center"}}>
                    {this.state.type === "4" && <div ></div>}
                    <div>{this.state.msg}</div>
                </div>
                <div className={styles.footer}>
                    <button onClick={this.state.onOk}
                            style={this.state.type === "1" ?{background:"#2497e8"}:(this.state.type === "2"?{background: '#df0b10'}:{background: '#ff811c'})}
                    >{this.state.okText}</button>
                </div>
            </Modal>
        )
    }
}


/**
 *确定弹框
 * 打开
 * window.CustomConfirm.open({
 *  okText: string,//确定文本  非必传 默认 "确定"
 *  cancelText: string,//确定文本 非必传 默认 "取消"
 *  msg: string,//信息内容  非必传 默认 "您确定删除吗"
 *  title:string,//信息标题  非必传 默认 "确定删除"
 *  onOk:  function(){},//点击确定触发事件  必传
 *  onCancel:function(){}//点击取消触发事件 非必传 默认关闭
 * })
 * 关闭
 * window.CustomConfirm.close()
 */
export class CustomConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            okText: '确定',
            cancelText: '取消',
            msg: '',
            title: '',
            isLoading: false,
            onOk: () => {
            },
            onCancel: () => {
            }
        };
        window.CustomConfirm = this;
    }

    /**
     *打开弹框
     * @param params
     */
    open = (params)=> {
        this.setState({
            visible: true,
            okText: params.okText ? params.okText : "确定",
            cancelText: params.cancelText ? params.cancelText : "取消",
            msg: params.msg ? params.msg : "您确定删除吗",
            title: params.title ? params.title : "确定删除",
            onOk: ()=> {
                params.onOk();
                this.close()
            },
            onCancel: params.onCancel ? params.onCancel : ()=> {
                this.close()
            }
        })
    }

    close = ()=> {
        this.setState({
            visible: false,
            isLoading: false
        });
        setTimeout(function () {
            this.setState({
                okText: "确定",
                cancelText: "取消",
                msg: "",
                title: "",
                onOk: ()=> {
                }
            })
        }.bind(this), 100)
    }

    render() {
        return (
            <Modal
                className={styles.customConfirm}
                visible={this.state.visible}
                onOk={this.state.onOk}
                onCancel={this.state.onCancel}
                width={"4rem"}
                footer={null}
                maskClosable={false}
                keyboard={false}
                closable={false}
            >
                <div className={styles.confirmTitle}>
                    <Icon type="question-circle"
                          style={{ color: '#faad14', fontSize: '20px' }}/>
                    <span>{this.state.title}</span>
                </div>
                <div className={styles.confirmMsg}>{this.state.msg}</div>
                <div className={styles.footer}>
                    <Button onClick={this.state.onCancel}>{this.state.cancelText}</Button>
                    <Button onClick={this.state.onOk} loading={this.state.isLoading}
                            type="primary">{this.state.okText}</Button>
                </div>
            </Modal>
        )
    }

    componentDidMount() {

    }
}


