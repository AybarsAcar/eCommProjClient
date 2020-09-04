import React from "react";

export default function PageContent(props) {

  const styles = {
    backgroundColor: "#ebecf1",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    overflow: "auto"
  };

  return <div style={styles}>{props.children}</div>;
}

//create a context to store one piece of data in the state
//a boolean value and a method to change the darktheme
