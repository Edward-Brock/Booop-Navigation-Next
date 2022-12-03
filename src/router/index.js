import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NavLogin from "../views/NavLogin.vue";
import NavAdmin from "../views/NavAdmin.vue";
import AdminWebsite from "../components/AdminWebsite.vue";
import AdminAddWebsite from "../components/AdminAddWebsite.vue";
import AdminClassify from "../components/AdminClassify.vue";
import AdminAddClassify from "../components/AdminAddClassify.vue";
import { useLoginStore } from "../stores/login";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    }, {
      path: "/login",
      name: "login",
      component: NavLogin
    }, {
      path: "/admin",
      name: "admin",
      component: NavAdmin,
      meta: {
        requiresAuth: true
      },
      redirect: { name: "adminWebsite" },
      children: [{
        path: "adminWebsite",
        name: "adminWebsite",
        component: AdminWebsite
      }, {
        path: "adminAddWebsite",
        name: "adminAddWebsite",
        component: AdminAddWebsite
      }, {
        path: "adminClassify",
        name: "adminClassify",
        component: AdminClassify
      }, {
        path: "adminAddClassify",
        name: "adminAddClassify",
        component: AdminAddClassify
      }]
    }
  ]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const auth = useLoginStore();
  // 判断该页面是否需要登录
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 如果token存在直接跳转
    if (auth.getAuthenticated) {
      next();
    } else {
      // 否则跳转到login登录页面
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
