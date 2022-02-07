import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
	ButtonStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 20,
		elevation: 3,
		borderColor: '#eba315',
		color: '#eba315',
		borderWidth: 2,
		width: '50%',
		bottom: 0,
		top: "25%",
	},
	Text:{
		fontFamily:"HelveticaNeue",
		color: "#52575D"
	},
	GreetingButtonStyle: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 5,
		elevation: 3,
		borderColor: "purple",
		borderWidth: 2,
		width: "90%",
		bottom: 0,
		top: "10%",
		marginTop: "3%",
		backgroundColor: "#fff",
	},
	ImageStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 120,
		height: 120,
		resizeMode: 'contain',
		marginBottom: 50
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 40,
		margin: 12,
		width: "80%",
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 1.4,
		borderRadius: 2,
		padding: 10,
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	statscontainer:{
		flexDirection: "row",
		alignSelf: "center",
		marginTop: 32
	},
	statsbox: {
		alignItems: "center",
		flex: 1,
		margin : 5,
		backgroundColor: "#800080",
		borderRadius:5
	},
	Float:{
		alignItems: "center",
		flex: 1,
		margin : 5,
		marginTop: 170,
		backgroundColor: "red",
		borderRadius:5
	},
	cardcenters:{
		alignItems: "center",
		margin: 2,
		textAlign:'center',
		borderStyle: "solid",
        borderWidth:1,
        borderColor:'#faea84',
	}
})

export default styles;