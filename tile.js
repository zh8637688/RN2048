import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Utils from './utils.js';

const size = Utils.cellSize;
const margin = 8;

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    width:Utils.cellSize,
    height:Utils.cellSize,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontSize: 28,
    color: '#776E65',
  },
  tile2: {
    backgroundColor: '#eee4da',
  },
  tile4: {
    backgroundColor: '#eee1c9',
  },
  tile8: {
    backgroundColor: '#f3b27a',
  },
  tile8Text: {
    color: '#f9f6f2',
  },
  tile16: {
    backgroundColor: '#f69664',
  },
  tile16Text: {
    color: '#f9f6f2',
  },
  tile32: {
    backgroundColor: '#f77c5f',
  },
  tile32Text: {
    color: '#f9f6f2',
  },
  tile64: {
    backgroundColor: '#f75f3b',
  },
  tile64Text: {
    color: '#f9f6f2',
  },
  tile128: {
    backgroundColor: '#edd073',
  },
  tile128Text: {
    color: '#f9f6f2',
    fontSize: 26
  },
  tile256: {
    backgroundColor: '#edcc62',
  },
  tile256Text: {
    color: '#f9f6f2',
    fontSize: 24
  },
  tile512: {
    backgroundColor: '#edc950',
  },
  tile512Text: {
    color: '#f9f6f2',
    fontSize:24
  },
  tile1024: {
    backgroundColor: '#edc53f',
  },
  tile1024Text: {
    color: '#f9f6f2',
    fontSize: 22
  },
  tile2048: {
    backgroundColor: '#edc22e',
  },
  tile2048Text: {
    color: '#f9f6f2',
    fontSize: 22
  }
})

const Tile = (props) => {
  var pos = {
    left:props.pos % 4 * (size + margin) + margin,
    top:Math.floor(props.pos/4) * (size + margin) + margin
  };
  var bc = styles['tile'+props.value];
  var text = styles['tile'+props.value+'Text'];
  return(
    <View style={[styles.container, pos, bc]}>
      <Text style={[styles.text, text]}>
        {props.value}
      </Text>
    </View>
  );
}

export default Tile;
