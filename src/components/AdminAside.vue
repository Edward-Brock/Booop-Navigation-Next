<script setup>

</script>

<template>
  <div class="container">
    <div class="manger_group_title">网址管理</div>
    <div class="functionManage">
      <router-link class="default_group_list" active-class="manger_group_list" to="adminWebsite">网址总览</router-link>
    </div>
    <div class="functionManage">
      <router-link class="default_group_list" active-class="manger_group_list" to="adminAddWebsite">添加网址
      </router-link>
    </div>
    <div class="manger_group_title">分类管理</div>
    <div class="functionManage">
      <router-link class="default_group_list" active-class="manger_group_list" to="adminClassify">分类管理</router-link>
    </div>
    <div class="functionManage">
      <router-link class="default_group_list" active-class="manger_group_list" to="AdminAddClassify">添加网址
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  text-align: center;
  padding: 20px;
}

.default_group_list {
  color: rgba(0, 0, 0, .5);
  text-decoration: none;
}

.manger_group_title {
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1.5px;

  &:before, &:after {
    content: "-";
  }
}

.manger_group_list {
  font-weight: bold;
  color: rgba(0, 0, 0, .75);
}

.functionManage {
  margin: 20px 0;
}
</style>