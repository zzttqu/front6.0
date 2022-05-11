<template>
  <div class="root">
    <div class="navBar">
      <button @click="$router.go(-1)" style="background: none;border: none">
        <i class="iconfont" style="font-size: 2rem">&#xe61e;</i>
      </button>
      <button @click="$router.push('/')" style="background: none;border: none">
        <i class="iconfont" style="font-size: 2rem">&#xe64f;</i>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  components: {},
  setup() {


    return {

    };
  }
}
;
</script>


<style lang="scss" scoped>

.navBar{
  display: flex;
  justify-content: space-around;
  padding-top: 0.5rem;
}
.noClick {
  pointer-events: none;
}

</style>