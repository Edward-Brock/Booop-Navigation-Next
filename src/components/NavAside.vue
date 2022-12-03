<script setup>
import { onMounted, ref } from "vue";
import emitter from "../untils/bus";

let listArray = ref();

// 加载导航分类数据
onMounted(() => {
  emitter.on("partitionInfo", (response) => {
    // console.log(response);
    listArray.value = response;
  });
});

function navTitleIndex(selector) {
  document.querySelector(selector).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
</script>

<template>
  <div class="container">
    <el-scrollbar height="calc(100vh - 80px)">
      <div v-for="(list,index) in listArray" :key="list.id">
        <div class="aside_nav_title" @click="navTitleIndex('#tag' + index)">{{ list.classify_title }}</div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  position: sticky;
  top: 0;
}

.aside_nav_title {
  margin: 20px 0;
  padding: 15px 0;
  box-sizing: border-box;
  font-size: 18px;
  color: rgba(0, 0, 0, .5);
  text-align: center;
  letter-spacing: 1px;

  &:hover {
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    cursor: pointer;
  }
}
</style>