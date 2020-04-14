import React from "react";
import classes from "./Card.module.css";

const Card = ({ children, minWidth, maxHeight }) => (
  <div
    className={classes.card}
    style={{ minWidth: `${minWidth}px`, maxHeight }}
  >
    {children}
  </div>
);

export default Card;
