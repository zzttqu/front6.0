<template>

  <div class="list">
    <div
        :class="'item animate__animated '+(index===animate.index?animate.list[animate.num]:'')"
        v-for="(day,index) in daysData.days">
      <button :class="'day '+((index===daysData.signInDays)&&(!store.state.User.isSignIn)?'red-dot':'')"
              :disabled="day.flag===1" @click="signIn(index)">
        <img class="front" src="/level/01.svg" alt="图片"/>
        <img class="back" src="/level/checkmark-circle.svg" :style="'opacity: '+(day.flag===1?1:0)+';'"
             alt="图片"/>
        第{{ day.day }}天
      </button>

    </div>
  </div>

</template>

<script>
import {onMounted, reactive, ref} from "vue";
import request from "../../utils/apiUtil";
import {Msg} from "../../store/Msg";
import {useStore} from "vuex";

export default {
  name: "SigninBar",
  setup(props, {emit}) {
    const store = useStore();

    let daysData = reactive({
      days: [
        {
          day: 1,
          flag: 0
        },
        {
          day: 2,
          flag: 0,
        },
        {
          day: 3,
          flag: 0,
        },
        {
          day: 4,
          flag: 0,
        },
        {
          day: 5,
          flag: 0,
        },
        {
          day: 6,
          flag: 0,
        }, {
          day: 7,
          flag: 0,
        },
      ],
      signInDays: 0,
      signInStatus: false,
    });
    let animate = reactive({
          list: ["", "animate__pulse"],
          num: 0,
          index: -1,
        }
    );
    onMounted(() => {
      request.get("/user/signinlist").then(res => {
        daysData.days = res.data;
        if (res.status === 0) {
          //如果今天已经签到了就去除红点
          store.commit("User/signIn", {isSignIn: true, exp: 0});
        }
        //获得当前已签到多少天，之后签到成功后+1天
        daysData.days.reduce((total, currentValue) => {
          if (currentValue.flag === 0 && total === 0) {
            daysData.signInDays = currentValue.day - 1;
            total += 1;
            return total;
          }
          else {
            return total;
          }
        }, 0);
      });
    });
    return {
      daysData,
      animate,
      store,
      signIn(index) {
        animate.index = index;
        animate.num = 1;
        setTimeout(() => {
          animate.num = 0;
        }, 1000);
        if (!daysData.signInStatus) {
          request.get("/user/signin").then(res => {
            if (res !== 0) {
              daysData.signInDays += 1;
              daysData.days[index].flag = 1;
              daysData.signInStatus = true;
              store.commit("User/signIn", {isSignIn: true, exp: res});
              Msg({
                showClose: true,
                message: "签到成功咯",
                color: "success"
              });
            }
            else {
              daysData.signInStatus = true;
              Msg({
                showClose: true,
                message: "今天已经签过到咯",
                color: "info",
              });
            }
          });
        }
        else {
          Msg({
            showClose: true,
            message: "今天已经签过到咯",
            color: "info",
          });
        }
      }
    };
  }
};
</script>

<style scoped lang="scss">


.list {
  display: flex;
  justify-content: center;
  height: 4rem;
  flex-wrap: nowrap;
  border-bottom: #2196F3 0.1rem solid;
  border-radius: 1rem;
  box-shadow: #E0E0E0 0.1rem 0.1rem 0.5rem;
  padding: 0.2rem;

  .item {
    padding: 0;
    margin: 0;
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    opacity: 1;
    border-radius: 1rem;
    position: relative;
    color: #2196F3;
    font-weight: bold;
    font-size: 0.5rem;

    img {
      width: 100%;
      height: 70%;
      opacity: 1; //0是完全隐藏前景图片，1是完全盖住背景图片
      object-fit: fill;
    }

    .front {
      position: absolute;
      opacity: 1;
    }

    .back {
      padding: 0.3rem;
      position: relative;
    }

    &:disabled {
      opacity: 0.6;
    }
  }
}
</style>