import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// 創建 mount function
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath]
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      // 預防無限循環
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        console.log("route from container to auth", nextPathname);
        history.push(nextPathname);
      }
    }
  };
};

// 如果是 development 將直接調用 mount
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// export mount 方法給 container 調用
export { mount };
