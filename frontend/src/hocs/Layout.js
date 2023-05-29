import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkTokenExpiration } from "../actions/auth";
import SideMenu from "../component/SideMenu";

const Layout = ({ checkTokenExpiration, children }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      checkTokenExpiration();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [checkTokenExpiration]);

  return (
    <div className="App">
      <SideMenu />
      {children}
    </div>
  );
};

export default connect(null, { checkTokenExpiration })(Layout);
