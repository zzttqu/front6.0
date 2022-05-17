<template>
  <div>
    <v-btn @click="img">
      图片
    </v-btn>
    <v-btn @click="text">
      文字
    </v-btn>
    <MyDialog :options="option">
    </MyDialog>
  </div>
</template>

<script>
import MyDialog from "../components/MyDialog";
import {reactive} from "vue";

export default {
  name: "TEST",
  components: {MyDialog},
  setup() {
    let option = reactive({
      title: "",
      show: false,
      type: 0
    });
    const img = () => {
      option.show = true;
      option.type = 1;
      option.title = "你的美图";
    };
    const text = () => {
      option.show = true;
      option.type = 0;
      option.title = "你的留言";
    };
    return {
      option,
      img,
      text,
    };
  }
};
</script>

<style scoped>

</style>