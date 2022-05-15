<template>
  <div class="root">
    <Header></Header>
    <v-list style="padding: 0.5rem 1rem 0">
      <v-card
          style="margin: 0.5rem 0"
          v-for="n in 8"
          rounded="xl"
          color="light-blue-lighten-4"
      >
        <v-card-title>
          <img src="https://s2.loli.net/2022/04/06/9qguvWyIhixYjbF.png" style="width: 3rem;" alt="用户头像">
          123
        </v-card-title>
        <v-card-text>
          123
        </v-card-text>
        <v-card-actions>
          <v-btn>123</v-btn>
        </v-card-actions>
      </v-card>
    </v-list>
    <BackToTop></BackToTop>
  </div>
</template>

<script>
import Header from "../components/Header";
import BackToTop from "../components/BackToTop";

export default {
  name: "BBSPage",
  components: {Header, BackToTop}
};
</script>

<style scoped lang="scss">

</style>