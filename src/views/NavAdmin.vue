<script setup>
import { useLoginStore } from "../stores/login";
import NavHeader from "../components/NavHeader.vue";
import AdminAside from "../components/AdminAside.vue";

const auth = useLoginStore();
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
      <el-container>
        <el-aside :width="navAsideWidth + 'px'" class="aside hidden-xs-only">
          <AdminAside />
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
</style>