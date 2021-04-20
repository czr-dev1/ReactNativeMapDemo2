import React, { useState } from 'react';
import { 
	FlatList, 
	Linking, 
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	View 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../config/colors';

function HelpAndHotlineModal(props) {
	const [showModal, setShowModal] = useState(false);

	const data = [
		{
			name: 'the trevor Project',
			number: '(866) 488-7386',
			description:
				'the trevor Project is the leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender and questioning (LGBtQ) young people ages 13-24.',
		},
		{
			name: 'the Gay, Lesbian, Bisexual and transgender National Hotline',
			number: '(888) 843-4564',
			description:
				'Free and confidential resources for LGBtQ+ locally, nationally, and internationally.',
		},
		{
			name: 'the GLBt National Youth talkline (youth serving youth through age 25)',
			number: '(800) 246-7743',
			description:
				'Provides telephone, online private one-to-one chat and email peer-support, as well as factual information and local resources for cities and towns across the United States.',
		},
		{
			name: 'the true Colors United',
			number: '(212) 461-4401',
			description:
				'the true Colors Fund is working to end homelessness among lesbian, gay, bisexual, transgender, queer, and questioning youth, creating a world in which all young people can be their true selves. true Colors United runs a database of service providers.',
		},
		{
			name: 'Pride Institute',
			number: '(800) 547-7433',
			description:
				'Chemical dependency/mental health referral and information hotline for the LGBtQ community.',
		},
	];

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					backgroundColor: colors.purple,
					width: '100%',
				}}
			>
				<Text 
					style={{ 
						fontSize: 18,
						padding: 24, 
						color: colors.white, 
						fontWeight: 'bold' 
					}}
				>
					help & hotline
				</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					return (
						<View style={styles.box}>
							<Text style={styles.itemTitle}>{item.name.toLowerCase()}</Text>
							<TouchableOpacity
								style={{ flexDirection: 'row', alignItems: 'center' }}
								onPress={() => {
									let phone = `tel:${item.number}`;
									console.log(phone);
									Linking.openURL(phone);
								}}
							>
								<FontAwesome5
									style={{ transform: [{ rotate: '90deg' }] }}
									name='phone'
									size={24}
									color='#787878'
								/>
								<Text style={styles.number}>{item.number}</Text>
							</TouchableOpacity>
							<Text style={styles.description}>{item.description.toLowerCase()}</Text>
						</View>
					);
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.border,
		alignItems: 'center',
		height: '100%',
	},
	box: {
		borderRadius: 36,
		paddingTop: 18,
		paddingBottom: 18,
		paddingRight: 32,
		paddingLeft: 32,
		marginRight: 24,
		marginLeft: 24,
		marginBottom: 12,
		marginTop: 12,
		backgroundColor: colors.white,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colors.black,
	},
	number: {
		padding: 8,
	},
	description: {
		color: colors.black,
		fontSize: 14,
	},
});

export default HelpAndHotlineModal;
