import CryptoJS from 'crypto-js';

let AuthTokenKey = "2345678923456789"; //AES密钥（与后台交互加密使用）
let storageAuthTokenKey = "1234567812456789"; //AES密钥（storage存储加密使用）
/*AES加密*/
export function encrypt(data) {
    var key = CryptoJS.enc.Utf8.parse(AuthTokenKey);
    var srcs = CryptoJS.enc.Utf8.parse(data);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/*AES解密*/
export function decrypt(data) {
    var key = CryptoJS.enc.Utf8.parse(AuthTokenKey);
    var decrypt = CryptoJS.AES.decrypt(data, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
}

/*storage存储AES加密*/
export function storageEncrypt(data) {
    var key = CryptoJS.enc.Utf8.parse(storageAuthTokenKey);
    var srcs = CryptoJS.enc.Utf8.parse(data);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/*storage存储AES解密*/
export function storageDecrypt(data) {
    var key = CryptoJS.enc.Utf8.parse(storageAuthTokenKey);
    var decrypt = CryptoJS.AES.decrypt(data, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
