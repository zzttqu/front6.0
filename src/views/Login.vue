<template>
  <div class="root">
    <div class="navBar">
      <button @click="$router.go(-1)">
        <i class="iconfont">&#xe61e;</i>
      </button>
      <button @click="$router.push('/')">
        <i class="iconfont">&#xe64f;</i>
      </button>
    </div>
    <v-form
        ref="form"
        class="form"
        v-model="user.valid"
        lazy-validation
    >
      <v-btn-toggle
          v-model="user.method"
          class="loginMethod"
      >
        <v-btn
            class="text-grey-darken-4"
            size="small"
            color="grey-lighten-2"
            width="5rem"
        >
          邮箱登录
        </v-btn>
        <v-btn
            class="text-grey-darken-4"
            size="small"
            color="grey-lighten-2"
            width="5rem"
        >
          用户名登录
        </v-btn>
      </v-btn-toggle>
      <v-text-field
          v-model="user.userInfo"
          :rules="[v=>!!v||'用户名还没填哦']"
          :label="user.method===0?'用户名':'邮箱地址'"
          required
      >
      </v-text-field>
      <v-text-field
          v-model="user.password"
          type="password"
          :rules="[v=>!!v||'需要填密码']"
          label="密码"
          required
      >
      </v-text-field>
      <v-btn
          block
          variant="plain"
          size="small"
          color="black"
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
          @click="login(form)"
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
import {reactive, ref} from "vue";
import router from "../router";
import request from "../utils/apiUtil";

export default {
  name: "Login",
  components: {},
  methods: {},
  setup() {
    const form = ref();
    let user = reactive({
      userInfo: "",
      password: "",
      valid: true,
      method: 0
    });

    return {
      form,
      user,
      login(form) {
        form.validate().then(res => {
          if (res.valid) {
            if (user.method === 0) {
              request.post("/landr", {
                email: user.userInfo,
              }).then(res => {
                if (res.uid !== null) {

                }
              });
            }
            console.log("验证通过");
            router.push("/");
          }
          else {
            console.log("失败");
            user.password = "";
            user.userInfo = "";
          }
        });
      }
    };
  }
}
;
</script>


<style lang="scss" scoped>
.form {
  .loginMethod {
    margin: 0.5rem auto;
    display: flex;
    justify-content: center;
    height: 1.5rem;
  }

  margin: 5rem auto;
  width: 15rem;
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

    .iconfont {
      color: #555;
      font-size: 2rem;
    }
  }
}

.noClick {
  pointer-events: none;
}

</style>