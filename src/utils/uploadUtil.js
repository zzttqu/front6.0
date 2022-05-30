import COS from "cos-js-sdk-v5";
import request from "./apiUtil";

export const cos = new COS({
    getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048

        request.post('/post/imgkey').then(res=>{
            callback({
                TmpSecretId: res.credentials.tmpSecretId,
                TmpSecretKey: res.credentials.tmpSecretKey,
                SecurityToken: res.credentials.sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000000
            })
        })
    }
});