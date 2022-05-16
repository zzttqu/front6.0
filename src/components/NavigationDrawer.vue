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
          to="/bbs"
      >
        留言板
      </v-list-item>
      <v-list-item
          to="/login"
      >
        讨论区
      </v-list-item>
      <v-list-item
          to="/register"
      >
        图片区
      </v-list-item>
    </v-list>
    <!--    基本信息-->
    <div class="userInfo" @click="$router.push('/user')">
      <div class="basicInfo">
        <div class="avatar">
          <img
              class="avatarImg"
              src="https://s2.loli.net/2022/04/06/9qguvWyIhixYjbF.png"
              alt="头像"
          />
          <img src="https://s2.loli.net/2022/04/06/9qguvWyIhixYjbF.png" alt="头像"
               class="avatarRound"
          />
        </div>
        <div class="uandlv text-blue-lighten-1">
          <div class="username">
            用户名
          </div>
          <div class="level">
            <span>
              Lv.
            </span>
            <span>
              6
            </span>
          </div>
        </div>
      </div>
      <v-btn
          variant="text"
          @click=""
          size="small"
      >
        注销登录
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {ref} from "vue";

export default {
  name: "NavigationDrawer",
  setup() {
    let drawer = ref(false);
    const showDrawer = () => {
      drawer.value = !drawer.value;
    };
    return {
      drawer,
      showDrawer,
    };
  }
};
</script>

<style scoped lang="scss">
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
  flex: 2;
  height: 5rem;
  display: flex;
  padding-left: 0.5rem;

  .avatarImg {
    margin: 0.8rem 0;
    padding: 0.5rem;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    z-index: 20;
    position: absolute;
  }

  .avatarRound {
    margin: 0.8rem 0;
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    z-index: 1;
    position: relative;
  }
}
.uandlv {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .level {

  }

  .username {

  }
}

</style>