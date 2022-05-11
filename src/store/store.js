import {createStore} from "vuex";
import request from "../utils/apiUtil";
import msg from "./modules/msg";

export default createStore({
    state: {
        //测试的时候转为http://localhost:8080/utils/file/img/
        //部署的时候转为http://152.136.137.249/utils/file/img/
        imgUrl: process.env.VUE_APP_IMG_BASE_URL,
        user: {
            likes: [],
            uid: 0,
            username: "",
            isLogin: false,
            exp: 0,
            expCount: [0, 0, 0],
        },
        pattern: /(\u5f20\u5929\u5955)|(\u4e60\u8fd1\u5e73)/,
        session: "",
    },
    mutations: {
        setUserlikes(state, dialog_id) {
            const index = state.user.likes.indexOf(dialog_id);
            if (index === -1) {
                state.user.likes.push(dialog_id);
            }
            else {
                state.user.likes.splice(index, 1);
            }
        },
        setUsername(state, username) {
            state.user.username = username;
        },
        userLogin(state, status) {
            state.user.uid = status.uid;
            state.user.isLogin = status.isLogin;
            state.user.likes = status.likes;
            state.user.username = status.username;
        },
        checkUserLogin(state, status) {
            state.user.isLogin = status.isLogin;
        },
    },
    actions: {
        checkUserStatus({commit}) {
            request.get(`/landr/check`).then(res => {
                if (res === 1) {
                    commit("checkUserLogin",
                        {
                            isLogin: true,
                        }
                    );
                }
                else {
                    commit("userLogin", {
                        uid: 0,
                        isLogin: false,
                        likes: [],
                        username: ""
                    });
                    // router.push('/login')
                }
            });
        },
        //这个登录的时候要用
        setUserStatus({commit}, status) {
            commit("userLogin", status);
        },
    },
    modules: {
        msg
    }
});
