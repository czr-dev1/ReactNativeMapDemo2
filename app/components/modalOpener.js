import React from 'react';
import {
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/actions/authActions';

function ModalOpener(props) {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	
	return (
		<View style={{ borderBottomWidth: 2, borderColor: '#ddd' }}>
			{props.name === 'log out' ? (
				<TouchableWithoutFeedback
					onPress={() => {
						dispatch(logout());
					}}
				>
					<Text style={{ padding: 24 }}>{props.name}</Text>
				</TouchableWithoutFeedback>
			) : (
				<TouchableWithoutFeedback
					onPress={() => {
						navigation.navigate(props.navigateTo, {});
					}}
				>
					<Text style={{ padding: 24 }}>{props.name}</Text>
				</TouchableWithoutFeedback>
			)}
		</View>
	);
}

export default ModalOpener;
