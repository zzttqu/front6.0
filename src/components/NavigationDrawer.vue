<template>
  <v-navigation-drawer
      v-model="drawer"
      temporary
      width="10rem"
      elevation="0"
  >
    <v-list
        width="10rem"
        color="blue"
    >
      <v-list-item
          to="/"
      >
        首页
      </v-list-item>
      <v-list-item
          :active="false"
          to="/bbs"
      >
        留言板
      </v-list-item>
      <v-list-item
          to="/forum"
      >
        讨论区
      </v-list-item>
      <v-list-item
          disabled=""
          to="/gallery"
      >
        图片区
      </v-list-item>

    </v-list>
    <!--    基本信息-->
    <div :class="'userInfo '+(store.state.User.isSignIn?'':'red-dot')" @click="$router.push('/user')">
      <div class="basicInfo">
        <div class="avatar">
          <img
              class="avatarImg"
              :src="store.state.User.avatar"
              alt="头像"
          />
          <img src="https://s2.loli.net/2022/04/06/9qguvWyIhixYjbF.png" alt="头像"
               class="avatarRound"
          />
        </div>
        <div class="uandr text-blue-lighten-1">
          <div class="username">
            {{ store.state.User.username }}
          </div>
          <div class="level">
            <span>
              Lv.
            </span>
            <span>
              {{ store.state.User.level }}
            </span>
          </div>
        </div>
      </div>
      <v-btn
          variant="text"
          @click="logout"
          size="small"
      >
        注销登录
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import request from "../utils/apiUtil.js";
import {Msg} from "../store/Msg";
import router from "../router";

export default {
  name: "NavigationDrawer",
  setup() {
    let drawer = ref(false);
    const store = useStore();
    const showDrawer = () => {
      drawer.value = !drawer.value;
    };
    const logout = () => {
      request.get("/landr/logout").then(res => {
        if (res === 1) {
          Msg({
            showClose: true,
            message: "注销成功",
            color: "success"
          });
          store.commit("setLogin",false)
          setTimeout(()=>{
            router.push('/')
            showDrawer();
          },500)

          return false;
        }
      }).catch(() => {

      });
    };
    return {
      store,
      drawer,
      showDrawer,
      logout,
    };
  }
};
</script>

<style scoped lang="scss">
.red-dot:before {
  top: 1rem;
  right: 1rem;
}

.userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0.5rem;
  width: 100%;
  justify-content: space-around;
  height: 8rem;
  padding: 0.4rem
}

.basicInfo {
  width: 100%;
  display: flex;
  border-radius: 1rem;
  border: #2196F3 0.1rem solid;
}

.avatar {
  width: 50%;
  height: 5rem;
  display: flex;
  padding: 0.5rem;
  img{
    width: 4rem;
    height: 4rem;
  }
  .avatarImg {
    padding: 0.3rem;
    border-radius: 50%;
    z-index: 20;
    position: absolute;
  }

  .avatarRound {
    border-radius: 50%;
    z-index: 1;
    position: relative;
  }
}

.uandr {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .username {
    text-align: center;
    padding-left: 0.5rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .level{
    text-align: center;
  }
}

</style>