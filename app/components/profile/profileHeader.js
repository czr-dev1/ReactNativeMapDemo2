import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../../config/colors';

function ProfileHeader(props) {
	return (
		<View>
			<View style={{ justifyContent: 'center' }}>
				<Text style={styles.header}>
					{ props.username }
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.purple 
	}
})

const mapStateToProps = (state) => {
	return {
		username: state.profileReducer.profileData.user.username,
	};
};

export default connect(mapStateToProps)(ProfileHeader);
