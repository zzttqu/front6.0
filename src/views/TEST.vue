<template>
  <div>
    <ChangeInfo>

    </ChangeInfo>
  </div>
</template>

<script>
import ChangeInfo from "../components/UserInfoPage/ChangeInfo";
import {reactive, ref} from "vue";

export default {
  name: "TEST",
  components: {ChangeInfo},
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