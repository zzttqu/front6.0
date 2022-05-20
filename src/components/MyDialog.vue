<template>
  <v-dialog
      v-model="options.show"
      scrollable
  >
    <v-card>
      <v-card-title>
        {{ props.options.title }}
      </v-card-title>
      <v-card-subtitle>
        <v-spacer></v-spacer>
        <v-btn
            size="small"
            variant="text"
            color="warning"
            @click="flush">
          清空
        </v-btn>
      </v-card-subtitle>
      <div class="dialog-main">
        <v-textarea
            v-if="props.options.type===0"
            v-model="content"
            counter="200"
            :rules="[v=>v.length<200||'字数太多啦']"
        >
        </v-textarea>
        <div v-if="props.options.type===1">
          <ImgUpload ref="imgUpload">
          </ImgUpload>
          <v-text-field
              label="图片描述"
              v-model="content"
              counter="50"
              :rules="[v=>v.length<50||'字数太多啦']"
          >
          </v-text-field>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="options.show=!options.show">
          返回
        </v-btn>
        <v-btn
            color="blue"
        >
          提交
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {reactive, ref, watch} from "vue";
import ImgUpload from "./MyInput/ImgUpload";
//todo 如果新组件调好了需要换text组件

export default {
  name: "MyDialog",
  components: {ImgUpload},
  props: ["options", "show"],
  emits:['update:options'],
  setup(props) {
    const options = reactive(props.options);
    let dialog = ref(props.show);
    let content = ref("");
    const imgUpload = ref(null);
    watch(props.options, () => {
      dialog.value = props.options.show;
    });
    const flush = () => {
      content.value = "";
      if (imgUpload.value !== null) {
        imgUpload.value.clear();
      }
    };
    const validate=()=>{
      if (content){

      }
    }
    return {
      props,
      dialog,
      content,
      options,
      flush,
      imgUpload
    };
  }
};
</script>

<style scoped lang="scss">
.dialog-main {
  width: 80vw;
  padding: 0 0.5rem;
}
</style>