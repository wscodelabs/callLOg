import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import PushNotification from 'react-native-push-notification'
import BackgroundJob from 'react-native-background-job';
import CallLogs from 'react-native-call-log';

let lastnumber=null;
const ph = [
    "9860251012",
    "123456",
    "12345",
    "1234"
];


BackgroundJob.register({
  jobKey: 'aaa',
  job: ()=> 
  { 
    CallLogs.show((status)=> { 
    const js= JSON.parse(status)
    const phNum = js[0].phoneNumber
    if(lastnumber !== phNum && ph.includes(phNum.toString())){
      PushNotification.localNotification({
        message: `${phNum} is good`
      })
      lastnumber=phNum;
    }
    
    })
  }

})

class CallNotification extends Component {
  componentDidMount() {
  }

  componentWillUnmount(){
    BackgroundJob.schedule({
        jobKey: 'aaa',
        period: 6000,
        timeout: 10000,
        alwaysRunning: true,
        networkType: BackgroundJob.NETWORK_TYPE_UNMETERED
    })
  }


  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>ggh</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default CallNotification;