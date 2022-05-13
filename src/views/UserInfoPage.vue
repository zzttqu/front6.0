<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        bottom
        temporary
    >
      <v-list
          :items="items"
      ></v-list>
    </v-navigation-drawer>
    <div class="root">

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
      <v-btn-group
          class="changeOption"
          divided
          rounded="2"
          style="width: 100%;"
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
      <TaskList>
      </TaskList>
      <v-btn
          color="warning"
          class="logout"
          rounded="xl"
          @click="drawer=!drawer"
      >
        我是注销按钮
      </v-btn>
    </div>
  </div>
</template>

<script>
import SigninBar from "../components/UserInfoPage/SigninBar";
import TaskList from "../components/UserInfoPage/TaskList";
import {ref} from "vue";

export default {
  name: "UserInfoPage",
  components: {
    SigninBar,
    TaskList,
  },
  setup() {
    let drawer = ref();
    let items = ref([
      {
        title: "Foo",
        value: "foo",
      },
      {
        title: "Bar",
        value: "bar",
      },
      {
        title: "Fizz",
        value: "fizz",
      },
      {
        title: "Buzz",
        value: "buzz",
      },
    ],);
    return {
      drawer,
      items
    };
  }
};
</script>

<style scoped lang="scss">
.root {
  padding: 0 1rem;
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
  align-items: center;

  .level {

  }

  .username {

  }
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
  margin: 0.5rem 0;
  height: 2rem;
}

.logout {
  position: absolute;
  left: 10%;
  bottom: 1rem;
  width: 80%;
}
</style>