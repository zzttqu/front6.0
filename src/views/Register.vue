<template>
  <div class="root">
    <Header></Header>
    <v-form
        ref="form"
        class="form"
        lazy-validation
    >
      <v-btn-toggle
          class="registerMethod"
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
          v-model="user.email"
          label="邮箱地址"
          hint="例如：1161085395@qq.com"
          :rules="[ (v => (/^\w+(\w|[.]\w+)+@\w+([.]\w+){1,3}/ig.test(v))||'邮箱地址格式不对' )]"
      >
      </v-text-field>
      <v-text-field
          clearable
          v-model="user.username"
          counter="10"
          maxlength="10"
          label="用户名"
      >
      </v-text-field>
      <v-text-field
          v-model="user.password"
          type="password"
          label="密码"
          :rules="[(!user.userInfoCheck?true:v=>!!v||'密码还没填')]"
          maxlength="30"
          clearable
      >
      </v-text-field>
      <v-text-field
          v-model="user.tmpPassword"
          type="password"
          label="重复密码"
          :rules="[v=>(v===user.password)||'两次输入的密码不同哦']"
          maxlength="30"
          clearable
      >
      </v-text-field>
      <v-text-field
          label="验证码"
          clearable
          counter="5"
          maxlength="5"
          :rules="[(!user.userInfoCheck?true:v=>!!v||'验证码还没填')]"
          v-model="user.validateCode"
      >
        <template v-slot:append>
          <v-btn
              size="small"
              variant="outlined"
              @click="registerValid(form)"
          >
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
          @click="register(form)"
          :disabled="!user.userInfoCheck"
      >
        注册
      </v-btn>
    </div>
  </div>

</template>

<script>
import {reactive, ref} from "vue";
import request from "../utils/apiUtil";
import {Msg} from "../store/Msg";
import {encrypt} from "../utils/encryptUtils";
import router from "../router";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import Header from "../components/Header";

export default {
  name: "Register",
  components: {Header},
  methods: {},
  setup() {
    const form = ref();
    const store = useStore();
    // const route = useRoute();
    // let nextUrl;
    // if (route.query.url) {
    //   nextUrl = route.query.url;
    //   Msg({
    //     showClose: true,
    //     message: "请先登录哦！",
    //     color: "info"
    //   });
    // }
    let user = reactive({
      email: "",
      username: "",
      password: "",
      tmpPassword: "",
      validateCode: "",
      userKey: "",
      notCode: true,
      userInfoCheck: false
    });

    const code = () => {
      user.notCode = false;//每十分钟只允许发送一次
      user.codeSend = true;
      //user.userInfoCheck = true;//用户名和邮箱验证通过，且发送了验证码
      Msg({
        color: "success",
        showClose: true,
        message: "验证码发送中，请稍等...",
        timeout: 1500
      });
      setTimeout(() => {
        user.notCode = true;
        user.userInfoCheck = false;
      }, 1000 * 60 * 5);
      //验证通过后向后端发送验证码，成功后弹窗
      request.get("/landr/code", {
        params: {
          email: user.email,
          method: 1
        },
        timeout: 30 * 1000
      }).then(res => {
        if (res === 1) {
          user.userInfoCheck = true;
          user.codeSend = false;
          Msg({
            color: "success",
            showClose: true,
            message: "验证码已发出，5分钟内有效",
          });
        }
        else if (res === 0) {
          user.notCode = true;
          user.codeSend = false;
          Msg({
            color: "info",
            showClose: true,
            message: "刚才的验证码还有效哦",
          });
        }
      });
      return true;
    };
    return {
      router,
      form,
      user,
      registerValid(form) {
        form.validate().then(res => {
          if (res.valid) {
            request.post("/landr", {
              email: user.email,
              username: user.username
            }).then(res => {
              if (res.uid === null) {
                code();
              }
              else if (res.email !== null) {
                Msg({
                  color: "info",
                  showClose: true,
                  message: "该邮箱已被注册"
                });
              }
              else if (res.username !== null) {
                Msg({
                  color: "info",
                  showClose: true,
                  message: "该用户名已被注册"
                });
              }
            });
          }
          else {
            user.password = "";
            user.userInfo = "";
          }
        });
      },
      register(form) {
        form.validate().then(res => {
          if (res.valid) {
            if (user.userInfoCheck) {
              request.post("/landr/code", {
                email: user.email,
                code: user.validateCode,
              }).then(res => {
                if (res === 1) {
                  return true;
                }
                else {
                  Msg(store, {
                    showClose: true,
                    message: "验证码输入错误",
                    color: "warning",
                  });
                  user.validateCode = "";
                  return false;
                }
              }).then(() => {
                user.userKey = encrypt(user.password);
                return request.post("/landr/register", {
                  username: user.username,
                  email: user.email,
                  userKey: user.userKey,
                });
              }).then(res => {
                if (res.uid !== null) {
                  Msg({
                    showClose: true,
                    message: "注册成功，正在跳转",
                    color: "success",
                  });
                  setTimeout(()=>{
                    router.push("/login")
                  },1500)
                }
              });
            }
            else {
              Msg({
                message: "验证码还没获取呢",
                color: "info"
              });
            }
          }
          else {
            Msg({
              message: "资料还没填完呢",
              color: "warning"
            });
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
  .registerMethod {
    margin: 0.5rem auto;
    display: flex;
    justify-content: center;
    height: 1.5rem;
    opacity: 0.3;
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