import * as qiniu from 'qiniu-js'
/**
 * 计时
 * @num 秒数
 */
export function timeInterval(n, type) {
    var num = n * 1000;
    //计算出相差天数
    var days = Math.floor(num / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = num % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    switch (type) {
        case 1:
            return ((days * 24 + hours) * 60 + minutes) + "分钟" + (seconds < 10 ? '0' + seconds : seconds) + "秒";
        case 2:
            return (days * 24 + hours) + "小时" + (minutes < 10 ? '0' + minutes : minutes) + "分钟" + (seconds < 10 ? '0' + seconds : seconds) + "秒";
        default:
            return (days * 24 + hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
    }
}

/**
 * 时间间隔
 * @param start 开始时间
 * @param end   结束时间
 * @param type   需要返回的类型 1:  2小时30分钟50秒 2：30分钟50秒 3:秒数（int）
 */
export function timeIntervalString(start, end, type) {
    var date3 = end.getTime() - new Date(start.replace(/-/g, "/").replace(/\.0/g, "")).getTime();   //时间差的毫秒数
    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);

    switch (type) {
        case 1:
            return (days * 24 + hours) + "小时" + minutes + "分钟" + seconds + "秒";
        case 2:
            return ((days * 24 + hours) * 60 + minutes) + "分钟" + seconds + "秒";
        case 3:
            return Math.floor(date3 / 1000);
        default:
            return (days * 24 + hours) + ":" + minutes + ":" + seconds;
    }
}

/**
 * 验证手机号
 * @param mobile
 * @returns {boolean}
 */
export function isMobile(mobile) {
    var reg = /^1[3456789]\d{9}$/;
    if (reg.test(mobile)) {
        return true
    } else {
        return false
    }
}
/**
 * 验证身份证号码
 * @param card
 * @returns {boolean}
 */
export function isIdCard(card) {
    if (card.length != 18) {
        return false
    }
    if (card[card.length - 1] == "x") {
        card = card.substr(0, 17) + "X";
    }
    var reg = /^\d{6}((?:19|20)((?:\d{2}(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))|(?:\d{2}(?:0[13456789]|1[012])(?:0[1-9]|[12]\d|30))|(?:\d{2}02(?:0[1-9]|1\d|2[0-8]))|(?:(?:0[48]|[2468][048]|[13579][26])0229)))\d{2}(\d)[xX\d]$/
    if (reg.test(card)) {
        var num = card;
        var arr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var last = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
        var s = 0;
        for (var i = 0; i < arr.length; i++) {
            s = s + num[i] * arr[i];
        }
        var l = last[s % 11];//最后一位    console.log(l)
        if (l == num[num.length - 1]) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
/**
 * 七牛上传图片
 */
export function uploadQiniuImage(file, callBack) {
    let url = "https://95009qiniu.zhoti.net/";
    let imgUrl = "";
    window.Axios({
        url: window.ApiName.ApiGetToken,
        method: 'POST',
    }).then((res) => {
        console.log("获取七牛上传地址的token")
        console.log(res)
        if (res.code === 10000) {
            let str = file.name;
            let imgName = "." + str.substr(str.indexOf('.') + 1);
            var observable = qiniu.upload(file, uuid() + imgName, res.data.upToken, {
                fname: str
            }, {
                    useCdnDomain: true,
                    region: null
                });
            var observer = {
                next(res) {
                    console.log(res)
                },
                error(err) {
                    console.log(err)
                },
                complete(res) {
                    imgUrl = url + res.key;
                    callBack(imgUrl);
                }
            }
            observable.subscribe(observer)
        }
    })

}
export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uu = s.join("");
    return uu;
}
/**
 * px 转 rem
 * @param size rem值
 * @returns {number} px值
 */
export function transformationRem(size) {
    return size * parseFloat(getStyle(document.documentElement, "fontSize"));
}
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, null)[attr];
    }
}

/**
 * 以json中某个key进行排序
 * @param obj
 * @param key
 * @param type string desc：降序，asc：升序
 * @returns {*}
 */
export function jsonSort(obj, key, type) {
    var colId = key;
    var desc = function (x, y) {
        return (Number(x[colId]) < Number(y[colId])) ? 1 : -1
    };
    //对json进行升序排序函数
    var asc = function (x, y) {
        return (Number(x[colId]) > Number(y[colId])) ? 1 : -1
    };
    if (type === "desc") {
        obj.sort(desc); //降序排序
    } else {
        obj.sort(asc); //升序排序
    }
    return obj
}

/**
 * 获取省份列表
 * @param callback
 */
export function getProvinces(callback) {
    window.Axios({
        url: window.ApiName.ApiGetProvinces,
        method: 'POST',
        data: {}
    }).then(res => {
        console.log('%c获取省份列表', 'color:red');
        console.log(res);
        if (res.code === 10000) {
            if (callback) {
                callback(res.data)
            }
        } else {
            window.CustomRemind.open({ onText: '确定', title: "失败", msg: res.msg, type: '2' });
        }
    }).catch(err => {
        console.log(err)
    })
}
/**
 * 获取城市列表
 * @param code
 * @param callback
 */
export function getCities(code, callback) {
    window.Axios({
        url: window.ApiName.ApiGetCities,
        method: 'POST',
        data: {
            provinceCode: code
        }
    }).then(res => {
        console.log('%c获取城市列表', 'color:red');
        console.log(res);
        if (res.code === 10000) {
            if (callback) {
                callback(res.data)
            }
        } else {
            window.CustomRemind.open({ onText: '确定', title: "失败", msg: res.msg, type: '2' });
        }
    }).catch(err => {
        console.log(err)
    })
}

/**
 * 获取区县列表
 * @param code
 * @param callback
 */
export function getAreas(code, callback) {
    window.Axios({
        url: window.ApiName.ApiGetAreas,
        method: 'POST',
        data: {
            cityCode: code
        }
    }).then(res => {
        console.log('%c获取区县列表', 'color:red');
        console.log(res);
        if (res.code === 10000) {
            if (callback) {
                callback(res.data)
            }
        } else {
            window.CustomRemind.open({ onText: '确定', title: "失败", msg: res.msg, type: '2' });
        }
    }).catch(err => {
        console.log(err)
    })
}


/**
 * 时间格式化
 * @param s 需要格式的时间秒
 */
export function secondsFormat(s) {
    // var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
    // var hour = Math.floor((s - day * 24 * 3600) / 3600);
    // var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
    // var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
    // return day + "天" + hour + "时" + minute + "分" + second + "秒";

    var hour = Math.floor(s / 3600);
    var minute = Math.floor((s - hour * 3600) / 60);
    var second = s - hour * 3600 - minute * 60;
    return { 'h': hour, 'm': minute, 's': second };
}