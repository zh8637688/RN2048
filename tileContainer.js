import React,{Component} from 'react';
import {
  View,
  LayoutAnimation,
  StyleSheet
} from 'react-native';
import {UIManager} from 'NativeModules';
import Tile from './tile.js';
import Utils from './utils.js';

class TileContainer extends Component {

  componentWillMount() {
    // ensure LayoutAnimation running on Android Platform
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillReceiveProps(nextProps) {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    var tiles = this.props.tiles ? this.props.tiles : [];
    return(
      <View style={styles.container}>
        {tiles.map((tile, index) => {
          if(tile) {
            // 确保每个item都有一个始终一致的唯一的key
            return <Tile pos={index} value={tile.value} key={tile.key}/>;
          }
        })}
      </View>
    );
  }
}

const styles = {
  container:{
    position:'absolute',
    width:Utils.boardSize,
    height:Utils.boardSize
  }
}

module.exports = TileContainer;
