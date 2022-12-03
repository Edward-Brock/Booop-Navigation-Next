// 导入数据库操作模块
const db = require("../db/index");
const bcrypt = require("bcryptjs");

// 获取导航网站详细信息数据
exports.getNavigationInfo = (req, res) => {
  // 列出所有导航信息
  const all_navigation_info_search = "SELECT * FROM `classify`, `website` WHERE classify.id = website.classify_id ORDER BY classify.sort_id";

  db.query(all_navigation_info_search, (err, result) => {
    if (err) return res.cc(err.message);
    // console.log(result);
    res.send({
      status: 0,
      result
    });
  });
};

// 获取导航网站详细信息数据（不包含不显示网址）
exports.getNavigationInfoR18 = (req, res) => {
  // 列出所有导航信息
  const all_navigation_info_search = "SELECT * FROM `classify`, `website` WHERE classify.id = website.classify_id AND website.website_hidden = 0 AND classify.classify_hidden = 0 ORDER BY classify.sort_id";

  db.query(all_navigation_info_search, (err, result) => {
    if (err) return res.cc(err.message);
    // console.log(result);
    res.send({
      status: 0,
      result
    });
  });
};

// 查询网址分类信息
exports.getClassifyInfo = (req, res) => {
  // 列出所有网址分类信息
  const all_classify_info_search = "SELECT * FROM `classify`";

  db.query(all_classify_info_search, (err, result) => {
    if (err) return res.cc(err.message);
    // console.log(result);
    res.send({
      status: 0,
      result
    });
  });
};

// 验证管理后台保护锁（密码）
exports.getPassword = (req, res) => {
  // 获取输入的保护锁
  let req_password = req.body;
  // console.log(req_password.password);

  // 验证保护锁
  const verify_password_sql = "SELECT option_value FROM `option` WHERE option_name = ?";
  db.query(verify_password_sql, "website_password", (err, result) => {
    if (err) {
      return res.cc(err);
    }
    console.log("获取到的保护锁：", result, "输入的保护锁：", req_password.password);
    // 传入的保护锁与数据库中存在的保护锁进行校验
    let verify_status = bcrypt.compareSync(req_password.password, result[0].option_value);
    console.log("保护锁验证结果为：", verify_status);
    res.send({
      status: 0,
      verify_status
    });
  });
};

// 更新管理后台保护锁（密码）
exports.updatePassword = (req, res) => {

  let req_password = req.body;
  console.log(req_password);
  if (!req_password) {
    return res.cc("保护锁不合法");
  }

  // 调用bcrypt.hash()函数，加密用户的密码
  req_password = bcrypt.hashSync(req_password.password, 10);
  console.log("保护锁已变更为：", req_password);

  // 更新保护锁
  const update_password_sql = "UPDATE `option` SET option_value = ? WHERE option_name = ?";
  db.query(update_password_sql, [req_password, "website_password"], (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.affectedRows !== 1) {
      return res.cc("保护锁更新失败，请稍后重试");
    }
    return res.cc("保护锁更新成功", 0);
  });
};

// 新增网址、分类信息
exports.addDatabaseInfo = (req, res) => {
  let req_add_info = req.body;
  console.log(req_add_info);

  const website_template = {
    classify_id: req_add_info.classify_id,
    website_title: req_add_info.website_title,
    website_subtitle: req_add_info.website_subtitle,
    website_url: req_add_info.website_url,
    website_logo: req_add_info.website_logo,
    website_visit_num: 0,
    website_hidden: req_add_info.website_hidden
  };

  const classify_template = {
    sort_id: req_add_info.sort_id,
    classify_title: req_add_info.classify_title,
    classify_subtitle: req_add_info.classify_subtitle,
    classify_hidden: req_add_info.classify_hidden
  };

  let insert_database_template = "";

  if (req_add_info.database === "website") {
    insert_database_template = website_template;
  } else {
    insert_database_template = classify_template;
  }

  const insert_card_item = `INSERT INTO ${req_add_info.database} SET ?`;
  db.query(insert_card_item, insert_database_template, (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.affectedRows !== 1) {
      return res.cc("添加失败，请稍后重试");
    }
    return res.send({ status: 0, message: "添加成功", data: req_add_info });
  });

};

// 更新网址、分类信息
exports.updateDatabaseInfo = (req, res) => {
  let req_update_info = req.body;
  console.log(req_update_info);

  // 通过传入的id更新对应字段的值
  const database_id_sql = `UPDATE ${req_update_info.database} SET ${req_update_info.key} = ? WHERE id = ?`;
  db.query(database_id_sql, [req_update_info.value, req_update_info.id], (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.affectedRows !== 1) {
      return res.cc("相关内容更新失败，请稍后重试");
    }
    return res.send({
      status: 0,
      message: "相关内容更新成功"
    });
  });
};

// 删除网址分类信息
exports.deleteNavigation = (req, res) => {
  // 获取要删除的数据库及相关id
  let req_database_and_id = req.body;
  console.log(req_database_and_id);

  // 删除相关数据库及其id
  const database_id_sql = `DELETE FROM ${req_database_and_id.database} WHERE id = ${req_database_and_id.id}`;
  db.query(database_id_sql, (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.affectedRows !== 1) {
      return res.cc("相关内容删除失败，请稍后重试");
    }
    return res.send({
      status: 0,
      message: "相关内容删除成功"
    });
  });
};

// 统计每个网站访问次数
exports.visitCount = (req, res) => {
  const form = req.body;
  // console.log(form)

  // 向数据库中对应id更新网站访问量
  const update_visit_num = "UPDATE website SET ? WHERE ?";
  db.query(update_visit_num, [{ website_visit_num: form.website_visit_num }, { id: form.id }], (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.affectedRows !== 1) {
      return res.cc("添加失败，请稍后重试");
    }
    return res.send({ status: 0, message: "添加成功" });
  });
};
