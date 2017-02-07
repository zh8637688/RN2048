import React from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';

const {width} = Dimensions.get('window');
const titleSize = (width - 30) / 3;

const styles = {
  container:{
    width:width,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    paddingHorizontal:15,
    paddingBottom:30
  },
  titleContainer:{
    width:titleSize,
    height:titleSize,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#e6c642',
    borderRadius:5
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    color:'#fbfdfb',
  },
  scoreContainer:{
    width:titleSize - 20,
    paddingVertical:10,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#b9ada2',
    borderRadius:5
  },
  scoreTitle:{
    marginBottom:4,
    fontSize:16,
    fontWeight:'bold',
    color:'#f0e9db'
  },
  score:{
    fontSize:18,
    fontWeight:'bold',
    color:'#fbfdfb'
  },
  hint:{
    fontSize:14,
    fontWeight:'bold',
    color:'#736d64',
    position:'absolute',
    left:titleSize + 38,
    bottom:43
  }
}

Title = (props) => {
  return(
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          2048
        </Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>
          SCORE
        </Text>
        <Text style={styles.score}>
          {props.score}
        </Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>
          BEST
        </Text>
        <Text style={styles.score}>
          {props.best}
        </Text>
      </View>
      <Text style={styles.hint}>
        Join numbers to reach 2048.
      </Text>
    </View>
  )
}

export default Title;
