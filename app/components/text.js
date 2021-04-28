import React from "react";
import { Text as DefaultText } from "react-native";

function Text(props){
  const fontFamily = {
    fontFamily: props.fontFamily === 'bold' ? 'ArialBold' : 'Arial',
  }
  return(
    <DefaultText
      style={[fontFamily, props.style]}
    >
      {props.children}
    </DefaultText>
  )
}

export default Text;
