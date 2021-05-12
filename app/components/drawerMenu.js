import React from "react";
import { View } from "react-native";
import ModalOpener from "./modalOpener";
import colors from "../config/colors";

function DrawerMenu(props) {
  return(
    <View 
      style={{
        flex: 1, 
        justifyContent: "space-evenly", 
        backgroundColor: colors.purple,
        }}
      >
        <ModalOpener
          {...props}
          name="help & hotline"
          icon="phone"
          isMapScreen={true}
          navigateTo="HelpAndHotlineModal"
        />
        <ModalOpener
          {...props}
          name="support us"
          icon="support"
          isMapScreen={true}
          navigateTo="SupportUsModal"
        />
        <ModalOpener
          {...props}
          name="contact us"
          icon="contact"
          isMapScreen={true}
          navigateTo="ContactUsModal"
        />
        <ModalOpener
          {...props}
          name="faqs"
          icon="faqs"
          isMapScreen={true}
          navigateTo="FaqsModal"
        />
        <ModalOpener
          {...props}
          name="accessibility"
          icon="accessibility"
          bottomBorder={true}
          isMapScreen={true}
          navigateTo="ContactUsModal"
        />
    </View>
  )
}

export default DrawerMenu;
