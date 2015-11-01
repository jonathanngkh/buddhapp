'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
  } = React;

var meditateTab = React.createClass({
  render: function() {
    return (
      <View style={ styles.container }>
        <Text>
          Meditate tab!
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

module.exports = meditateTab;