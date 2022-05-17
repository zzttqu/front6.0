<template>
  <transition
      appear
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
  >
    <v-btn
        class="btn bg-blue text-grey-lighten-4"
        @click="goTop()"
        v-show="scY > 200"
        icon="mdi-navigation"
    >

    </v-btn>
  </transition>

</template>

<script>
import {onMounted, ref} from "vue";

export default {
  setup() {
    let scTimer = ref(0);
    let scY = ref(0);
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    const handleScroll = () => {
      if (scTimer.value > 0) return;
      scTimer.value = setTimeout(() => {
        scY.value = window.scrollY;
        clearTimeout(scTimer.value);
        scTimer.value = 0;
      }, 100);
    };

    function goTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    return {
      handleScroll,
      goTop,
      scY
    };
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.btn {
  position: fixed;
  z-index: 500;
  bottom: 4rem;
  right: 1rem;
  font-size: 0.8rem;
}
</style>