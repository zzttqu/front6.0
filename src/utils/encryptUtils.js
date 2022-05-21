import request from "./apiUtil";
import aes from "crypto-js/aes";
import sha256 from "crypto-js/sha256";

const CryptoJS = require("crypto-js");
// export const encryptAndSend = (rawObject, url) => {
//     let jsonMsg = JSON.stringify({
//         ...rawObject
//     });
//     let encryptMsg = aes.encrypt(jsonMsg, process.env.VUE_APP_KEY).toString();
//     return request.post(url, {
//         info: encryptMsg
//     }).then((res) => {
//         return res;
//     });
// };
export const codeAndSend = (rawMsg, url) => {
    let codedMsg = sha256(rawMsg).toString(CryptoJS.enc.Hex);
    return request.post(url, {
        info: codedMsg
    }).then(res => {
        return res;
    });
};
export const encrypt=(str)=>{
    //这个已经经过了base64编码
    return aes.encrypt(str, process.env.VUE_APP_KEY).toString();
}
export default {};