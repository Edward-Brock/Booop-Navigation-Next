<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router";

const ruleFormRef = ref();

const form = reactive({
  sort_id: 0,
  classify_title: "",
  classify_subtitle: "",
  classify_switchChange: true,
  classify_hidden: 0
});

const rules = reactive({
  classify_title: [
    { required: true, message: "Please input Website title", trigger: "blur" }
  ]
});

function switchChange() {
  if (form.classify_switchChange) {
    form.classify_hidden = 0;
  } else {
    form.classify_hidden = 1;
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
          database: "classify",
          sort_id: form.sort_id,
          classify_title: form.classify_title,
          classify_subtitle: form.classify_subtitle,
          classify_hidden: 0
        }
      }).then((response) => {
          // console.log(response.data);
          if (!response.data.status) {
            ElMessage({
              message: response.data.message,
              type: "success"
            });
            router.push({ path: "adminClassify" });
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
    <div class="title">添加分类</div>
    <div class="subfield">
      <el-form class="formGroup" :model="form" ref="ruleFormRef" :rules="rules" label-width="100px">
        <el-form-item label="排序 ID">
          <el-input-number style="width: 120px" :min="0" v-model="form.sort_id" />
        </el-form-item>
        <el-form-item label="分类标题" prop="classify_title">
          <el-input v-model="form.classify_title" />
        </el-form-item>
        <el-form-item label="分类副标题">
          <el-input v-model="form.classify_subtitle" />
        </el-form-item>
        <el-form-item label="分类可见性">
          <el-switch v-model="form.classify_switchChange" @change="switchChange" active-text="可见"
                     inactive-text="不可见" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
  margin: 0 auto;
  width: 75%;
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