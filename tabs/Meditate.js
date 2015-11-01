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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Meditate</Text>
        </View>
        <View style={styles.content}>
          <Text>
            Meditate tab content goes here!
          </Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 50,
    backgroundColor: '#FF0066',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

module.exports = meditateTab;