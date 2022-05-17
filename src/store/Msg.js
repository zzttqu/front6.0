import store from "./store";

export const Msg = (option) => {
    store.dispatch("msg/showMsg", {
        text: option.message || "爱莉希雅",
        showClose: option.showClose || false,
        timeout: option.timeout || 2000,
        color: option.color || "success"
    });
};