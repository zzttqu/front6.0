<template>
  <v-snackbar
      v-model="submitOption.show"
      :timeout="submitOption.timeout"
      top="true"
      :color="submitOption.color"
      rounded="pill"
      style="z-index: 5000"
  >
    <div style="text-align: center">
      {{ submitOption.text }}
    </div>
    <template v-slot:actions v-if="submitOption.showClose">
      <v-btn
          @click="submitOption.show = false"
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
        submitOption.text = state.Message.text;
        submitOption.color = state.Message.color;
        submitOption.timeout = state.Message.timeout;
        submitOption.showClose = state.Message.showClose;
        submitOption.show = true;
      }
    });
    let submitOption = reactive({
      show: false,
      color: "",
      text: "",
      showClose: true,
      timeout: 0,
    });
    return {
      submitOption
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