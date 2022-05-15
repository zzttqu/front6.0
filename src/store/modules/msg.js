import store from '../store.js'
export default {
    namespaced: true,
    state: {
        text: "",
        color: "",
        timeout: 0,
        showClose: true
    },
    mutations: {
        showMsg(state, payload) {
            state.text = payload.text;
            state.color = payload.color;
            state.timeout = payload.timeout;
            state.showClose = payload.showClose;
        },
    },
    actions: {
        showMsg({commit}, payload) {
            commit("showMsg", payload);
        }
    }


};

export const Msg = (option) => {
    store.dispatch("msg/showMsg", {
        text: option.message || "爱莉希雅",
        showClose: option.showClose || false,
        timeout: option.timeout || 2000,
        color: option.color || "success"
    });
};