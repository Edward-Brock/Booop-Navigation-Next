<script setup>
import logo_pic_light from "../assets/logo_396_118_black.png";
import logo_pic_dark from "../assets/logo_396_118_white.png";
import { useDark, useToggle } from "@vueuse/core";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch } from "vue";
import emitter from "../untils/bus";
import LocationWeather from "./LocationWeather.vue";
import router from "../router";

// 暗黑模式
const isDark = useDark();
const toggleDark = useToggle(isDark);
let logoChangeImages = reactive([logo_pic_light, logo_pic_dark]);
let logoImageSrc = ref(logoChangeImages[0]);

// 监听 isDark 状态
watch(isDark, (newValue) => {
  // console.log("watch当前侦听到暗黑模式为：", newValue);
  if (newValue) {
    logoImageSrc.value = logoChangeImages[1];
  } else {
    logoImageSrc.value = logoChangeImages[0];
  }
});

onMounted(() => {
  emitter.on("logo_status", (response) => {
    // console.log("当前暗黑模式：", response);
    isDark.value = response;
  });

  if (localStorage.getItem("vueuse-color-scheme") === "dark") {
    logoImageSrc.value = logoChangeImages[1];
  } else {
    logoImageSrc.value = logoChangeImages[0];
  }
});

function jumpHome() {
  router.push("/");
}
</script>

<template>
  <div class="container">
    <div class="logo" @click="jumpHome">
      <img :src="logoImageSrc" alt="booop navigation logo" />
    </div>
    <div class="tool_group">
      <div class="tool_weather">
        <LocationWeather class="hidden-xs-only" />
      </div>
      <div class="tool_setting">
        <div class="text_btn">
          <router-link to="/login">后台</router-link>
        </div>
        <div class="text_btn hidden-xs-only">
          <el-switch
            v-model="isDark"
            class="mt-2"
            style="margin-left: 10px"
            inline-prompt
            :active-icon="Sunny"
            :inactive-icon="Moon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.logo {
  width: 165px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }

  img {
    width: 140px;
  }
}

.tool_group {
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tool_weather {
  margin-left: 20px;
}

.tool_setting {
  display: flex;
  align-items: center;
}

.text_btn {
  margin: 0 10px;
  color: rgba(0, 0, 0, .5);

  a:link, a:visited {
    color: rgba(0, 0, 0, .5);
    text-decoration: none;
  }

  a:hover {
    color: rgba(0, 0, 0, 1);
  }
}

.active {
  color: rgba(0, 0, 0, 1);
  font-weight: bold;
}
</style>