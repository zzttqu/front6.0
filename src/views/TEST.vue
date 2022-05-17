<template>
  <div>
    <v-btn @click="img">
      图片
    </v-btn>

    <v-btn @click="text">
      文字<i class="icon"></i>
    </v-btn>
  </div>
</template>

<script>
import MyDialog from "../components/MyDialog";
import {reactive} from "vue";

export default {
  name: "TEST",
  components: {MyDialog},
  setup() {
    let submitOption = reactive({
      title: "",
      show: false,
      type: 0
    });
    const img = () => {
      submitOption.show = true;
      submitOption.type = 1;
      submitOption.title = "你的美图";
    };
    const text = () => {
      submitOption.show = true;
      submitOption.type = 0;
      submitOption.title = "你的留言";
    };
    return {
      submitOption: submitOption,
      img,
      text,
    };
  }
};
</script>

<style scoped lang="scss">
.icon {
  background: #f00;
  width: 0.4em;
  height: 0.4em;
  top: 0.2rem;
  right: 0.2rem;
  border-radius: 50%;
  position: absolute;
}
</style>