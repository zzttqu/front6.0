<template>
  <div class="root">
    <div class="title">
      <i class="iconfont icon-bubble"></i>
      油豆腐树洞
    </div>
    <v-btn
        @click="$router.push('/login')"
        class="font-weight-black text-center to-main"
        elevation="0"
        variant="outlined"
        size="large"
    >
      点击进入
    </v-btn>
    <div class="footer">
      v0.6
    </div>
  </div>
</template>

<script>
import "animate.css";

export default {
  setup() {
    // for (let i = 0; i < 20; i++) {
    //   request.get("/landr/check").then(res => {
    //     console.log(res);
    //   });
    // }

    return {};
  }
};
</script>
<style lang="scss" scoped>


.to-main {
  color: #333333;
}
.title{
  font-size: 1.5rem;
  i{
    font-size: 1.5rem;
  }
}
.root {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 10%;
}

.footer {
  position: absolute;
  bottom: 10px;
  right: 50px;
  color: #222;
}
</style>