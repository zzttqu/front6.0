<template>
  <div class="root">
    <Header icon-color="text-blue"></Header>
    <div class="basicInfo">
      <div class="avatar">
        <button style="background: none;border: none" @click="">
          <img
              class="avatarImg"
              src="https://s2.loli.net/2022/04/06/9qguvWyIhixYjbF.png"
              alt="头像"
          />
          <img src="https://s2.loli.net/2022/04/06/9qguvWyIhixYjbF.png" alt="头像"
               class="avatarRound"
          />
        </button>
      </div>
      <div class="uandlv text-blue-lighten-1">
        <div class="username">
          {{ userInfo.username }}
        </div>
        <div class="level">
            <span>
              Lv.
            </span>
          <span>
              {{ userInfo.level }}
            </span>
        </div>
      </div>
      <div class="exp">
        <div style="font-size: 0.6rem">
          {{ userInfo.exp }}/{{ userInfo.levelExp[userInfo.level] }}
        </div>
        <v-progress-linear
            :model-value="50"
            rounded
            color="light-blue"
            style="height: 0.3rem;width: 70%;"
        >
        </v-progress-linear>
      </div>
    </div>
    <v-btn-group
        class="changeOption"
        divided
        rounded="2"
    >
      <v-btn
          width="50%"
          size="small"
          class="text-blue-lighten-1"
      >
        换个头像
      </v-btn>
      <v-btn
          width="50%"
          size="small"
          class="text-blue-lighten-1"
      >
        换个名字
      </v-btn>
    </v-btn-group>
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

export default {
  name: "UserInfoPage",
  components: {
    SigninBar,
    TaskList,
    Header,
  },
  setup() {
    //引入vuex
    const store = useStore();
    let userInfo = reactive({
      uid: store.state.user.uid,
      username: store.state.user.username,
      level: 0,
      exp: 0,
      levelExp: [0, 200, 1500, 4500, 10800, 28800],
      count: [1, 1, 1, 1]
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
    onMounted(() => {
      request.get("/user/explist").then(res => {
        if (res.length > 0) {
          res.reduce((total, value, index) => {
            userInfo.count[index] = value.count;
          }, 0);
        }
      });
      userInfo.level = findLev(userInfo.levelExp, userInfo.exp);
    });
    return {
      userInfo,
    };
  }
};
</script>

<style scoped lang="scss">
.root {
  padding: 0 1rem;
  height: 100%;
}

.basicInfo {
  display: flex;
  border: #2196F3 0.2rem solid;
  border-radius: 1rem;
  box-shadow: #E0E0E0 0.2rem 0.2rem 0.2rem;
}

.uandlv {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  .level {

  }

  .username {

  }
}

.exp {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar {
  flex: 3;
  height: 5rem;
  display: flex;
  padding-left: 0.5rem;

  .avatarImg {
    margin: 0.5rem;
    padding: 0.5rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    z-index: 20;
    position: absolute;
  }

  .avatarRound {
    margin: 0.5rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
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