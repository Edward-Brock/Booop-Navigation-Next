<script setup>
import NavAside from "../components/NavAside.vue";
import NavHeader from "../components/NavHeader.vue";
import NavMain from "../components/NavMain.vue";
import "element-plus/theme-chalk/display.css";

// 左侧侧边栏 Aside 宽度
const navAsideWidth = 225;

// 顶栏 Header 高度
const navHeaderHeight = 60;
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header :height="navHeaderHeight + 'px'">
        <NavHeader />
      </el-header>
      <el-container class="home_container">
        <el-aside :width="navAsideWidth + 'px'" class="aside hidden-xs-only">
          <NavAside />
        </el-aside>
        <el-main>
          <NavMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  background: rgba(255, 255, 255, 1);
}

.aside {
  overflow: visible;
}

.el-main {
  overflow: visible !important;
}
</style>