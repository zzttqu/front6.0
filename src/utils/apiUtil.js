import axios from "axios";
import {Msg} from "../store/modules/msg";
import store from "../store/store.js"
//调试需要修改http://localhost:8080/utils
//上线后修改为http://152.136.137.249/utils


let request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 20 * 1000,
    withCredentials: true,
});
let requestList = new Set();
request.interceptors.request.use(config => {
    config.cancelToken = new axios.CancelToken(e => {
        if (!requestList.has(config.url)) {
            requestList.add(config.url);
        }
        else {
            e(`重复请求${config.url}`);
            Msg(store,{
                showClose: true,
                message: "请求过于频繁，请稍后重试",
                type: "info",
                center: true,
            });
        }
    });
    return config;
},
        error => {
    Msg(store,{
        showClose: true,
        message: "请求出错",
        type: "error",
        center: true,
    });
    return Promise.reject(error);
});
request.interceptors.response.use(response => {
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
            Msg(store,{
                showClose: true,
                message: `${response.data.data}，休息一下吧`,
                type: "info",
                center: true,
                duration: 3000,
            });
            return false;
        }
        //成功但不合法
        else {
            Msg(store,{
                showClose: true,
                message: `请求不合法，详细信息：${response.data.data}`,
                type: "warning",
                center: true,
                duration: 5000,
            });
            return response.data.data;
        }
    }
},
        error => {
    if (axios.isCancel(error)) {
        console.log(`请求被取消`);
    }
    else {
        error.code = error.response.status;
        if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
            ElMessage.warning("请求超时");
        }
        else if (error.message === "Network Error") {
            ElMessage.error("网络连接异常，请重试");
        }
        else if (error.code === 401) {
            Msg(store,{
                showClose: true,
                message: `请求有问题`,
                type: "warning",
                center: true,
                duration: 5000,
            });
        }
        else if (error.code === 500) {
            Msg(store,{
                showClose: true,
                message: `服务器崩了啊！！！！！`,
                type: "warning",
                center: true,
                duration: 5000,
            });
        }
        else if (error.code === 404) {
            Msg(store,{
                showClose: true,
                message: `${error.config.url}找不到了`,
                type: "warning",
                center: true,
                duration: 5000,
            });
        }
        //console.log(error.response.status);
        // 请求如果失败了，务必从列表里面删掉，否则请求拦截器会取消请求
        requestList.delete(error.config.url);
    }
});

export default request;