<script lang="ts" setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const navigationInfo = ref();
onMounted(() => {
  axios({
    method: "GET",
    url: import.meta.env.VITE_APP_BASE_API + "/getClassifyInfo"
  }).then((response) => {
      // console.log(response.data.result);
      navigationInfo.value = response.data.result;
    }
  );
});

// 网址可见性转换
function formatHidden(row) {
  return row.classify_hidden === 0 ? "可见" : row.classify_hidden === 1 ? "不可见" : "错误";
}

// 当前点击的行
let clickRow = ref(null);
let clickCell = ref(null);
// 当前触发字段的所属数据库字段名
let tabClickLabel = ref(null);
// 当前触发字段的对应id
let clickDataId = ref(null);

// 控制input显示 row 当前行 column 当前列
function tabClick(row, column, cell, event) {
  // console.log(row, column);
  clickDataId.value = row.id;

  switch (column.label) {
    case "排序 ID":
      clickRow.value = row.index;
      clickCell.value = column.index;
      tabClickLabel.value = "sort_id";
      break;
    case "分类标题":
      clickRow.value = row.index;
      clickCell.value = column.index;
      tabClickLabel.value = "classify_title";
      break;
    case "分类副标题":
      clickRow.value = row.index;
      clickCell.value = column.index;
      tabClickLabel.value = "classify_subtitle";
      break;
    case "分类可见性":
      clickRow.value = row.index;
      clickCell.value = column.index;
      tabClickLabel.value = "classify_hidden";
      break;
    default:
      return;
  }
}

// 把每一行的索引放进row
function tableRowClassName({ row, rowIndex }) {
  row.index = rowIndex;
}

// 把每一列的索引放进column
function tableCellClassName({ column, columnIndex }) {
  column.index = columnIndex;
}

// 失去焦点初始化
function inputBlur(row, event, column) {
  // 显示当前更改的id、更改数据库字段、更改后的值
  // console.log(clickDataId.value, row.target.value, tabClickLabel.value);
  // 更新网址内容信息
  axios({
    method: "POST",
    url: import.meta.env.VITE_APP_BASE_API + "/updateDatabaseInfo",
    data: {
      database: "classify",
      id: clickDataId.value,
      key: tabClickLabel.value,
      value: row.target.value
    }
  }).then((response) => {
      // console.log(response.data);
      if (response.data.status) {
        ElMessage.error(response.data.message);
      } else {
        ElMessage({
          message: response.data.message,
          type: "success"
        });
      }
    }
  );
  // 清空记录内容
  clickRow.value = null;
  clickCell.value = null;
  tabClickLabel.value = null;
  clickDataId.value = null;
}

// 分类单独删除
function deleteNavigation(id) {
  axios({
    method: "POST",
    url: import.meta.env.VITE_APP_BASE_API + "/deleteNavigation",
    data: {
      database: "classify",
      id
    }
  }).then((response) => {
      // console.log(response.data);
      if (!response.data.status) {
        ElMessage({
          message: response.data.message,
          type: "success"
        });
      } else {
        ElMessage({
          message: response.data.message,
          type: "warning"
        });
      }
    }
  );
}
</script>

<template>
  <div class="container">
    <el-table :data="navigationInfo"
              :default-sort="{ prop: 'id', order: 'null' }"
              max-height="calc(100vh - 40px)"
              @cell-dblclick="tabClick"
              :row-class-name="tableRowClassName"
              :cell-class-name="tableCellClassName">
      <el-table-column prop="id" label="ID" width="70px" align="center" sortable />
      <el-table-column label="排序 ID" width="100px" align="center" sortable>
        <template v-slot="scope">
          <div v-if="scope.row.index === clickRow && scope.column.index === clickCell">
            <el-input
              ref="editInput"
              v-model="scope.row.sort_id"
              @blur="inputBlur"
            />
          </div>
          <div v-else>{{ scope.row.sort_id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="分类标题" align="center" sortable>
        <template v-slot="scope">
          <div v-if="scope.row.index === clickRow && scope.column.index === clickCell">
            <el-input
              ref="editInput"
              v-model="scope.row.classify_title"
              @blur="inputBlur"
            />
          </div>
          <div v-else>{{ scope.row.classify_title }}</div>
        </template>
      </el-table-column>
      <el-table-column label="分类副标题" align="center" show-overflow-tooltip>
        <template v-slot="scope">
          <div v-if="scope.row.index === clickRow && scope.column.index === clickCell">
            <el-input
              ref="editInput"
              v-model="scope.row.classify_subtitle"
              @blur="inputBlur"
            />
          </div>
          <div v-else>{{ scope.row.classify_subtitle }}</div>
        </template>
      </el-table-column>
      <el-table-column label="分类可见性" width="120px" align="center" sortable
                       :formatter="formatHidden">
        <template v-slot="scope">
          <div v-if="scope.row.index === clickRow && scope.column.index === clickCell">
            <el-input
              ref="editInput"
              v-model="scope.row.classify_hidden"
              @blur="inputBlur"
            />
          </div>
          <div v-else>
            <el-tag>{{ scope.row.classify_hidden === 0 ? "可见" : "不可见" }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="配置" width="60px" align="center">
        <template v-slot="scope">
          <el-popconfirm title="确认删除该网址？" hide-icon confirm-button-text="好" cancel-button-text="取消"
                         @confirm="deleteNavigation(scope.row.id)">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.formBtn {
  margin-bottom: 20px;
}
</style>