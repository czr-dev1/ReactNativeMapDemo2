import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

function ProfileHeader(props) {
  return (
    <View>
      <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'gray'}}>{props.username}</Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
		username: state.profileReducer.profileData.user.username,
	};
}

export default connect(mapStateToProps)(ProfileHeader);
