<template>
  <v-snackbar
      v-model="option.show"
      :timeout="option.timeout"
      top="true"
      :color="option.color"
      rounded="pill"
  >
    <div style="text-align: center">
      {{ option.text }}
    </div>
    <template v-slot:actions v-if="option.showClose">
      <v-btn
          @click="option.show = false"
          size="small"
      >
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {reactive} from "vue";
import {useStore} from "vuex";

export default {
  name: "MessageBar",
  created() {

  },
  setup() {
    const store = useStore();
    store.subscribe((mutation, state) => {
      if (mutation.type === "msg/showMsg") {
        option.text = state.msg.text;
        option.color = state.msg.color;
        option.timeout = state.msg.timeout;
        option.showClose = state.msg.showClose;
        option.show = true;
      }
    });
    let option = reactive({
      show: false,
      color: "",
      text: "",
      showClose: true,
      timeout: 0,
    });
    return {
      option
    };
  },
  // data() {
  //   return {
  //     show: false,
  //     color: "",
  //     text: "",
  //     timeout: 0,
  //   };
  // },
  // created() {
  //   this.$
  // },
};
</script>

<style scoped>

</style>