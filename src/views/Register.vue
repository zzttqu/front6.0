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
        class="form"
        v-model="user.valid"
        lazy-validation
    >
      <v-btn-toggle
          v-model="user.method"
          class="loginMethod"
          disabled
      >
        <v-btn
            class="text-grey-darken-4"
            size="small"
            color="grey-lighten-2"
            width="5rem"
        >
          邮箱注册
        </v-btn>
        <v-btn
            class="text-grey-darken-4"
            size="small"
            color="grey-lighten-2"
            width="5rem"
        >
          手机注册
        </v-btn>
      </v-btn-toggle>
      <v-text-field
          clearable
          v-model="user.userInfo"
          :label="user.method===0?'邮箱地址':'手机号'"
          :rules="[ (v => (/^\w+(\w|[.]\w+)+@\w+([.]\w+){1,3}/ig.test(v))||'格式不对' )]"
      >
      </v-text-field>
      <v-text-field
          v-model="user.password"
          type="password"
          label="密码"
          clearable
      >
      </v-text-field>
      <v-text-field
          v-model="user.password"
          type="password"
          label="再输一次密码"
          clearable
      >
      </v-text-field>
      <v-text-field label="验证码" clearable single-line>
        <template v-slot:append>
          <v-btn size="small" variant="outlined">
            获取验证码
          </v-btn>
        </template>
      </v-text-field>
    </v-form>
    <div class="buttonGroup">
      <v-btn
          size="large"
          width="10rem"
          color="success"
          rounded="lg"
          @click="$router.push('/')"
      >
        注册
      </v-btn>
    </div>
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
  name: "Register",
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

  margin: 1rem auto 0;
  width: 15rem;
}

.buttonGroup {
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 1.5rem;
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

</style>