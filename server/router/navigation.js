const express = require("express");
const router = express.Router();

const navigationRouter = require("../router_handler/navigation");

// 获取导航网站详细信息数据
router.get("/getNavigationInfo", navigationRouter.getNavigationInfo);

// 获取导航网站详细信息数据（不包含不显示网址）
router.get("/getNavigationInfoR18", navigationRouter.getNavigationInfoR18);

// 查询网址分类信息
router.get("/getClassifyInfo", navigationRouter.getClassifyInfo);

// 验证管理后台保护锁（密码）
router.post("/getPassword", navigationRouter.getPassword);

// 更新管理后台保护锁（密码）
router.post("/updatePassword", navigationRouter.updatePassword);

// 新增网址、分类信息
router.post("/addDatabaseInfo", navigationRouter.addDatabaseInfo);

// 更新网址、分类信息
router.post("/updateDatabaseInfo", navigationRouter.updateDatabaseInfo);

// 删除网址分类信息
router.post("/deleteNavigation", navigationRouter.deleteNavigation);

// 统计每个网站访问次数
router.post("/visitCount", navigationRouter.visitCount);

// 访问网站写入日志
router.post("/addLog", navigationRouter.addLog);

module.exports = router;