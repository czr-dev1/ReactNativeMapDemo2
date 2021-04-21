import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../../config/colors';

function ProfileHeader(props) {

	return (
		<View>
			<View style={{ justifyContent: 'center' }}>
				<Text 
					style={{ 
						fontSize: 20, 
						fontWeight: 'bold', 
						color: colors.purple 
					}}
				>
					{ props.username }
				</Text>
			</View>
		</View>
	); 
}

const mapStateToProps = (state) => {
	return {
		username: state.profileReducer.profileData.user.username,
	};
};

export default connect(mapStateToProps)(ProfileHeader);
