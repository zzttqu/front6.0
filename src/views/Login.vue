<template>
  <div class="root">
    <Header></Header>
    <v-form
        ref="form"
        class="form"
        lazy-validation
    >
      <v-btn-toggle
          v-model="user.method"
          class="registerMethod"
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
          :rules="[(user.method === 1 ? (v => !!v || '用户名还没填哦') : (v => /^\w+(\w|[.]\w+)+@\w+([.]\w+){1,3}/ig.test(v) ||'邮箱格式有误'))]"
          :label="user.method===0?'邮箱地址':'用户名'"
      >
      </v-text-field>
      <v-text-field
          v-model="user.password"
          type="password"
          label="密码"
          required
      >
      </v-text-field>

      <v-btn
          block
          variant="plain"
          size="small"
          color="black"
          disabled
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
          @click="$router.push('/register')"
      >
        注册
      </v-btn>
    </v-btn-group>
  </div>

</template>

<script>
import {onMounted, reactive, ref} from "vue";
import request from "../utils/apiUtil";
import {Msg} from "../store/Msg";
import {codeAndSend} from "../utils/encryptUtils";
import router from "../router";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import Header from "../components/Header";

export default {
  name: "Login",
  components: {Header},

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
    onMounted(() => {
      user.a = true;
    });
    let user = reactive({
      userInfo: "",
      password: "",
      method: 0,
    });
    const infoRules = [(user.method === 1 ? (v => !!v || "用户名还没填哦") : (v => /^\w+(\w|[.]\w+)+@\w+([.]\w+){1,3}/ig.test(v) || "邮箱格式有误"))];
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
                store.commit("User/login", {
                  uid: res.uid,
                  username: res.username,
                  likes: res.likes
                });
                store.commit("setLogin", true);
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
      infoRules,
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
  .registerMethod {
    margin: 0.5rem auto;
    display: flex;
    justify-content: center;
    height: 1.5rem;
  }

  margin: 3rem auto;
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