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
        <ImgUpload ref="imgUpload" v-if="props.options.type===1">
        </ImgUpload>
        <v-text-field
            label="标题"
            v-model="post.title"
            counter="50"
            :rules="[v=>v.length<10||'字数太多啦']"
        >
        </v-text-field>
        <v-textarea
            :label="props.options.type===1?'图片描述':'内容'"
            v-model="post.text"
            counter="200"
            :rules="[v=>v.length<200||'字数太多啦']"
        >
        </v-textarea>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="options.show=!options.show">
          返回
        </v-btn>
        <v-btn
            color="blue"
            @click="validate"
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
import request from "../utils/apiUtil";
import {Msg} from "../store/Msg";
//todo 如果新组件调好了需要换text组件

export default {
  name: "MyDialog",
  components: {ImgUpload},
  props: ["options", "show"],
  emits: ["update:options"],
  setup(props) {
    const options = reactive(props.options);
    let dialog = ref(props.show);
    let post = reactive({
      title: "",
      text: "",
    });
    const imgUpload = ref(null);
    watch(props.options, () => {
      dialog.value = props.options.show;
    });
    const flush = () => {
      post.title = "";
      post.text = "";
      if (imgUpload.value !== null) {
        imgUpload.value.clear();
      }
    };

    async function upload() {
      if (props.options.type === 1) {
        post.img = await imgUpload.value.ImgSubmit().then(res => {
          console.log(res)
          return res;
        });
        request.post("/post/create", post).then(res => {
        });
      }

      // console.log(a)
      // request.post("/dialog/create", {
      //   text: post.value,
      // }).then(res => {
      //   // store.commit("User/setExpCount", {class: 1, count: res});
      //   post.value = "";
      //   options.show = false;
      // });
    }

    const validate = () => {
      if (post.title !== "") {
        upload();
      }
      else {
        Msg({
          message: "还没填东西哦",
          color: "warning"
        });
      }
    };

    function submitPost() {

    }

    return {
      props,
      dialog,
      post,
      options,
      flush,
      imgUpload,
      validate
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