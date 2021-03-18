import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { setPrivacyMode } from '../redux/actions/authActions';

function AnonToggleSwitch(props) {
	return (
		<View style={styles.container}>
			<Text>privacy mode</Text>
			<Switch
				value={props.isPrivacyMode}
				onValueChange={() => props.setPrivacyMode(!props.isPrivacyMode)}
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				thumbColor={props.isPrivacyMode ? '#f5dd4b' : '#f4f3f4'}
				ios_backgroundColor='#3e3e3e'
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
		borderColor: '#ddd',
	},
});

const mapStateToProps = (state) => {
	return {
		isPrivacyMode: state.authReducer.isPrivacyMode,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setPrivacyMode: (setting) => dispatch(setPrivacyMode(setting)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnonToggleSwitch);
