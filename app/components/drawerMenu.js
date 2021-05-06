import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AnonToggleSwitch from "./anonToggleSwitch";
import ModalOpener from "./modalOpener";
import colors from "../config/colors";

function DrawerMenu(props) {
  return(
    <View style={{justifyContent: "space-evenly", flex: 1, backgroundColor: colors.purple}}>
        <ModalOpener
          {...props}
          name="help & hotline"
          icon="phone"
          navigateTo="HelpAndHotlineModal"
        />
        <ModalOpener
          {...props}
          name="support us"
          icon="support"
          navigateTo="SupportUsModal"
        />
        <ModalOpener
          {...props}
          name="contact us"
          icon="contact"
          navigateTo="ContactUsModal"
        />
        <ModalOpener
          {...props}
          name="faqs"
          icon="faqs"
          navigateTo="ContactUsModal"
        />
        <ModalOpener
          {...props}
          name="accessibility"
          icon="accessibility"
          navigateTo="ContactUsModal"
        />
        <AnonToggleSwitch {...props} />
        <ModalOpener
          {...props}
          name="log out" />
    </View>
  )
}

export default DrawerMenu;
