<template>
  <div class="imageUpload">
    <transition-group
        appear
        tag="ul"
        class="previewList"
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
    >
      <li class="previewImg" v-for="(item, index) in fileUrl" :key="index">
        <span class="cancel-btn" @click="delImg(index)"><i class="iconfont">&#xe631;</i></span>
        <img :src="item" alt="">
      </li>
      <div class="addBox" v-if="uploadImg.length<3">
        <i class="iconfont">&#xe674;</i>
        <input
            ref="inputFiles"
            type="file"
            accept="image/jpeg,image/gif,image/png"
            @change="getImg($event)"
            @click="reset"
            multiple>
      </div>
    </transition-group>
    <transition
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        class="progress"
    >
      <v-progress-linear
          v-if="uploadImg.length>0"
          v-model="percent"
          striped
          height="10px"
          rounded>

      </v-progress-linear>
    </transition>
    <!--        <button @click="ImgSubmit">点击上传</button>-->
  </div>
</template>
<script>


import {ref} from "vue";
import {Msg} from "../store/Msg";
import request from "../utils/apiUtil";


export default {
  name: "ImgUpload",
  setup() {
    let inputFiles = ref(null);
    let fileUrl = ref([]);
    let percent = ref(0);
    let uploadImg = ref([]);

    //图片格式，大小，数量的校验
    function imgValid(files) {
      //一次性上传大于三张
      if (files.length > 3) {
        Msg({
          showClose: true,
          message: "传的太多了呀— _ —||",
          color: "error",
        });
        return false;
      }
      else {
        let types = ".jpg,.jpeg,.png,.gif";  //文件格式
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let fileName = file.name;
          let fileExt = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
          let result = types.indexOf(fileExt);
          if (result < 0) {       //验证图片格式
            Msg({
              showClose: true,
              message: "图片格式不对呀",
              color: "error",
            });
            return false;
          }
          else if ((file.size / 1024 / 1024) > 2) {
            Msg({
              showClose: true,
              message: "文件太大了，装不下啦",
              color: "warning",
            });
            return false;
          }
        }
      }
      return true;
    }

    //这个是解决input无法上传同一张照片的情况
    function reset() {
      //这个是清空input中的已有值
      inputFiles.value.value = "";
    }

    function clear() {
      uploadImg.value = [];
      inputFiles.value = null;
      percent.value = 0;
      fileUrl.value = [];
    }

    function getImg($event) {
      let files = $event.target.files;
      // let length = $event.target.files.length;
      // let fileName = file.name;
      if (imgValid(files)) {
        for (const file of files) {
          //如果要用的话就得循环创建新的FileReader
          //用bold速度快还好，反正传的是file，又不是bold
          // let reader = new FileReader();
          // reader.onload = (e) => {
          //   fileUrl.value.push(e.target.result);
          // };
          //这行是负责显示在用户界面的
          //图片保存到本地转为blob对象加快解析速度
          //转blob，因为blob是同步的，reader循环会报错
          fileUrl.value.push(URL.createObjectURL(file));
          //这行是准备上传的数组
          uploadImg.value.push(file);
          // reader.readAsDataURL(file);
        }
      }
    }

    //图片上传到服务器
    async function ImgSubmit() {
      const formData = new FormData();
      if (uploadImg.value.length > 0) {
        for (const img of uploadImg.value) {
          formData.append("file", img);
        }
        return await request.post("dialog/img", formData, {
          onUploadProgress: (progressEvent => {
            percent.value = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            if (percent.value > 100) {
              percent.value = 100;
            }
          })
        }).then(res => {
          clear();
          return res;
        });
      }
      else {
        return 0;
      }
    }

    //图片删除
    function delImg(index) {
      fileUrl.value.splice(index, 1);
      uploadImg.value.splice(index, 1);
    }

    return {
      reset,
      inputFiles,
      fileUrl,
      getImg,
      delImg,
      percent,
      uploadImg,
      clear
    };
  },

};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.imageUpload {
  width: 100%;
  //height: 300px;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

//这个地方必须要有定位，因为absolute的定位必须是基于之前已经定位的父组件
.addBox {
  position: relative;
  background-color: #b3b3b3;
  height: 5rem;
  width: 5rem;
  text-align: center;
  line-height: 5rem;
  border-radius: 1rem;
  box-shadow: #b3b3b3 0.5vw 0.5vw 0.5vw;

  .iconfont {
    color: #ddd;
    font-size: 2rem;
  }

  input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
}

.previewList {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0.5rem;
  //justify-content: flex-start;
}

.cancel-btn {
  position: absolute;
  left: 5px;
  top: 5px;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background-color: #cc2222;
  border-radius: 50%;

  .iconfont {
    color: #ddd;
    font-size: 1rem;
  }
}

.cancel-btn i {
  font-size: 1rem;
}

.previewImg {
  position: relative;
  width: 100%;
  margin: 0.5rem 0;
  border-radius: 1rem;

  box-shadow: #b3b3b3 0.1rem 0.1rem 0.1rem;

  img {
    border-radius: 1rem;
    width: 100%;
    vertical-align: middle;
    object-fit: contain;
  }
}

.progress {
  align-self: center;
  margin: 0.5rem 0;
  width: 100%;
}
</style>