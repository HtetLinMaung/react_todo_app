import React from "react";
import classes from "./Center.module.css";

const Center = (props) => (
  <div className={classes.center}>
    <div>{props.children}</div>
  </div>
);

export default Center;
