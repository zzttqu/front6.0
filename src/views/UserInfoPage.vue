<template>
  <div class="root">
    <div>
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
      <div>
        我是签到列表
      </div>
      <div>
        我是任务列表
      </div>
      <div>
        我是注销按钮
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfoPage"
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
.changeOption{
  margin: 1rem 0;
  height: 2rem;
}
</style>