import React from "react";
import classes from "./Click.module.css";

const Click = ({ children, click }) => (
  <div className={classes.click} onClick={click}>
    {children}
  </div>
);

export default Click;
