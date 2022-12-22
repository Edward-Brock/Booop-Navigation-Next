<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useLoginStore } from "../stores/login";
import router from "../router";
import { Lock } from "@element-plus/icons-vue";
import alertSound from "../assets/alert.wav";

const form = reactive({
  input: ""
});
const auth = useLoginStore();

const tipDisplay = ref(false);

function alertDisplay() {
  // 报警音路径
  const audio = new Audio(alertSound);
  // 执行播放警报方法
  audio.play();
}

function submitForm() {
  axios({
    method: "POST",
    url: import.meta.env.VITE_APP_BASE_API + "/getPassword",
    data: {
      password: form.input
    }
  }).then((response) => {
    // console.log(response.data);
    if (!response.data.verify_status) {
      ElMessage.error("Warning! Protection lock login failed");
      // 显示保护锁异常提示内容
      tipDisplay.value = true;
      // 调用警报显示方法
      alertDisplay();
    } else {
      auth.setAuthenticated(true);
      ElMessage({
        message: "保护锁登录成功",
        type: "success"
      });
      tipDisplay.value = false;
      router.push("/admin");
    }

    // 记录接口调用日志
    axios({
      method: "POST",
      url: import.meta.env.VITE_APP_BASE_API + "/addLog",
      data: {
        method: response.config.method,
        url: response.config.url,
        ip: response.data.ipInfo,
        create_time: new Date().getTime()
      }
    });
  });
}

onMounted(() => {
  nextTick(() => {
    document.getElementById("password_input").focus();
  });
});
</script>

<template>
  <div class="container">
    <div class="login_window">
      <div class="admin_title">管理后台</div>
      <el-form :model="form" @submit.prevent>
        <el-input id="password_input" class="password_input" v-model="form.input" size="large" minlength="4"
                  maxlength="16"
                  input-style="text-align: center; font-weight: bold; letter-spacing: 8px;"
                  show-password
                  :prefix-icon="Lock"
                  @keyup.enter.native="submitForm"
        />
      </el-form>
      <div v-if="tipDisplay" class="warning_tip">⚠ 检测到当前保护锁异常</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_window {
  width: 340px;
  height: 180px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, .015);
  border: 2px solid rgb(0, 0, 0, .025);
  border-radius: 20px;
  box-shadow: 0 12px 45px -8px rgba(0, 0, 0, .075);
}

.admin_title {
  font-size: 24px;
  font-weight: bolder;
  text-align: center;
  letter-spacing: 1px;
  margin: 10px auto 10px;
}

.password_input {
  width: 256px;
  margin-bottom: 10px;
}

.warning_tip {
  font-size: 12px;
  text-align: center;
  color: red;
  font-weight: bold;
}
</style>