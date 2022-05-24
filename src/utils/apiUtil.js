import axios from "axios";
import {Msg} from "../store/Msg";

//调试需要修改http://localhost:8080/utils
//上线后修改为http://152.136.137.249/utils

let request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 10 * 1000,
    withCredentials: true,
});
request.defaults.retry = 1;
request.defaults.retryDelay = 2000;
let requestList = new Set();
request.interceptors.request.use(config => {
        config.cancelToken = new axios.CancelToken(e => {
            if (!requestList.has(config.url)) {
                requestList.add(config.url);
            }
            else {
                e(`重复请求${config.url}`);
                Msg({
                    showClose: true,
                    message: "请求过于频繁，请稍后重试",
                });
            }
        });
        return config;
    },
    error => {
        Msg({
            showClose: true,
            message: "请求出错",
        });
        return Promise.reject(error);
    });
request.interceptors.response.use(
    response => {
        setTimeout(() => {
            requestList.delete(response.config.url);
        }, 200);
        //500ms内不允许重复提交
        //响应成功业务逻辑
        if (response.status === 200) {
            //成功且合法
            if (response.data.status === 1) {
                return response.data.data;
            }
            else if (response.data.status === 403) {
                Msg({
                    showClose: true,
                    message: `${response.data.data}，休息一下吧`,
                });
                return false;
            }
            //成功但不合法
            else {
                Msg({
                    showClose: true,
                    message: `请求不合法，详细信息：${response.data.data}`,
                    color: "warning",
                });
                return response.data.data;
            }
        }
    },
    err => {
        if (axios.isCancel(err)) {
            console.log(`请求被取消`);
        }
        else {
            if (err.response) {
                if (err.response.status === 401) {
                    Msg({
                        showClose: true,
                        message: `请求有问题`,
                        color: "warning",
                    });
                }
                else if (err.response.status === 500) {
                    Msg({
                        showClose: true,
                        message: `服务器崩了啊！！！！！`,
                        color: "warning",
                    });
                }
                else if (err.response.status === 404) {
                    Msg({
                        showClose: true,
                        message: `${err.config.url}找不到了`,
                        color: "warning",
                    });
                }
            }
            //这种是出错了，需要删除然后重试
            requestList.delete(err.config.url);
            let config = err.config;
            // If config does not exist or the retry option is not set, reject
            if (!config || !config.retry) {
                return Promise.reject(err);
            }

            // Set the variable for keeping track of the retry count
            config.__retryCount = config.__retryCount || 0;

            // Check if we've maxed out the total number of retries
            if (config.__retryCount >= config.retry) {
                // Reject with the error
                Msg({
                    color: "error",
                    message: "网络连接超时",
                });
                return Promise.reject(err);
            }

            // Increase the retry count
            config.__retryCount += 1;

            // Create new promise to handle exponential backoff
            let backoff = new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, config.retryDelay || 1);
            });

            // Return the promise in which recalls axios to retry the request
            return backoff.then(function () {
                return request(config);
            });

        }
        // else {
        //     if (error.response.status === 401) {
        //         Msg({
        //             showClose: true,
        //             message: `请求有问题`,
        //             type: "warning",
        //
        //         });
        //     }
        //     else if (error.response.status === 500) {
        //         Msg({
        //             showClose: true,
        //             message: `服务器崩了啊！！！！！`,
        //             type: "warning",
        //             center: true,
        //             duration: 5000,
        //         });
        //     }
        //     else if (error.response.status === 404) {
        //         Msg({
        //             showClose: true,
        //             message: `${error.config.url}找不到了`,
        //             type: "warning",
        //             center: true,
        //             duration: 5000,
        //         });
        //     }
        //     // requestList.delete(error.config.url);
        //     //console.log(error.response.status);
        //     // 请求如果失败了，务必从列表里面删掉，否则请求拦截器会取消请求
        //
        // }
    });

export default request;