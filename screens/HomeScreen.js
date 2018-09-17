import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, MapView } from 'expo';
import { MonoText } from '../components/StyledText';
import * as firebase from "firebase";
import { Marker } from 'react-native-maps';

const firebaseConfig = {
    apiKey: "AIzaSyBNPcD47E7dfNa4bGaGZmEsQcWfsSsOc50",
    authDomain: "pin-point-app.firebaseapp.com",
    databaseURL: "https://pin-point-app.firebaseio.com",
    projectId: "pin-point-app",
    storageBucket: "pin-point-app.appspot.com",
    messagingSenderId: "451086133233"
};

firebase.initializeApp(firebaseConfig);

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            pins: [],
        };
    }

  async componentDidMount() {
      // this.createPin(-43.5322563,172.559524);
      const pins = await this.fetchPins();
      this.setState({pins: pins, isLoading: false});
  }

    createPin(lat, long) {
        firebase.database().ref('pins/').push().set({
            latitude: lat,
            longitude: long,
            title: "title",
            description: "description"
        });
    }

    async fetchPins() {
        const eventref = firebase.database().ref('pins/');
        const snapshot = await eventref.once('value');
        console.log(snapshot);
        const value = Object.values(snapshot.val());
        return value;
    }

  render() {
      if(this.state.isLoading) {
          return(
              <View style={styles.activityIndicatorContainer}>
                  <ActivityIndicator size="large" color="#484848" animating={true}/>
              </View>
          )
      } else {
          return(
              <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                      latitude: -43.5322563,
                      longitude: 172.559524,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                  }}
              >
                  {this.state.pins.map((pin, index) => (
                      <Marker
                          key={index}
                          coordinate={{latitude: pin.latitude,
                              longitude: pin.longitude}}
                          title={"Pin"}
                          description={"description"}
                      />
                  ))}
              </MapView>
          )
      }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
