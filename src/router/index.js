import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import("../views/Home.vue")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/register',
    name:'register',
    component:()=>import("../views/Register.vue")
  },
  {
    path:'/user',
    component:()=>import('../views/UserInfoPage.vue')
  },
  {
    path:'/test',
    component:()=>import('../views/TEST.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
