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
} = React;

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

  statistics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  displayName: 'Buddhapp',

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

  render: function() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#FF60A6">

        <TabBarIOS.Item
          title="Meditate"
          icon={require('image!fire')}
          selected={this.state.selectedTab === 'meditateTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'meditateTab',
            });
          }}>
          {this._renderContent('white', 'Meditate')}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Kalyanamitra"
          icon={require('image!sun')}
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'kalyanamitraTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'kalyanamitraTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('white', 'Kalyanamitra Tab', this.state.notifCount)}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon={require('image!zen')}
          title="Anatta"
          selected={this.state.selectedTab === 'anattaTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'anattaTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('white', 'Anatta Tab', this.state.presses)}
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
