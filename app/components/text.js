import React from "react";
import { Text as DefaultText } from "react-native";

/*
  WARNING:
    If you don't supply a style prop to the text you WILL make the application
    crash, if you don't need styling just add an empty style to the Text like so
    <Text style={{}}> </Text>
*/

function Text(props) {
  let fontFamily = {
    fontFamily: 'Arial'
  }

  if (props.style !== undefined) {
    if (props.style.fontWeight === 'bold') {
      fontFamily.fontFamily = 'ArialBold';
    }
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
