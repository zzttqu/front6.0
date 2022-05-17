
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

