import React from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div style={{ margin: "2em", marginTop: "6em" }}>{children}</div>
    {/* <BottomNav /> */}
  </>
);

export default Layout;
