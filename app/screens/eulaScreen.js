import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Text from "../components/text";
import colors from "../config/colors";

function EulaScreen() {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<View>
				<Text style={{
					color: colors.black,
					alignSelf: 'center',
					fontFamily: 'Arial',
					fontSize: 24,
					marginTop: 10,
				}}>
					community guidelines
				</Text>
			</View>
			<ScrollView 
				style={{ margin: 15, flex: 1, }} 
				contentContainerStyle={{flexGrow:1}}
			>
				<View style={{ marginBottom: 5 }}>
					<Text style={styles.eulaText}>
						Welcome to The arqive! Our mission is to document LGBTQ+ stories that celebrate all aspects of queer identity while preserving and archiving the community’s history for future generations.
					</Text>
				</View>
				<View style={{ marginBottom: 5 }}>
					<Text style={styles.eulaText}>
						We are thrilled to have you and can’t wait to read the diverse stories, personal experiences, and different perspectives you will share with the global LGBTQ+ community! We welcome and encourage open conversation and diverse viewpoints. Our goal is to create a safe space for everyone, and by signing up to The arqive you agree to the following community guidelines:
					</Text>
				</View>
				<View>
					<Text style={styles.eulaText}>
						We have an absolute zero tolerance towards:
					</Text>
				</View>
				<View style={{ marginBottom: 5 }}>
					<Text style={{ fontSize: 14, fontFamily: 'Arial', marginLeft: 15 }}>- defamatory, offensive, or discriminatory language</Text>
					<Text style={{ fontSize: 14, fontFamily: 'Arial', marginLeft: 15 }}>- misleading, unlawful, or threatening content</Text>
					<Text style={{ fontSize: 14, fontFamily: 'Arial', marginLeft: 15 }}>- bullying, name-calling, trolling, and abuse</Text>
				</View>
				<View style={{ marginBottom: 5 }}>
					<Text style={styles.eulaText}>
						Do not share information about others without their permission. Do not post personal information that you would not be comfortable sharing with a stranger. We recommend that you don’t post any information that may identify you or anyone else, such as your address, email, or phone number.
					</Text>
				</View>
				<View style={{ marginBottom: 5 }}>
					<Text style={styles.eulaText}>
						We don’t allow spam or promotional posts (if you want to work with us or have suggestions of good people or organizations with whom we should partner, you can contact us at https://thearqive.com/ContactUs).
					</Text>
				</View>
				<View style={{ marginBottom: 5 }}>
					<Text style={styles.eulaText}>
						Use your own words, stories, and experiences. Don’t copy someone else’s intellectual property without their permission.
					</Text>
					<Text style={styles.eulaText}>
						Please be aware that we reserve the right to delete posts and comments at our discretion and block any repeat offenders.
					</Text>
				</View>
				<View>
					<Text style={styles.eulaText}>
						By registering to this site, you agree to these community guidelines and warrant that you are 13 years or older. Anyone under the age of 18 must have approval from a parent or a guardian. These guidelines are subject to change for bettering the community and creating a safer place for all.
					</Text>
				</View>
			</ScrollView>
			<View style={styles.registerContainer}>
				<View style={styles.registerBtn}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Register');
						}}
					>
						<Text
							style={{
								color: colors.white,
								alignSelf: 'center',
								fontFamily: 'Arial',
								fontSize: 24,
							}}
						>
							agree
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
					>
						<Text style={styles.text}> back </Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	registerContainer: {
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	registerBtn: {
		backgroundColor: colors.purple,
		justifyContent: 'center',
		borderRadius: 15,
		height: 60,
		width: '80%',
	},
	text: {
		fontSize: 14,
		color: colors.black,
		margin: 20,
	},
	eulaText: {
		fontSize: 14,
		color: colors.black,
		alignSelf: 'flex-start',
		fontFamily: 'Arial',
	}
});

export default EulaScreen;
