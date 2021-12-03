import { StyleSheet } from 'react-native';

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
      top:"25%",
    },
    ImageStyle : {
      alignItems: 'center',
      justifyContent: 'center',
      width:100,
      height:100,
      bottom: 20,
      resizeMode: 'contain',
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
      borderTopWidth:0,
      borderLeftWIdth:0,
      borderRightWidth: 0,
      borderBottomWidth:1.4,
      borderRadius:2,
      padding: 10,
    }
  })
  
  export default styles;