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
              :indeterminate="loading"
          >
          </v-progress-linear>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {onMounted, reactive, watch, toRef, ref} from "vue";

export default {
  name: "TaskTable",
  props: ["expData"],
  setup(props) {
    let loading=ref(true)
    let expData = toRef(props, "expData");
    const option = reactive({
      list: [
        {
          title: "发帖一次+10",
          cause: 1,
          exp: 10,
          limit: 20,
          finished: false
        },
        {
          title: "点赞一次+10",
          cause: 0,
          exp: 0,
          limit: 50,
          finished: false
        },
        {
          title: "还没想好是啥",
          cause: 0,
          exp: 233,
          limit: 999,
          finished: false
        },
        {
          title: "提提建议吧",
          cause: 0,
          exp: 114,
          limit: 514,
          finished: false
        },
      ]
    });
    watch([expData.value], () => {
      option.list.reduce((total, value, currentIndex) => {
        if (value.exp>=value.limit){
          return false;
        }
        value.exp = 10 * expData.value[currentIndex];
      }, 0);
      loading.value=false
    });
    onMounted(() => {
    });
    return {
      option,
      loading
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