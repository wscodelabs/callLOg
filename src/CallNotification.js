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

let phnumb= null

let lastnumber=null;


BackgroundJob.register({
  jobKey: 'aaa',
  job: ()=> 
  { 
    CallLogs.show((status)=> {
    const js= JSON.parse(status)
    const phNum = js[0].phoneNumber
    if(lastnumber !== phNum && phnumb.includes(phNum.toString())){
      PushNotification.localNotification({
        message: `${phNum} is good`
      })
      lastnumber=phNum;
    }
    
    })
  }

})

class CallNotification extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    fetch('http://45.79.70.185:4000/api/providers')
    .then(res=> res.json())
    .then(data=> { phnumb= data.map((info)=> info.phoneNumber)})
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