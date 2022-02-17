import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AnonToggleSwitch from "./anonToggleSwitch";
import ModalOpener from "./modalOpener";
import colors from "../config/colors";
import { connect } from 'react-redux';

function DrawerMenu(props) {

  return(
    <View style={{justifyContent: "space-evenly", flex: 1, backgroundColor: colors.purple}}>
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
          name="Terms of Services"
          icon="file-text"
          isMapScreen={true}
          bottomBorder={true}
          navigateTo="TosModal"
        />
    </View>
  )
}

export default DrawerMenu;
