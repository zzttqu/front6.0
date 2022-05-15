<template>
  <transition
      appear
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
  >
    <div class="btn bg-blue text-grey-lighten-4" @click="goTop()" v-show="scY > 300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg">
        <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
      </svg>
    </div>
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
  bottom: 1rem;
  right: 1rem;
  background-color: #333;
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  border-radius: 50%;

}
</style>