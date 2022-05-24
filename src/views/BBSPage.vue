<template>
  <div class="root">
    <Header></Header>
    <v-list class="cardList">
      <v-card
          style="margin: 0.5rem 0"
          v-for="n in 8"
          rounded="xl"
          color="light-blue-lighten-4"
      >
        <v-card-title>
          <img src="https://s2.loli.net/2022/04/06/9qguvWyIhixYjbF.png" style="width: 3rem;" alt="用户头像">
          123
        </v-card-title>
        <v-card-text>
          123
        </v-card-text>
        <v-card-actions>
          <v-btn>123</v-btn>
        </v-card-actions>
      </v-card>
    </v-list>
    <BackToTop></BackToTop>
    <MyDialog :options="submitOption"></MyDialog>
    <v-btn
        icon="mdi-plus"
        class="submit bg-orange text-grey-lighten-4"
        @click="text"
    >
    </v-btn>
  </div>
</template>

<script>
import Header from "../components/Header";
import BackToTop from "../components/BackToTop";
import {reactive} from "vue";
import MyDialog from "../components/MyDialog";
import {useStore} from "vuex";
import {Msg} from "../store/Msg";
import request from "../utils/apiUtil";

export default {
  name: "BBSPage",
  components: {Header, BackToTop, MyDialog},
  setup() {
    const store = useStore();
    let submitOption = reactive({
      title: "",
      show: false,
      type: 0
    });
    const img = () => {
      if (store.state.isLogin) {
        submitOption.show = true;
        submitOption.type = 1;
        submitOption.title = "你的美图";
      }
      else {
        Msg({
          message: "未登录不能发表哦",
          color: "warning"
        });
      }
    };
    const text = () => {
      submitOption.show = true;
      submitOption.type = 0;
      submitOption.title = "你的留言";
    };
    let dialog = reactive({
      page: 1
    });

    function getDialog() {
      request.get("dialog", {
        params: {
          number: dialog.page
        }
      }).then(res=>{

      })
      ;
    }

    return {
      submitOption,
      img,
      text,
    };
  }
};
</script>

<style scoped lang="scss">
.cardList {
  padding: 0.5rem 1rem 0;
}

.submit {
  position: fixed;
  z-index: 500;
  bottom: 1rem;
  right: 1rem;
}
</style>