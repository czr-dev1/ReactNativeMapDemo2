import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setPrivacyMode } from '../redux/actions/auth';


function AnonToggleSwitch(props) {
  return (
    <View style={styles.container}>
      <Text>privacy mode</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={props.isPrivacyMode ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => props.setPrivacyMode(!props.isPrivacyMode)}
        value={props.isPrivacyMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 2,
    borderColor: '#ddd'
  },
});

const mapStateToProps = (state) => {
  return {
    isPrivacyMode: state.authReducer.isPrivacyMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPrivacyMode: (setting) => dispatch(setPrivacyMode(setting))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnonToggleSwitch);
