import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// 創建 mount function
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// 如果是 development 將直接調用 mount
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_dashboard-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

// export mount 方法給 container 調用
export { mount };
