<template>
  <v-app>
    <MessageBar></MessageBar>
    <NavigationDrawer ref="drawerRef"></NavigationDrawer>
    <v-main class="main">
      <router-view v-slot="{ Component }">
        <transition
            appear
            name="rootAnimate"
        >
          <component :is="Component"/>
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
//失败的使用animate的    name="rootAnimate"
// class="animate__animated"
// enter-active-class="animate__slideInDown animate__fadeIn"
// leave-active-class="animate__slideOutDown animate__fadeOut"
// style="position:absolute;"
import "animate.css";
import MessageBar from "./components/MessageBar/MessageBar";
import {provide, ref} from "vue";
import NavigationDrawer from "./components/NavigationDrawer";

export default {
  name: "App",
  components: {MessageBar, NavigationDrawer},
  setup() {

    let drawerRef = ref();
    const showDrawer = () => {
      // drawer.value=!drawer.value
      drawerRef.value.showDrawer();
    };
    // let MsgOption = reactive({
    //   show: false,
    //   color: "blue",
    //   text: "爱莉希雅",
    //   showClose: true,
    //   timeout: 3000,
    // });
    // const showMsg = (option) => {
    //   MsgOption.show = option.show || false;
    //   MsgOption.text = option.message || "爱莉希雅";
    //   MsgOption.showClose = option.showClose || false;
    //   MsgOption.color = option.color || "blue-lighten-5";
    //   MsgOption.timeout = option.timeout || 3000;
    // };

    provide("showDrawer", showDrawer);
    // provide("showMsg", showMsg);
    return {
      drawerRef,
    };
  }
};
</script>
<style lang="scss">
.rootAnimate-enter-active,
.rootAnimate-leave-active {
  position: absolute;
  transition: all 0.3s ease;
  pointer-events: none;
}

.rootAnimate-enter-from,
.rootAnimate-leave-to {
  opacity: 0;
}

.rootAnimate-enter-active {
  position: absolute;
  animation: slideIn 1s;
}

.rootAnimate-leave-active {
  position: absolute;
  animation: slideOut 1s;
}

@keyframes slideIn {
  from {
    top: 100vh;
  }
  to {
    top: 0;
  }
}

@keyframes slideOut {
  from {
    top: 0;
  }
  to {
    top: -100vh;
  }
}

.root {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

:root {
  font-size: 20px;
}
</style>