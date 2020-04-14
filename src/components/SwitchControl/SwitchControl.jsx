import React, { useRef } from "react";
import classes from "./SwitchControl.module.css";

import Flex from "../Flex/Flex";
import Text from "../Text/Text";

const SwitchControl = ({ checked, handleClick, loading, label }) => {
  const checkboxInput = useRef(null);

  let innerSwitchStyle = null;
  let switchStyle = null;
  if (checked) {
    innerSwitchStyle = { transform: "translateX(153%)" };
    switchStyle = { background: "#1bc665" };
  } else {
    innerSwitchStyle = { transform: "translateX(0%)" };
    switchStyle = { background: "#e1413e" };
  }

  return (
    <Flex padding="0" align="center">
      <Flex>
        <Text>{label}</Text>
      </Flex>
      <Flex>
        <div
          className={classes.switch}
          onClick={() => checkboxInput.current.click()}
          style={switchStyle}
        >
          <div className={classes.switchInner} style={innerSwitchStyle}></div>
          <input
            style={{ display: "none" }}
            type="checkbox"
            checked={checked}
            onChange={handleClick}
            ref={checkboxInput}
          />
        </div>
      </Flex>
    </Flex>
  );
};

export default SwitchControl;
