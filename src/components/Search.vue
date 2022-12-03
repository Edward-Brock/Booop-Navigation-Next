<script setup>
import { nextTick, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const input = ref();

const focus = ref();

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
      <el-input ref="focus" class="search_input" v-model="input" :suffix-icon="Search" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.search_group {
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search_input {
  width: 70%;
  height: 60px;
}

.el-input__wrapper {
  border-radius: 100px;
}
</style>