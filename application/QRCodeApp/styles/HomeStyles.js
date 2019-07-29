import { Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get("window").width; // Get device width
export const deviceHeight = Dimensions.get("window").height; // Get device height
export const responsiveFontSize = deviceHeight / 36; // Font size according to device compatibility

// Styles required in Home Component screen
const HomeStyles = {

  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
  headerText: {
    fontWeight: '700',
    fontSize: deviceHeight / 28,
    width: '90%',
    alignSelf:'center',
    marginBottom:'5%',
    marginTop: '20%'
  },
  button: {
    justifyContent: "center",
    height: 65,
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: responsiveFontSize,
    color: '#fff'
  },
  scanner: {
    width: deviceWidth,
    height: deviceHeight
  }

}

export default HomeStyles;
