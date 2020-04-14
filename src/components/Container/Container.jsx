import React from "react";
import classes from "./Container.module.css";

const Container = ({ color, children }) => (
  <div className={classes.container} style={{ backgroundColor: color }}>
    {children}
  </div>
);

export default Container;
