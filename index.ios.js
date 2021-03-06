/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  PushNotificationIOS,
  TouchableHighlight,
  TabBarIOS,
  StatusBarIOS,
} = React;

var MeditateTab = require('./tabs/Meditate');
var KalyanamitraTab = require('./tabs/Kalyanamitra');
var AnattaTab = require('./tabs/Anatta');

var Buddhapp = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor={'white'}
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.buttonLabel}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  },

  componentWillMount: function() {
    StatusBarIOS.setStyle(1);
  },

  getInitialState: function() {
    return {
      selectedTab: 'kalyanamitraTab',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  },

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName
    });
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#FF0066">

        <TabBarIOS.Item
          title="Meditate"
          icon={require('image!fire')}
          selected={this.state.selectedTab === 'meditateTab'}
          onPress={() => {
            this.changeTab('meditateTab');
          }}>
          <MeditateTab />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Kalyanamitra"
          icon={require('image!sun')}
          selected={this.state.selectedTab === 'kalyanamitraTab'}
          onPress={() => {
            this.changeTab('kalyanamitraTab');
          }}>
          <KalyanamitraTab />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon={require('image!zen')}
          title="Anatta"
          selected={this.state.selectedTab === 'anattaTab'}
          onPress={() => {
            this.changeTab('anattaTab');
          }}>
          <AnattaTab />
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
});



class NotificationExample extends React.Component {
  componentWillMount() {
    PushNotificationIOS.addEventListener('notification', this._onNotification);
  }

  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('notification', this._onNotification);
  }

  render() {
    return (
      <View>
        <Button
          onPress={this._sendNotification}
          label="Send fake notification"
        />
      </View>
    );
  }

  _sendNotification() {
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
      aps: {
        alert: 'Sample notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _onNotification(notification) {
    AlertIOS.alert(
      'Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
}

class NotificationPermissionExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {permissions: null};
  }

  render() {
    return (
      <View>
        <Button
          onPress={this._showPermissions.bind(this)}
          label="Show enabled permissions"
        />
        <Text>
          {JSON.stringify(this.state.permissions)}
        </Text>
      </View>
    );
  }

  _showPermissions() {
    PushNotificationIOS.checkPermissions((permissions) => {
      this.setState({permissions});
    });
  }
}

var styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

exports.title = 'PushNotificationIOS';
exports.description = 'Apple PushNotification and badge value';
exports.examples = [
{
  title: 'Badge Number',
  render(): React.Component {
    PushNotificationIOS.requestPermissions();

    return (
      <View>
        <Button
          onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(42)}
          label="Set app's icon badge to 42"
        />
        <Button
          onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)}
          label="Clear app's icon badge"
        />
      </View>
    );
  },
},
{
  title: 'Push Notifications',
  render(): React.Component {
    return <NotificationExample />;
  }
},
{
  title: 'Notifications Permissions',
  render(): React.Component {
    return <NotificationPermissionExample />;
  }
}];
AppRegistry.registerComponent('Buddhapp', () => Buddhapp);
