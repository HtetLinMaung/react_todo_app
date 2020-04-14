import React, { useState } from "react";
import classes from "./Textfield.module.css";

import Icon from "@mdi/react";

import Flex from "../Flex/Flex";

const Textfield = ({
  value,
  handleInput,
  maxWidth,
  height,
  rounded,
  size,
  preIcon,
  postIcon,
  handleKeyPress,
  name,
  placeholder,
}) => {
  const [animateColor, setAnimateColor] = useState("#cbcbcb");

  const iconElement = (icon) => (
    <Flex align="center">
      <Icon path={icon} size="16px" color={animateColor}></Icon>
    </Flex>
  );

  let preEl,
    postEl = null;
  if (preIcon) {
    preEl = iconElement(preIcon);
  }
  if (postIcon) {
    postEl = iconElement(postIcon);
  }

  return (
    <div
      className={classes.wrapper}
      style={{
        maxWidth,
        height,
        borderRadius: rounded ? 35 + "px" : "",
        borderColor: animateColor,
      }}
    >
      <Flex padding="0" align="stretch" height="100%">
        {preEl}
        <Flex flex="1" padding="0" align="center">
          <input
            type="text"
            name={name}
            className={classes.textField}
            value={value}
            onChange={handleInput}
            style={{ borderRadius: rounded ? 35 + "px" : "", fontSize: size }}
            onFocus={() => setAnimateColor("#f0456b")}
            onBlur={() => setAnimateColor("#cbcbcb")}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
          />
        </Flex>
        {postEl}
      </Flex>
    </div>
  );
};

export default Textfield;
