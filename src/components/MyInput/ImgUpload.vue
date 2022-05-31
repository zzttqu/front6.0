<template>
  <div class="imageUpload">
    <transition-group
        appear
        tag="ul"
        class="previewList"
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
    >
      <li class="previewImg" v-for="(item, index) in uploadImg" :key="index">
        <span class="cancel-btn" @click="delImg(index)"><i class="iconfont">&#xe631;</i></span>
        <img :src="item.fileUrl" alt="">
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
          color="blue"
          rounded>
      </v-progress-linear>
    </transition>
    <!--        <button @click="ImgSubmit">点击上传</button>-->
  </div>
</template>
<script>


import {ref} from "vue";
import {Msg} from "../../store/Msg";
import {cos} from "../../utils/uploadUtil";


export default {
  name: "ImgUpload",
  setup() {
    let inputFiles = ref(null);
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
          else if ((file.size / 1024 / 1024) > 5) {
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
          //这行是准备上传的数组
          uploadImg.value.push({file: file, fileUrl: URL.createObjectURL(file)});
          // reader.readAsDataURL(file);
        }
      }
    }

    //图片上传到我的cos
    async function ImgSubmit() {
      if (uploadImg.value.length > 0) {
        let postsA = [];
        let postsB = [];
        let imgUrls = [];
        for (const uploadImgInfo of uploadImg.value) {
          let id = genID();
          await cutImg(uploadImgInfo.fileUrl, 0.8).then(res => {
            postsB.push(postImg(res, id + ".jpg", "thumb"));
            let rawSuffix = uploadImgInfo.file.name.split(".");
            let name = `${id}.${rawSuffix[rawSuffix.length - 1]}`;
            postsA.push(postImg(uploadImgInfo.file, name, "raw"));
          });
        }
        return await Promise.all(postsA).then(async res => {
          let p = res;
          return await Promise.all(postsB).then(res => {
            res.reduce((pre, value, index) => {
              if (index === undefined) {
                return false;
              }
              imgUrls.push({raw: "https://" + p[index].Location, thumb: "https://" + value.Location});
            }, 0);
            return imgUrls;
          });
        });
      }
      else {
        return 0;
      }
    }

    async function cutImg(img, quality) {
      let image = new Image();
      image.src = img;
      return await new Promise(resolve => {
        image.onload = () => {
          let landw = image.height / image.width;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let width = 400;
          let height = 400 * landw;
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);
          let a = canvas.toDataURL("image/jpeg", quality);
          resolve(dataURLtoFile(a, `${genID()}.jpg`));
        };
      });
    }

    function dataURLtoFile(url, filename) {
      let arr = url.split(","), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), i = bstr.length, u8arr = new Uint8Array(i);
      while (i--) {
        u8arr[i] = bstr.charCodeAt(i);
      }
      return new File([u8arr], filename, {type: mime});
    }

    function genID(length) {
      return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(16);
    }

    async function postImg(img, name, type) {
      return await cos.putObject({
        Bucket: "imagehost-1306578662",
        Region: "ap-beijing",
        Key: `postImages/${type}/${name}`,
        Body: img,
        onProgress: (progressEvent => {
          percent.value = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          if (percent.value > 100) {
            percent.value = 100;
          }
        })
      });
    }

    //图片删除
    function delImg(index) {
      uploadImg.value.splice(index, 1);
    }

    return {
      reset,
      inputFiles,
      getImg,
      delImg,
      percent,
      uploadImg,
      clear,
      ImgSubmit,
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
  //justify-post: flex-start;
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