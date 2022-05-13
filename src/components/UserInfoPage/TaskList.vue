<template>

  <div class="list">
    <div class="item" v-for="item in option.list">
      <div class="name">
        {{ item.title }}
      </div>
      <div>
        <div class="exp">{{ item.exp }}/{{ item.limit }}</div>
        <div class="progress">
          <v-progress-linear
              :model-value="item.exp/item.limit*100"
              rounded
              color="light-blue"
              striped
              height="10px"
          >
          </v-progress-linear>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import request from "../../utils/apiUtil";

export default {
  name: "TaskTable",
  props: [],
  setup(props) {
    const option = reactive({
      list: [
        {
          title: "发帖一次+10",
          count: 0,
          cause: 1,
          exp: 10,
          limit: 20,
          finished: false
        },
        {
          title: "点赞一次+10",
          cause: 0,
          count: 0,
          exp: 0,
          limit: 50,
          finished: false
        },
        {
          title: "还没想好是啥",
          cause: 0,
          count: 0,
          exp: 233,
          limit: 999,
          finished: false
        },
        {
          title: "提提建议吧",
          cause: 0,
          count: 0,
          exp: 114,
          limit: 514,
          finished: false
        },
      ]
    });
    // onMounted(() => {
    //   request.get("/user/explist").then(res => {
    //     const list=res
    //     if (list.length>0){
    //       option.list.reduce((total, value,index) => {
    //         value.count=list[index].count
    //       }, 0);
    //     }
    //   }).then(() => {
    //     option.list.reduce((total, value) => {
    //       value.exp = 10 * value.count;
    //     },0);
    //   });
    // });
    return {
      option,
    };
  }
};
</script>

<style scoped lang="scss">
.list {
  margin: 0.5rem 0;
  border: #2196F3 0.1rem solid;
  border-radius: 1rem;
  box-shadow: #E0E0E0 0.1rem 0.1rem 0.5rem;
  padding: 0.2rem 0.8rem 0.3rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  border-bottom: #b3b3b3 1px solid;

  .progress {
    margin: 0 0 0 auto;
    width: 80px;
  }

  .name {
    text-align: left;
    font-size: 0.9rem;
  }

  .exp {
    text-align: right;
    font-size: 0.8rem;
  }
}


</style>