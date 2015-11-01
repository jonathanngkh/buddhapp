'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
  } = React;

var anattaTab = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Anatta</Text>
        </View>
        <View style={styles.content}>
          <Text>
            Anatta tab content goes here!
          </Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 60,
    backgroundColor: '#FF0066',
    alignItems: 'center',
    paddingTop: 25,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

module.exports = anattaTab;