<template>
  <div class="root">
    <Header></Header>
    <div class="row">
      <div class="column">
        <v-card tag="div" class="card" v-for="(img,index) in imgUrl" @click="ab">
          <img :src="img.url"/>
          <div class="title">{{img.title}}</div>
        </v-card>
      </div>
      <div class="column">
        <v-card class="card" v-for="(img,index) in imgUrl.slice(1,imgUrl.length)" @click="ab">
          <img :src="img.url">
          <div class="title">{{img.title}}</div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import {ref} from "vue";


export default {
  name: "Gallery",
  components: {Header},
  setup() {
    const imgUrl = ref([
      {url: "https://i.loli.net/2021/10/15/UaueVTkfrHwCjiM.jpg", title: "title"},
      {url: "https://s2.loli.net/2022/01/21/iPB2rjVqoewm9yn.jpg", title: "123"},
      {
        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.veeqi.com%2Fd%2Ffile%2Fgl%2F20200116%2Fbd7345c50e8c16e1cb2493a10dd1a502.png&refer=http%3A%2F%2Fwww.veeqi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656222706&t=06b5537a38fd9673de094f31d36b5df4",
        title: "中文"
      },
      {
        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.9game.cn%2F2020%2F6%2F5%2F162117173.jpg&refer=http%3A%2F%2Fimage.9game.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656222734&t=21f82d6370ca27a6a29bb6b9b5419ba1",
        title: "汉语"
      },
      {
        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload.hxnews.com%2F2021%2F0706%2F1625556949411.jpg&refer=http%3A%2F%2Fupload.hxnews.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656222754&t=2ebbbde37a676b9808907759960adc57",
        title: "中文"
      },
    ]);

    function ab() {
      alert("123");
    }

    return {
      ab,
      imgUrl,
    };
  }
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
  background-color: #BBDEFB;
}

.column {
  flex: 50%;
  max-width: 50%;
  padding: 0 0.2rem;
  > .v-card {
    margin-top: 0.5rem;
  }

  img {
    max-width: 100%;
    padding: 0.3rem;
    display: block;
  }
}

.title {
  overflow: hidden;
  font-size: 0.8rem;
  height: 1.4rem;
  text-indent: 0.7rem;
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