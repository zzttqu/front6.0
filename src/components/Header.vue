<template>
  <v-btn-group class="header" variant="plain">
    <v-btn @click="showDrawer">
      <i :class="'iconfont icon-menu '+iconColor"></i>
    </v-btn>

    <v-btn @click="$router.go(-1)">
      <i :class="'iconfont icon-chevronleft '+iconColor"></i>
    </v-btn>
  </v-btn-group>
</template>
<script>


import {inject} from "vue";

export default {
  name: "Header",
  props: ["iconColor"],
  setup(props) {
    const showDrawer = inject("showDrawer");
    // const showMsg = inject("showMsg");
    // showMsg,
    const iconColor = props.iconColor || "text-blue";
    return {
      iconColor,
      showDrawer,
    };
  }
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 2rem;
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-around;

  button {
    flex: 1;
    height: 100%;
    line-height: 2rem;
    border: none;
    background: none;

    .iconfont {
      font-size: 1.5rem;
    }
  }
}


</style>