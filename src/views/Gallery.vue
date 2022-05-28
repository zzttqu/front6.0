<template>
  <div class="root">
    <Header></Header>
    <div class="row">
      <div class="column">
        <v-card tag="div" v-for="(img,index) in imgUrlA" @click="ab" class="animate__animated animate__fadeIn">
          <v-progress-circular
              v-if="img.loading===true"
              indeterminate=""
              color="grey"
              class="loading"
          >
          </v-progress-circular>
          <img :src="img.url" @load="imgLoad();img.loading=false" alt="展示图片缩略图"/>
          <div class="title">{{ img.title }}</div>
        </v-card>
        <div ref="positionA">
        </div>
        <v-card class="load-more animate__animated animate__fadeIn" v-if="heightDiff<=0" :height="-heightDiff-10"
                @click="ab">
          <div>
            <v-icon style="font-size: 3rem">mdi-dots-horizontal</v-icon>
          </div>
        </v-card>
      </div>
      <div class="column">
        <v-card v-for="(img,index) in imgUrlB" @click="ab">
          <v-progress-circular
              v-if="img.loading===true"
              indeterminate=""
              color="grey"
              class="loading"
          >
          </v-progress-circular>
          <img :src="img.url" @load="imgLoad();img.loading=false" alt="展示图片缩略图"/>
          <div class="title">{{ img.title }}</div>
        </v-card>
        <div ref="positionB">
        </div>
        <v-card class="load-more animate__animated animate__fadeIn" v-if="heightDiff>0" :height="heightDiff-10"
                @click="ab">
          <div>
            <v-icon style="font-size: 3rem">mdi-dots-horizontal</v-icon>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import {onMounted, ref} from "vue";
import axios from "axios";


export default {
  name: "Gallery",
  components: {Header},
  setup() {
    let positionA = ref();
    let positionB = ref();
    let heightDiff = ref();
    let loading = ref(0);
    onMounted(() => {
      //从后端获取图片的地址
      axios.get("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyaya-img.diqiu00.com%2Fuploads%2Fimage%2F20211127%2F1637975574594597.jpg&refer=http%3A%2F%2Fyaya-img.diqiu00.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656295896&t=7383fa9b852c6ed4fd6ec60fa179dc07").then(() => {
        let a = [
          {url: "https://s2.loli.net/2022/01/21/iPB2rjVqoewm9yn.jpg", title: "123"},
          {url: "https://i.loli.net/2021/10/15/UaueVTkfrHwCjiM.jpg", title: "title"},
        ];
        a.reduce((total, value) => {
          value.loading = true;
        }, 0);
        spliceImg(a);
        //创建图片的缓存并缓存，这个是得在别的页面提前加载这个页面的才有用
        // const images = a.map(imgSrc => {
        //   return new Promise((resolve, reject) => {
        //     const img = new Image();
        //     img.src = imgSrc.url;
        //     img.onload = resolve;
        //     img.onerror = reject;
        //   });
        // });
        // 缓存结束后再分列展示
        // Promise.all(images).then(res => {
        //
        // });
      });
    });

    let imgUrlA = ref([]);
    let imgUrlB = ref([]);

    function spliceImg(imgList) {
      imgList.filter((value, index) => {
        if (index % 2 === 0) {
          imgUrlA.value.push(value);
        }
        else {
          imgUrlB.value.push(value);
        }
      });
    }

    function ab() {
      alert("123");
    }

    return {
      ab,
      imgUrlA,
      imgUrlB,
      positionA,
      positionB,
      heightDiff,
      loading,
      imgLoad() {
        loading.value += 1;
        if (loading.value === imgUrlA.value.length + imgUrlB.value.length) {
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
  padding: 0 0.2rem;

  > .v-card {
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    min-height: 5rem;
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
</style>