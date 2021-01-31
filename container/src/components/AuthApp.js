import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        // 預防無限循環
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          console.log("route from auth to container", nextPathname);
          history.push(nextPathname);
        }
      },
      onSignIn
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
