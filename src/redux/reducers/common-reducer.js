import storage from '../../config/storage'
import  {UPDATE,UPDATEHEIGHT,UPDATEWIDTH,CALLINFO}  from '../actions/common-action';
export default function (state = {
    isLogin: storage.getItem('token') ? true : false,
    height: document.body.clientHeight,
    width: document.body.clientWidth,
    number: storage.getItem("callData") ? JSON.parse(storage.getItem("callData")).originCallNo : ""
}, action) {
    switch (action.type) {
        case UPDATE:
        {
            if (!action.payload.login) {
                if (window.CustomHeader && window.CustomHeader.props.isLogin) {
                    window.Axios({
                        url: window.ApiName.ApiExit,
                        method: 'post',
                        data: {}
                    }).then(function (res) {
                        console.log("%c退出登录", 'color:red');
                        console.log(res);
                        if (res.code === 10000) {
                            if (window.nim) {
                                window.nim.disconnect();
                                window.nim = undefined;
                                console.log('退出视频')
                            }
                            try{
                                if(window.notification){
                                    window.notification.destroy()
                                }
                            }catch (err){
                                console.log(err)
                            }
                            window.isActiveExit = true;
                            if (window.customws) {
                                window.customws.close();
                                window.customws = null;
                            }
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }
                storage.clear();
                window.menuOneList = undefined; //一级菜单
                window.menuTwoMap = undefined;   //二级菜单
                window.functionList = undefined; //功能点
                window.telType = undefined; //是否有电话视频
                window.telRole = undefined; //是否是组长
                window.roleGrade = undefined; //角色等级
                window.seatInfo = undefined; //坐席信息
                window.accountNumber = undefined; //账号或者工号
                window.tId = undefined; //客服id
                window.callCenterNumber = undefined; //呼叫中心编号
                window.skillsGroupName = undefined; //呼叫中心所对应技能组名字
                window.phone = undefined;
                window.softphoneBar = undefined;
                window.loginTime = undefined;//登录时间
                window.appKey = undefined;
                window.telToken = undefined;
            }
            return {
                ...state,
                isLogin: action.payload.login
            }
        }
        case UPDATEHEIGHT:
        {
            return {
                ...state,
                height: action.payload.height
            }
        }
        case UPDATEWIDTH:
        {
            return {
                ...state,
                width: action.payload.width
            }
        }
        case CALLINFO:
        {
            return {
                ...state,
                number: action.payload.number
            }
        }
        default:
            return state;
    }
}