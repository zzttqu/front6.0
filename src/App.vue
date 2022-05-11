<template>
  <v-app>
    <MessageBar></MessageBar>
    <v-main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <transition
              appear
          >
            <!--          name="rootAnimate"-->
            <component :is="Component"/>
          </transition>
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
//失败的使用animate的
// class="animate__animated"
// enter-active-class="animate__slideInDown animate__fadeIn"
// leave-active-class="animate__slideOutDown animate__fadeOut"
// style="position:absolute;"
import "animate.css";
import MessageBar from "./components/MessageBar/MessageBar";
export default {
  name: "App",
  components: {MessageBar},
};
</script>
<style>
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

:root {
  font-size: 20px;
}
</style>