<template>
  <v-snackbar
      v-model="option.show"
      :timeout="option.timeout"
      top="true"
      :color="option.color"
      rounded="pill"
      style="z-index: 5000"
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
  setup() {
    const store = useStore();
    store.subscribe((mutation, state) => {
      if (mutation.type === "Message/showMsg") {
        option.text = state.Message.text;
        option.color = state.Message.color;
        option.timeout = state.Message.timeout;
        option.showClose = state.Message.showClose;
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