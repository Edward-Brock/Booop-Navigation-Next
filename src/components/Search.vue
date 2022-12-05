<script setup>
import { nextTick, ref } from "vue";
import { Search, ArrowDown } from "@element-plus/icons-vue";

const input = ref();

const focus = ref();

const search_func = ref("百度");

function changeSearch(name) {
  // console.log(name);
  search_func.value = name;
}

function changeFocus() {
  nextTick(() => {
    focus.value.focus();
  });
}

function moveFocus() {
  changeFocus();
}
</script>

<template>
  <div class="container" @mousemove="moveFocus">
    <div class="search_group">
      <el-input ref="focus" class="search_input" v-model="input" :suffix-icon="Search">
        <template #prepend>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ search_func }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="changeSearch('百度')">百度</el-dropdown-item>
                <el-dropdown-item @click="changeSearch('Google')">Google</el-dropdown-item>
                <el-dropdown-item @click="changeSearch('Bing')">Bing</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-input>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: sticky;
  top: 10px;
  z-index: 9;
}

.search_group {
  display: flex;
  align-items: center;
  justify-content: right;
}

.search_input {
  width: 45%;
  height: 40px;
}

:deep(.el-input__wrapper) {
  border: none;
  border-radius: 100px;
  padding: 0 40px 0 100px;
}

:deep(.el-input-group__prepend) {
  background: none;
  box-shadow: none;
  border-radius: 100px;
  position: absolute;
  z-index: 99;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>