import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// 創建 mount function
const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      // 預防無限循環
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        console.log("from  container", nextPathname);
        history.push(nextPathname);
      }
    }
  };
};

// 如果是 development 將直接調用 mount
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_marketing-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// export mount 方法給 container 調用
export { mount };
