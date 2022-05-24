<template>
  <div class="root">
    <ChangeInfo
        v-model:activate="userInfo.changeInfo"
    >
    </ChangeInfo>
    <Header icon-color="text-blue"></Header>
    <div class="basicInfo">
      <div class="avatar">
        <button style="background: none;border: none" @click="">
          <img
              class="avatarImg"
              :src="store.state.User.avatar"
              alt="头像"
          />
          <img src="https://s2.loli.net/2022/04/06/9qguvWyIhixYjbF.png" alt="头像"
               class="avatarRound"
          />
        </button>
      </div>
      <div class="username text-blue-lighten-1">
        {{ userInfo.username }}
      </div>
      <div class="exp text-blue-lighten-1">
        <div class="level">
            <span>
              Lv.
            </span>
          <span>
              {{ store.state.User.level }}
            </span>
        </div>
        <div style="font-size: 0.6rem">
          {{ store.state.User.exp }} / {{ userInfo.levelExp[store.state.User.level] }}
        </div>
        <v-progress-linear
            :model-value="100*store.state.User.exp/userInfo.levelExp[store.state.User.level]"
            rounded
            color="light-blue"
            style="height: 0.3rem;width: 70%;"
        >
        </v-progress-linear>
      </div>
    </div>
    <v-btn
        block
        class="changeOption text-blue-lighten-1"
        variant="text"
        @click="userInfo.changeInfo=!userInfo.changeInfo"
    >
      修改资料
    </v-btn>
    <SigninBar>
    </SigninBar>
    <TaskList :exp-data="userInfo.count">
    </TaskList>
  </div>
</template>

<script>
import SigninBar from "../components/UserInfoPage/SigninBar";
import TaskList from "../components/UserInfoPage/TaskList";
import {onMounted, reactive} from "vue";
import Header from "../components/Header";
import {useStore} from "vuex";
import request from "../utils/apiUtil";
import ChangeInfo from "../components/UserInfoPage/ChangeInfo";

export default {
  name: "UserInfoPage",
  components: {
    SigninBar,
    TaskList,
    Header,
    ChangeInfo,
  },
  setup() {
    //引入vuex
    const store = useStore();
    let userInfo = reactive({
      uid: store.state.User.uid,
      username: store.state.User.username,
      levelExp: [0, 200, 1500, 4500, 10800, 28800],
      count: [1, 1, 1, 1],
      changeInfo: false,
    });
    const findLev = (array, val) => {
      if (val < Math.min.apply(null, array)) {
        return 0;
      }
      if (val > Math.max.apply(null, array)) {
        return array.length - 1;
      }
      let idx = 0, i = 0, j = array.length;
      for (i; i < j; i++) {
        if (array[i] > val) {
          idx = i;
          break;
        }
      }
      return idx;
    };
    const getExpList = () => {
      request.get("/user/exp").then(res => {
        userInfo.exp = res.exp;
        userInfo.level = findLev(userInfo.levelExp, userInfo.exp);
        if (res.count.length > 0) {
          res.count.reduce((total, value, index) => {
            userInfo.count[index] = value.count;
          }, 0);
        }
        store.commit("User/setExpInfo", {
          exp: userInfo.exp,
          level: userInfo.level,
          count: userInfo.count,
        });
      });
    };
    onMounted(() => {
      getExpList();
    });
    return {
      userInfo,
      store,
    };
  },
  created() {
  }
};
</script>

<style scoped lang="scss">
.root {
  padding: 0 1rem;
  height: 100%;
}

.basicInfo {
  margin-top: 1rem;
  display: flex;
  border: #2196F3 0.2rem solid;
  border-radius: 1rem;
  box-shadow: #E0E0E0 0.2rem 0.2rem 0.2rem;
}

.username {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.exp {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar {
  flex: 3;
  height: 5.5rem;
  display: flex;

  img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
  }

  .avatarImg {
    margin: 0.5rem;
    padding: 0.3rem;
    z-index: 20;
    position: absolute;
  }

  .avatarRound {
    margin: 0.5rem;
    z-index: 1;
    position: relative;
  }
}

.changeOption {
  width: 100%;
  margin: 0.5rem 0;
  height: 2rem;
}


</style>