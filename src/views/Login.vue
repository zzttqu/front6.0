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
          :rules="[(user.method===1?(v=>!!v||'用户名还没填哦'):(v=>/^\w+(\w|[.]\w+)+@\w+([.]\w+){1,3}/ig.test(v)||'邮箱格式有误'))]"
          :label="user.method===0?'邮箱地址':'用户名'"
          @change=""
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
          @click="loginValid(form)"
      >
        登录
      </v-btn>
      <v-btn
          size="large"
          width="8rem"
          color="green"
          @click="$router.push('/')"
      >
        注册
        <!--        @click="toRegister(form)"-->
      </v-btn>
    </v-btn-group>
  </div>

</template>

<script>
import {reactive, ref} from "vue";
import request from "../utils/apiUtil";
import {Msg} from "../store/modules/msg";
import {codeAndSend} from "../utils/encryptUtils";
import router from "../router";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "Login",
  components: {},
  methods: {},
  setup() {
    const form = ref();
    const store = useStore();
    const route = useRoute();
    let nextUrl;
    if (route.query.url) {
      nextUrl = route.query.url;
      Msg({
        showClose: true,
        message: "请先登录哦！",
        color: "info"
      });
    }
    let user = reactive({
      userInfo: "",
      password: "",
      valid: true,
      method: 0
    });
    const login = uid => {
      codeAndSend(uid + user.password, "/landr/login")
          .then(res => {
            {
              if (res === 0) {
                Msg({
                  showClose: true,
                  message: "密码错误",
                });
              }
              else if (res === -1) {
                Msg({
                  showClose: true,
                  message: "账号已被封禁",
                });
              }
              else {
                store.dispatch("setUserStatus", {
                  uid: res.uid,
                  isLogin: true,
                  username: res.username,
                  likes: res.likes
                });
                Msg({
                  showClose: true,
                  message: `欢迎 ${res.username} ,正在跳转...`,
                  timeout: 1000,
                });

                setTimeout(() => {
                  router.push(nextUrl);
                  nextUrl = "/main";
                }, 1000);
              }
            }
          });

    };
    return {
      router,
      form,
      user,
      loginValid(form) {
        form.validate().then(res => {
          if (res.valid) {
            if (user.method === 0) {
              request.post("/landr", {
                email: user.userInfo,
              }).then(res => {
                if (res.uid !== null) {
                  login(res.uid);
                }
                else {
                  Msg({
                    color: "warning",
                    showClose: true,
                    message: "该邮箱尚未注册"
                  });
                }
              });
            }
            else if (user.method === 1) {
              request.post("/landr", {
                username: user.userInfo,
              }).then(res => {
                if (res.uid !== null) {
                  login(res.uid);
                }
                else {
                  Msg(useStore(), {
                    color: "warning",
                    showClose: true,
                    message: "该用户名尚未注册"
                  });
                }
              });
            }
            console.log("验证通过");
          }
          else {
            console.log("失败");
            user.password = "";
            user.userInfo = "";
          }
        });
      },

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