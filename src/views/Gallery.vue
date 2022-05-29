<template>
  <div class="root">
    <Header></Header>
    <div class="row">
      <div class="column">
        <img src="https://i.ibb.co/5r4699G/1634294271735-2.jpg"/>
        <img src="https://i.ibb.co/Ht4V22B/1634294271735-2.jpg"/>
        <v-card tag="div" v-for="(post,index) in postL" @click="moreInfo(post.id)" class="animate__animated animate__fadeIn">
          <v-progress-circular
              v-if="post.loading===true"
              indeterminate=""
              color="grey"
              class="loading"
          >
          </v-progress-circular>
          <img :src="post.img.path" @load="imgLoad();post.loading=false" alt="展示图片缩略图"/>
          <div class="title">{{ post.title }}</div>
        </v-card>
        <div ref="positionA">
        </div>
        <v-card class="load-more animate__animated animate__fadeIn" v-if="heightDiff<=0" :height="(-heightDiff)-10"
                @click="loadMore">
          <div>
            <v-icon style="font-size: 3rem">mdi-dots-horizontal</v-icon>
          </div>
        </v-card>
      </div>
      <div class="column">
        <v-card tag="div" v-for="(post,index) in postR" @click="moreInfo(post.id)" class="animate__animated animate__fadeIn">
          <v-progress-circular
              v-if="post.loading===true"
              indeterminate=""
              color="grey"
              class="loading"
          >
          </v-progress-circular>
          <img :src="post.img.path" @load="imgLoad();post.loading=false" alt="展示图片缩略图"/>
          <div class="title">{{ post.title }}</div>
        </v-card>
        <div ref="positionB">
        </div>
        <v-card class="load-more animate__animated animate__fadeIn" v-if="heightDiff>0" :height="heightDiff-10"
                @click="loadMore">
          <div>
            <v-icon style="font-size: 3rem">mdi-dots-horizontal</v-icon>
          </div>
        </v-card>
      </div>
    </div>
    <BackToTop></BackToTop>
    <MyDialog :options="submitOption"></MyDialog>
    <v-btn
        icon="mdi-plus"
        class="submit bg-orange text-grey-lighten-4 animate__animated animate__fadeIn"
        @click="img"
    >
    </v-btn>
  </div>
</template>

<script>
import Header from "../components/Header";
import {onMounted, reactive, ref} from "vue";
import request from "../utils/apiUtil";
import BackToTop from "../components/BackToTop";
import MyDialog from "../components/MyDialog";
import {Msg} from "../store/Msg";
import {useStore} from "vuex";


export default {
  name: "Gallery",
  components: {Header, BackToTop, MyDialog},
  setup() {
    const store=useStore()
    let positionA = ref();
    let positionB = ref();
    let heightDiff = ref();
    let loading = ref(0);
    let submitOption = reactive({
      title: "",
      show: false,
      type: 0
    });
    onMounted(() => {
      //从后端获取图片的地址
      request.get("/post",{
        params:{
          number:0
        }
      }).then((res) => {
        res.reduce((total, value) => {
          value.loading = true;
        }, 0);
        spliceImg(res);
      });
    });

    let postL = ref([]);
    let postR = ref([]);

    function spliceImg(imgList) {
      imgList.filter((value, index) => {
        if (index % 2 === 0) {
          postL.value.push(value);
        }
        else {
          postR.value.push(value);
        }
      });
    }

    function moreInfo(id) {
      //获取点击的id传到后端获取更加详细的信息，包括上传的更多图片
      // console.log(id)
    }


    return {
      moreInfo,
      postL: postL,
      postR: postR,
      positionA,
      positionB,
      heightDiff,
      loading,
      submitOption,
      loadMore(){
        console.log("loadMore")
      },
      img(){
        // if (store.state.isLogin) {
          submitOption.show = true;
          submitOption.type = 1;
          submitOption.title = "你的美图";
        // }
        // else {
        //   Msg({
        //     message: "未登录不能发表哦",
        //     color: "warning"
        //   });
        // }
      },
      imgLoad() {
        loading.value += 1;
        if (loading.value === postL.value.length + postR.value.length) {
          // console.log("图片全部加载完毕");
          heightDiff.value = positionA.value.getBoundingClientRect().y - positionB.value.getBoundingClientRect().y;
          // console.log(heightDiff.value);
        }
      }
    };
  }
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
  background-color: #BBDEFB;
  height: 100%;
}

.column {
  flex: 50%;
  max-width: 50%;
  padding: 0.5rem 0.2rem;

  > .v-card {
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    min-height: 4rem;
  }

  .loading {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  img {
    max-width: 100%;
    padding: 0.3rem;
    display: block;
  }
}

.load-more {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.title {
  overflow: hidden;
  height: 2rem;
  text-indent: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}

.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.2rem;
}
.submit {
  position: fixed;
  z-index: 500;
  bottom: 1rem;
  right: 1rem;
}
</style>