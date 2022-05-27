import {createStore} from "vuex";
import request from "../utils/apiUtil";
import Message from "./modules/Message";
import User from "./modules/User.js";

export default createStore({
    state: {
        //测试的时候转为http://localhost:8080/utils/file/img/
        //部署的时候转为http://152.136.137.249/utils/file/img/
        imgUrl: process.env.VUE_APP_IMG_BASE_URL,
        pattern: /(\u5f20\u5929\u5955)|(\u4e60\u8fd1\u5e73)/,
        session: "",
        isLogin: false,
    },
    mutations: {
        checkLogin(state, status) {
            state.isLogin = status;
        },
        setLogin(state, status) {
            state.isLogin = status;
        }
    },
    actions: {
        checkLogin({commit}) {
            request.get(`/landr/check`).then(res => {
                if (res === 1) {
                    commit("checkLogin", true);
                }
                else {
                    commit("checkLogin", false);
                }
            });
        },
    },
    modules: {
        Message,
        User,
    }
});
