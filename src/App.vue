<template>
  <v-app>
    <MessageBar></MessageBar>
    <v-main class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <transition
              appear
              name="rootAnimate"
          >
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
.rootAnimate-enter-active,
.rootAnimate-leave-active {
  position: absolute;
  transition: all 0.5s ease;
  pointer-events: none;
}

.rootAnimate-enter-from,
.rootAnimate-leave-to {
  opacity: 0;
}

/*@keyframes slideIn {*/
/*  from {*/
/*    top: 100vh;*/
/*  }*/
/*  to {*/
/*    top: 0;*/
/*  }*/
/*}*/

/*@keyframes slideOut {*/
/*  from {*/
/*    top: 0;*/
/*  }*/
/*  to {*/
/*    top: -100vh;*/
/*  }*/
/*}*/
.root {
  width: 100%;
  height: 100%;
}

:root {
  font-size: 20px;
}
</style>