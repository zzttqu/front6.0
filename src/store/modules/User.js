import request from "../../utils/apiUtil";

export default {
    namespaced: true,
    state: {
        likes: [],
        uid: 0,
        username: "默认",
        isSignIn: false,
        level: 0,
        exp: 0,
        expCount: [0, 0, 0],
    },

    mutations: {
        setLikes(state, dialog_id) {
            const index = state.likes.indexOf(dialog_id);
            if (index === -1) {
                state.likes.push(dialog_id);
            }
            else {
                state.likes.splice(index, 1);
            }
        },
        signInStatus(state, status) {
            state.isSignIn = status;
        },
        login(state, status) {
            state.uid = status.uid;
            state.likes = status.likes;
            state.username = status.username;
        },
        setExpInfo(state, info) {
            state.exp = info.exp;
            state.level = info.level;
            state.expCount = info.count;
        }
    },
};