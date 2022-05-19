<template>
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
          @click="">
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
      <div style="height: 12rem; width: 12rem;  margin: 5% auto;">
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
          @click="">
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
</template>

<script>
import {reactive, ref} from "vue";
import "vue-cropper/dist/index.css";
import {VueCropper} from "vue-cropper";
import {Msg} from "../../store/Msg";

export default {
  name: "ChangeUserInfo",
  components: {VueCropper},
  setup() {
    const Cropper = ref();
    let option = reactive({
      img: "https://s2.loli.net/2022/05/19/HSvN9qzWC7Luc4y.png", // 裁剪图片的地址
      info: true, // 裁剪框的大小信息
      outputSize: 0.8, // 裁剪生成图片的质量
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
      username: "",
      avatar: "",
      changeAvatar: false
    });

    let avatarMsg = ref(["换个头像", "上传图片"]);

    function uploadImg(e, num) {
      //上传图片
      // this.option.img
      let file = e.target.files[0];
      if (!/\.(jpg|jpeg|png|bmp|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是,jpeg,jpg,png,bmp中的一种哦");
        return false;
      }
      if (file.size > 2048 * 1024) {
        alert("头像不能大于2MB哦");
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

    const getImg = () => {
      Cropper.value.getCropData(data => {
        return data;
      });
    };
    const changeInfo = () => {
      if (change.username.length > 10) {
        Msg({
          message: "字数太多了哦",
          color: "warning"
        });
        return false;
      }

    };
    return {
      change,
      option,
      Cropper,
      uploadImg,
      avatarMsg,
      changeInfo,
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