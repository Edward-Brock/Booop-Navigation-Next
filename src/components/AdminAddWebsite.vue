<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router";

onMounted(() => {
  axios({
    method: "GET",
    url: import.meta.env.VITE_APP_BASE_API + "/getClassifyInfo"
  }).then((response) => {
      // console.log(response.data.result);
      form.classify_array = response.data.result;
    }
  );
});

const ruleFormRef = ref();

const form = reactive({
  classify_array: "",
  classify_id: "",
  website_title: "",
  website_subtitle: "",
  website_url: "",
  website_logo: "",
  website_switchChange: true,
  website_hidden: 0
});

const rules = reactive({
  classify_id: [
    { required: true, message: "Please input Classify id", trigger: "blur" }
  ],
  website_title: [
    { required: true, message: "Please input Website title", trigger: "blur" }
  ],
  website_url: [
    { required: true, message: "Please input Website url", trigger: "blur" }
  ]
});

function switchChange() {
  if (form.website_switchChange) {
    form.website_hidden = 0;
  } else {
    form.website_hidden = 1;
  }
  // console.log(form.website_hidden);
}

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log("submit!");
      axios({
        method: "POST",
        url: import.meta.env.VITE_APP_BASE_API + "/addDatabaseInfo",
        data: {
          database: "website",
          classify_id: form.classify_id,
          website_title: form.website_title,
          website_subtitle: form.website_subtitle,
          website_url: form.website_url,
          website_logo: form.website_logo,
          website_hidden: 0
        }
      }).then((response) => {
          // console.log(response.data);
          if (!response.data.status) {
            ElMessage({
              message: response.data.message,
              type: "success"
            });
            router.push({ path: "adminWebsite" });
          } else {
            ElMessage({
              message: response.data.message,
              type: "warning"
            });
          }
        }
      );
    } else {
      console.log("error submit!");
    }
  });
};
</script>

<template>
  <div class="container">
    <div class="title">添加网址</div>
    <div class="subfield">
      <el-form class="formGroup" :model="form" ref="ruleFormRef" :rules="rules" label-width="100px">
        <el-form-item label="分类" prop="classify_id">
          <el-select v-model="form.classify_id" placeholder="Select">
            <el-option
              v-for="item in form.classify_array"
              :key="item.id"
              :value="item.id"
              :label="item.classify_title"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="网站标题" prop="website_title">
          <el-input v-model="form.website_title" />
        </el-form-item>
        <el-form-item label="网站副标题">
          <el-input v-model="form.website_subtitle" />
        </el-form-item>
        <el-form-item label="网站 URL" prop="website_url">
          <el-input v-model="form.website_url" />
        </el-form-item>
        <el-form-item label="网站 Logo">
          <el-input v-model="form.website_logo"
                    placeholder="https://booop.net/wp-content/uploads/2022/03/cropped-booop_logo_512_512_Black_white.png" />
        </el-form-item>
        <el-form-item label="网站可见性">
          <el-switch v-model="form.website_switchChange" @change="switchChange" active-text="可见"
                     inactive-text="不可见" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-avatar class="avatar_group" shape="square" :size="200" fit="contain"
                 :src="form.website_logo">
        <img src="https://booop.net/wp-content/uploads/2022/03/cropped-booop_logo_512_512_Black_white.png">
      </el-avatar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.subfield {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
  }

  @media screen and (max-width: 1200px) {

  }

}

.formGroup {
  width: 70%;
}

.avatar_group {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, .05);

  @media screen and (max-width: 992px) {
    margin-bottom: 40px;
  }
}

.el-avatar {

}
</style>