<template>
  <v-dialog
      v-model="dialog"
  >

  </v-dialog>
  <v-btn @click="dialog=!dialog">
    123
  </v-btn>
</template>

<script>
import {ref} from "vue";

export default {
  name: "MyDialog",
  setup() {
    let dialog = ref(true);
    return {
      dialog
    };
  }
};
</script>

<style scoped>

</style>