import axios from 'axios';
import { returnErrors } from './messageActions';

const config = {
	headers: {
		'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
	},
};

export const tokenConfig = (getState) => {
	const token = getState().authReducer.token;

	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}
	return config;
};

// LOGIN USER
export const login = ({ username, password, expoPushToken }) => {
	return (dispatch) => {
		const user = {
			username: username,
			password: password,
		};
		dispatch({ type: 'LOAD_PROFILE_START' });

		axios.post(`https://www.globaltraqsdev.com/api/auth/login`, user, config)
		.then((res) => {
			let data = {
					id: res.data.user.id
			};

			// RETRIEVING: user from 2nd backend
			axios.get(`http://192.81.130.223:8012/api/user/get`, {params: data})
			.then((res2) => {
				// setting followingList and notificationsList
				console.log("recieved data: ", res2.data);
				dispatch({ type: 'SET_NOTIFICATIONS_FOLLOWING_LISTS', payload: {
					notificationList: res2.data.notificationList,
					followingList: res2.data.followingList,
				}})

				// end setting

				if (res2.data.expoPushToken !== expoPushToken) {
					data = {
						id: res.data.user.id,
						expoPushToken: expoPushToken
					};
					//UPDATE: user push token if it is different from previous
					axios.patch(`http://192.81.130.223:8012/api/user/updatePushToken`, data)
					.then((res3) => {
						console.log(res3.data);
					})
					.catch((err) => {
						console.log(err.response.data);
					})
				}
			})
			.catch((err) => {
				data = {
					id: res.data.user.id,
					expoPushToken: expoPushToken
				};
				console.log("Fail getting user: ", err.response.data);

				// CREATING: new entry if none exists (aka has account from website)
				axios.post(`http://192.81.130.223:8012/api/user/create`, data)
					.then((res) => {
						// console.log(res);
					})
					.catch((err) => {
						console.log("Fail creating user: ", err);
					});
			});
			dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data });
			dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: 'LOGIN_USER_FAIL', payload: err.response.data });
		})
	}
}

// LOGOUT USER
export const logout = () => {
	return (dispatch, getState) => {
		axios.post(`https://www.globaltraqsdev.com/api/auth/logout/`, null, tokenConfig(getState))
		.then(() => {
			dispatch({ type: 'LOGOUT_USER_SUCCESS' });
		})
		.catch((err) => {
			dispatch({ type: 'LOGOUT_FAIL' });
			dispatch(returnErrors(err.response.data, err.response.status));
		})
	}
}

// REGISTER NEW USER
export const register = ({ username, email, confirmPassword }) => {
	return (dispatch) => {
		const user = {
			username: username,
			email: email,
			password: confirmPassword,
		};
		dispatch({ type: 'LOAD_PROFILE_START' });

		axios.post(`https://www.globaltraqsdev.com/api/auth/register`, user, config)
		.then((res) => {
			dispatch({ type: 'REGISTER_USER_SUCCESS', payload: res.data });
			dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: 'REGISTER_USER_FAIL', payload: err.response.data });
		})
	}
}

// USER SELF DELETES ACCOUNT
export const userSelfDelete = () => {
	return (dispatch, getState) => {
		axios.delete(`https://www.globaltraqsdev.com/api/auth/user`, tokenConfig(getState))
		.then((res) => {
			dispatch({ type: 'USER_SELF_DELETE', payload: res.data });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		})
	}
}

// CHANGES PRIVACY
export const setPrivacyMode = (setting) => {
	return (dispatch) => {
		dispatch({ type: 'SET_PRIVACY_MODE', isPrivacyMode: setting });
	}
}

// RELOAD USER
export const reloadUser = (username) => {
	return (dispatch) => {
		dispatch({ type: 'USER_PROFILE_RELOADING' });
		// NOTE: The slashes at the end of the URL play a BIG ROLE
		// If you're going to copy the URL make sure to copy it exactly w/ w/o slashes
		axios.get(`https://www.globaltraqsdev.com/api/profile/users/?username=${username}`, config)
		.then((res) => {
			console.log(res.data[0]);
			dispatch({ type: 'USER_PROFILE_RELOADED', extra: res.data[0] });
		})
		.catch((err) => {
			console.log(err);
			dispatch({ type: 'USER_PROFILE_RELOAD_FAIL', payload: err });
		});
	}
}

// SET USER PUSH TOKEN
export const setExpoPushToken = (token) => {
	return (dispatch) => {
		dispatch({ type: 'SET_EXPO_PUSH_TOKEN', payload: token });
	}
}

// FOLLOW OTHER USER
export const followUser = ({ id, list }) => {
	return (dispatch) => {
		let temp = [];
		temp.push(list[list.length - 1]);
		const data = {
			id: id,
			followingList: temp,
		}
		console.log('reducer: ', data);

		axios.post(`http://192.81.130.223:8012/api/user/follow`, data)
		.then((res) => {
			console.log(res);
			dispatch({ type: 'FOLLOW_USER', payload: list });
		})
		.catch((err) => {
			console.log(err);
		});
	}
}

// UNFOLLOW OTHER USER
export const unfollowUser = ({ list, id, unfollowing }) => {
	return (dispatch) => {
		const data = {
			id: id,
			unfollow: unfollowing,
		}
		console.log('aa', list);

		axios.patch(`http://192.81.130.223:8012/api/user/unfollow`, data)
		.then((res) => {
			console.log(res.data);
			dispatch({ type: 'UNFOLLOW_USER', payload: list });
		})
		.catch((res) => {
			console.log(err);
		});
	}
}

export const reset = () => {
	return (dispatch) => {
		dispatch({ type: 'RESET_STATE' });
	};
}
