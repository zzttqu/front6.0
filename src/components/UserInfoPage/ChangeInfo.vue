<template>
  <v-dialog
      v-model="props.activate"
      persistent
  >
    <v-card>
      <v-card-title>
        修改信息
      </v-card-title>
      <v-card-subtitle>
        <v-spacer></v-spacer>
        <v-btn
            size="small"
            variant="text"
            color="warning"
            @click="reset">
          清空
        </v-btn>
      </v-card-subtitle>
      <div class="dialog-main">
        <div class="avatarUpload">
          <v-btn @click="change.changeAvatar=!change.changeAvatar">{{ avatarMsg[change.changeAvatar ? 1 : 0] }}</v-btn>
          <input
              v-if="change.changeAvatar"
              type="file"
              class="uploads"
              accept="image/*"
              @change="uploadImg($event, 1)"
          />
        </div>
        <div v-if="change.changeAvatar" style="height: 12rem; width: 12rem;  margin: 5% auto;">
          <vueCropper
              style="background-repeat: unset"
              ref="Cropper"
              :img="option.img"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              :info="option.info"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedBox="option.fixedBox"
              :fixedNumber="option.fixedNumber"
              :center-box="true"
          ></vueCropper>
        </div>
        <div>
          <v-text-field
              label="用户名"
              v-model="change.username"
              counter="10"
              :rules="[v=>v.length<10||'字数太多啦']"
          >
          </v-text-field>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="close">
          返回
        </v-btn>
        <v-btn
            color="blue"
            @click="changeInfo"
        >
          提交
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {onBeforeUnmount, reactive, ref} from "vue";
import "vue-cropper/dist/index.css";
import {VueCropper} from "vue-cropper";
import {Msg} from "../../store/Msg";
import request from "../../utils/apiUtil";
import {useStore} from "vuex";

export default {
  name: "ChangeUserInfo",
  components: {VueCropper},
  props: ["activate"],
  emits: ["update:activate"],
  setup(props, {emit}) {
    const username = useStore().state.User.username;
    const store = useStore();
    const Cropper = ref();
    let option = reactive({
      img: "https://s2.loli.net/2022/05/19/HSvN9qzWC7Luc4y.png", // 裁剪图片的地址
      info: true, // 裁剪框的大小信息
      outputSize: 1, // 裁剪生成图片的质量
      outputType: "jpg", // 裁剪生成图片的格式
      autoCrop: true, // 是否默认生成截图框
      autoCropWidth: 100, // 默认生成截图框宽度
      autoCropHeight: 100, // 默认生成截图框高度
      fixedBox: false, // 固定截图框大小 不允许改变
      fixed: true, // 是否开启截图框宽高固定比例
      fixedNumber: [1, 1], // 截图框的宽高比例
      full: true, // 是否输出原图比例的截图
      canMoveBox: true, // 截图框能否拖动
      original: false, // 上传图片按照原始比例渲染
      centerBox: true, // 截图框是否被限制在图片里面
      infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
    });
    let change = reactive({
      username: username,
      avatar: "",
      changeAvatar: false
    });
    // let activate=ref(props.activate)
    let avatarMsg = ref(["换个头像", "上传图片"]);

    async function compressUpload(base64image, quality) {
      return new Promise(resolve => {
        let image = new Image();
        image.src = base64image;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 200;
          canvas.height = 200;
          ctx.drawImage(image, 0, 0, 200, 200);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
      });
    }

    function uploadImg(e, num) {
      //上传图片
      // this.option.img
      let file = e.target.files[0];
      if (!/\.(jpg|jpeg|png|bmp|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是,jpeg,jpg,png,bmp中的一种哦");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("头像不能大于5MB哦");
        return false;
      }
      Msg({
        showClose: true,
        message: "拖拽四角可以缩放哦",
        color: "success",
      });
      let reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        }
        else {
          data = e.target.result;
        }
        if (num === 1) {
          option.img = data;
        }
      };
      reader.readAsArrayBuffer(file);//不知道有什么用，但是不能删
    }

    async function getImg() {
      let data = await new Promise(resolve => {
        Cropper.value.getCropData(data => {
          resolve(data);
        });
      });
      return await compressUpload(data, 0.9);
    }

    const changeInfo = () => {
      if (change.username.length > 10) {
        Msg({
          message: "用户名太长了哦",
          color: "warning"
        });
        return false;
      }
      if (change.username === "" && !change.changeAvatar) {
        Msg({
          message: "没有信息变更哦",
          color: "warning"
        });
        return false;
      }
      if (change.changeAvatar) {
        getImg().then(res => {
          change.avatar = res;
          request.post("/user/updateinfo", {
            username: change.username,
            avatar: res,
          }).then(res => {
            if (res === 1) {
              Msg({
                message: "修改成功",
                color: "success",
              });
              store.commit("User/updateInfo", {
                username: change.username,
                avatar: change.avatar
              });
            }
          });
        });
      }
      else {
        request.post("/user/updateinfo", {
          username: change.username,
          avatar: "",
        });
      }
    };
    const reset = () => {
      change.changeAvatar = false;
      change.avatar = "";
      option.img = "https://s2.loli.net/2022/05/19/HSvN9qzWC7Luc4y.png";
      change.username = username;
    };

    //使用v-model进行父子组件传值
    const close = () => {
      emit("update:activate", false);
      setTimeout(() => {
        reset();
      }, 1000);
    };
    onBeforeUnmount(() => {
      setTimeout(() => {
        reset();
      }, 1000);
    });
    return {
      props,
      change,
      option,
      Cropper,
      uploadImg,
      avatarMsg,
      changeInfo,
      reset,
      close,

    };
  }
};
</script>

<style scoped lang="scss">
.dialog-main {
  width: 80vw;
  padding: 0 0.5rem;
  text-align: center;
}

.avatarUpload {
  width: 100%;
  position: relative;
}

.uploads {
  opacity: 0;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 10;
}
</style>