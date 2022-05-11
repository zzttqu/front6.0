<template>
  <div class="root">
    <div class="navBar">
      <button @click="$router.go(-1)" style="background: none;border: none">
        <i class="iconfont" style="font-size: 2rem">&#xe61e;</i>
      </button>
      <button @click="$router.push('/')" style="background: none;border: none">
        <i class="iconfont" style="font-size: 2rem">&#xe64f;</i>
      </button>
    </div>
    <v-form ref="form" label-position="center" label-width="auto" class="form">
      <v-text-field
          v-model="user.userInfo"
          :rules="[v=>!!v||'用户名还没填哦']"
          label="用户名或邮箱"
          required
      >
      </v-text-field>
      <v-text-field
          v-model="user.password"
          type="password"
          :rules="[v=>!!v||'需要填密码']"
          label="密码"
      >
      </v-text-field>
    </v-form>

    <v-btn-group>
      <v-btn

          color="blue-darken-2"
          class="text-grey-lighten-4"
      >
        <!--        @click="login(form)"-->
        登录
      </v-btn>
      <v-btn
          @click="$router.push('/')">
        忘记密码
      </v-btn>
      <v-btn

          color="green-lighten-1"
          class="text-grey-lighten-4">
        注册
        <!--        @click="toRegister(form)"-->
      </v-btn>
    </v-btn-group>
  </div>

</template>

<script>
import {reactive} from "vue";

export default {
  name: "Login",
  components: {},
  setup() {
    let user = reactive({
      userInfo: "",
      password: ""
    });
    return {
      user
    };
  }
}
;
</script>


<style lang="scss" scoped>

.navBar {
  display: flex;
  justify-content: space-around;
  padding-top: 0.5rem;
}

.noClick {
  pointer-events: none;
}

</style>