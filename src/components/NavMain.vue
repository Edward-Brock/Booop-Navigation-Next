<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import emitter from "../untils/bus";

onMounted(() => {
  axios({
    method: "GET",
    url: import.meta.env.VITE_APP_BASE_API + "/getNavigationInfoR18"
  }).then((response) => {
      // console.log(response.data.result);
      website_info.navigationInfoArray = arrayGroupBy(response.data.result, "classify_id");
      website_info.classifyArray = unique(response.data.result, "classify_id");
      // 将数据通过 emitter 传递出去
      emitter.emit("partitionInfo", website_info.classifyArray);
    }
  );
});

const website_info = reactive({
  // 所有导航的详细信息数据
  navigationInfoArray: "",
  // 导航分类
  classifyArray: ""
});

/**
 * 根据数组对象的某个字段去重
 * item.name  是[{name:1}] 根据每条数据的name值来去重
 * */
function unique(arr, val) {
  const res = new Map();
  return arr.filter(item => !res.has(item[val]) && res.set(item[val], 1));
}

/**
 * 将获取到的数据通过 classify_id 进行集合
 * 返回排序后的数组
 */
const groupBy = (array, f) => {
  let groups = {};
  array.forEach(function(o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
};

/**
 * 将获取到的数据通过 classify_id 进行集合
 * 返回排序后的数组
 */
const arrayGroupBy = (list, groupId) => {
  let sorted = groupBy(list, function(item) {
    return [item[groupId]];
  });
  return sorted;
};

/**
 * 点击跳转网站
 */
function refreshto(cardInfo) {
  // console.log(cardInfo);
  window.open(cardInfo.website_url, "_blank");

  // 统计跳转网站访问次数
  axios({
    method: "POST",
    url: import.meta.env.VITE_APP_BASE_API + "/visitCount",
    data: {
      id: cardInfo.id,
      website_visit_num: cardInfo.website_visit_num + 1
    }
  }).then((response) => {
      // console.log(response);
    }
  );

}
</script>

<template>
  <div content="container">
    <div v-for="(classifyList,index) in website_info.navigationInfoArray" key="classifyList[0].classify_id">
      <!--导航分类标题-->
      <div class="classify_title" :id="'tag' + index">{{ classifyList[0].classify_title }}</div>
      <!--导航卡片组-->
      <div class="card_group">
        <div class="card_info" v-for="cardInfo in classifyList" :key="cardInfo.id" @click="refreshto(cardInfo)">
          <div class="card_info_title">{{ cardInfo.website_title }}</div>
          <div class="card_info_subtitle">{{ cardInfo.website_subtitle }}</div>
        </div>
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<style scoped lang="scss">
.classify_title {
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  line-height: 60px;
  color: rgba(0, 0, 0, 1);
  padding-left: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
}

.card_group {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(168px, 1fr));
  align-items: start;
  padding: 10px 0;
}

.card_info {
  width: 168px;
  min-height: 90px;
  margin: 10px 1%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, .015);
    border: 2px solid rgb(0, 0, 0, .015);
    border-radius: 10px;
    padding: 8px;

    .card_info_title {
      color: rgba(0, 0, 0, 1);
      text-decoration: underline wavy rgba(0, 0, 0, .75);
      border-bottom: 2px;
    }
  }
}

.el-col-6 {
  max-width: none;
}

.card_info_title {
  width: 150px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, .5);
  margin-bottom: 6px;
  text-decoration: underline rgba(0, 0, 0, .075);
  text-underline-offset: 4px;
}

.card_info_subtitle {
  font-size: 12px;
  color: rgba(0, 0, 0, .5);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card_info_visit {
  font-size: 12px;
  color: rgba(0, 0, 0, .25);
}
</style>