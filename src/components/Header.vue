<template>
  <v-btn-group class="header" variant="plain">
    <v-btn @click="showDrawer">
      <i :class="'iconfont icon-menu '+iconColor"></i>
    </v-btn>
    <v-btn @click="$router.push('/user')">
      <i :class="'iconfont icon-user '+iconColor"></i>
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
  props: {
    iconColor: "",
    path: "",
  },
  setup(props) {
    const showDrawer = inject("showDrawer");
    const iconColor = props.iconColor;
    return {
      iconColor,
      showDrawer
    };
  }
};
</script>

<style scoped lang="scss">
.header {
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
      color: #2196F3;
    }
  }
}
</style>