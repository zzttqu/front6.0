import {createRouter, createWebHistory} from "vue-router";
import store from "../store/store";


const routes = [
    {
        path: "/",
        name: "Home",
        meta: {
            isLogin: false,
        },
        component: () => import("../views/Home.vue")
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            isLogin: false,
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: "/register",
        name: "register",
        meta: {
            isLogin: false,
        },
        component: () => import("../views/Register.vue")
    },
    {
        path: "/user",
        name: "user",
        meta: {
            isLogin: false,
        },
        component: () => import("../views/UserInfoPage.vue")
    },
    {
        path: "/bbs",
        name: "bbs",
        meta: {
            isLogin: false,
        },
        component: () => import("../views/BBSPage.vue")
    },
    {
        path: "/test",
        component: () => import("../views/TEST.vue")
    },
    {
        path: "/gallery",
        component: () => import("../views/Gallery.vue")
    },
    {
        path: "/forum",
        component: () => import("../views/Forum.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
router.beforeEach((to, from, next) => {
    let isLogin = store.state.isLogin;
    if (isLogin) {
        next();
    }
    else if (!to.meta.isLogin) {
        next();
    }
    else {
        next({
            path: "/login",
            query: {url: to.path},
        });
    }

});