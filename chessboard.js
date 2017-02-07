import React from 'react';
import {
  View
} from 'react-native';
import Utils from './utils.js';

const styles = {
  container:{
    width:Utils.boardSize,
    height:Utils.boardSize,
    borderRadius:5,
    paddingHorizontal:4,
    paddingVertical:4,
    backgroundColor:'#bbada0'
  },
  row:{
    flexDirection:'row'
  },
  cell:{
    width:Utils.cellSize,
    height:Utils.cellSize,
    marginHorizontal:4,
    marginVertical:4,
    borderRadius:5,
    backgroundColor:'#eee4da89'
  }
}

Chessboard = () => {
  return(
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
        <View style={styles.cell}/>
      </View>
    </View>
  );
}

export default Chessboard
