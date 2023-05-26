import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/auth";
import SideMenu from "../component/SideMenu";

const Layout = ({ load_user, children }) => {
  // useEffect(() => {
  //   // checkAuthenticated();
  //   load_user();
  // }, []);

  return (
    <div className="App">
      <SideMenu />
      {children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
