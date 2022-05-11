<template>
  <div class="root">
    <div class="navBar">
      <button @click="$router.go(-1)">
        <i class="iconfont" >&#xe61e;</i>
      </button>
      <button @click="$router.push('/')">
        <i class="iconfont">&#xe64f;</i>
      </button>
    </div>
    <v-form ref="form" class="form" v-model="user.valid">
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
      <v-btn
          block
          variant="plain"
          size="small"
          color="black"
          style="margin:auto 0 auto auto;"
          @click="$router.push('/')">
        忘记密码
      </v-btn>
    </v-form>
    <v-btn-group
        rounded="xl"
        class="buttonGroup"
        variant="outlined"
        divided
    >
      <v-btn
          width="8rem"
          color="blue"
          size="large"
      >
        登录
      </v-btn>
      <v-btn
          size="large"
          width="8rem"
          color="green"
          >
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
      password: "",
      valid: true
    });
    return {
      user
    };
  }
}
;
</script>


<style lang="scss" scoped>
.form {
  margin: 8rem 2rem 0;
}

.buttonGroup {
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 2rem;
}

.navBar {
  display: flex;
  justify-content: space-around;
  padding-top: 0.5rem;

  button {
    background: none;
    border: none;
    .iconfont{
      color: #555;
      font-size: 2rem;
    }
  }
}

.noClick {
  pointer-events: none;
}

</style>