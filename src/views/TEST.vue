<template>
  <div>
    <v-btn @click="img">
      图片
    </v-btn>
    <div >
      <v-btn @click="text" :class="unread?'red-dot':''">
        文字
        <!--      <i class="icon"></i>-->
      </v-btn>
    </div>
  </div>
</template>

<script>
import MyDialog from "../components/MyDialog";
import {reactive, ref} from "vue";

export default {
  name: "TEST",
  components: {MyDialog},
  setup() {
    let submitOption = reactive({
      title: "",
      show: false,
      type: 0
    });
    let unread = ref(true);
    const img = () => {
      submitOption.show = true;
      submitOption.type = 1;
      submitOption.title = "你的美图";
    };
    const text = () => {
      unread.value = !unread.value;
      submitOption.show = true;
      submitOption.type = 0;
      submitOption.title = "你的留言";
    };
    return {
      submitOption: submitOption,
      img,
      text,
      unread
    };
  }
};
</script>

<style scoped lang="scss">

</style>