import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeComponent from './components/HomeComponent'; // Import Home Component file

// Create App Container
const App = createStackNavigator(
	{
		HomeComponent: {
			screen: HomeComponent,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		headerMode: "float",
		mode: "card",
		initialRouteName: "HomeComponent"
	}
);

export default createAppContainer(App);

