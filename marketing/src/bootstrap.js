import React from "react";
import ReactDOM from "react-dom";

// 創建 mount function
const mount = (el) => {
  ReactDOM.render(<h1>Hi there!</h1>, el);
};

// 如果是 development 將直接調用 mount
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_marketing-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

// export mount 方法給 container 調用
export { mount };