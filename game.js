import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder
} from 'react-native'
import Title from './title.js';
import Chessboard from './chessboard.js';
import TileContainer from './tileContainer.js';
import Utils from './utils.js';

var key = 0;

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score:0,
      best:0,
      tiles:[]
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderRelease: (e, gestureState) => this._onPanResponderRelease(e, gestureState)
    });
    this.score = 0;
    Utils.getBest((best) => {
      this.best = best;
      this.setState({best:this.best, tiles:this._initTiles()});
    });
  }

  _onPanResponderRelease(e, gestureState) {
    var dx = gestureState.dx;
    var dy = gestureState.dy;
    var absDx = dx > 0 ? dx : -dx;
    var absDy = dy > 0 ? dy : -dy;
    var canMove = absDx > absDy ? absDx-absDy>10 : absDx-absDy<-10;
    if (canMove) {
      var direction = absDx > absDy ? (dx > 0 ? 0 : 1) : (dy > 0 ? 3 : 2);
      this._move(this.state.tiles, direction);
    }
  }

  render() {
    return(
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Title score={this.state.score} best={this.state.best}/>
        <View>
          <Chessboard/>
          <TileContainer tiles={this.state.tiles}/>
        </View>
      </View>
    );
  }

  _initTiles() {
    var tiles = [
      null,null,null,null,
      null,null,null,null,
      null,null,null,null,
      null,null,null,null
    ];
    this._randomTile(tiles, true);
    this._randomTile(tiles, true);
    return tiles;
  }

  _randomTile(tiles, first) {
    var rap = this._randomAvailablePos(tiles);
    var twoOrFour = first || Math.random() < 0.9 ? 2 : 4;
    tiles[rap] = {key:key++, value:twoOrFour};
  }

  _randomAvailablePos(tiles) {
    var ap = this._availablePos(tiles);
    var pos = Math.floor(Math.random() * ap.length);
    return ap[pos];
  }

  _availablePos(tiles) {
    var ap = [];
    for(var i = 0; i < tiles.length; i++) {
      if (!tiles[i]) {
        ap.push(i);
      }
    }
    return ap;
  }

  // 0：左移，1：右移，2:上移，3下移
  _move(tiles, direction) {
    var canMove = false;
    // 因为需要按照不同方向，从近向远开始遍历，所以先对矩阵进行变换，方便统一遍历处理
    var tempTiles = this._transform(tiles, direction);
    var n = Math.sqrt(tiles.length);
    for(var i = 0; i < n; i++) {
      for (var j = n-1; j >= 0; j--) {
        var index = i*n+j;
        var destPos = this._findDestPos(tempTiles, index);
        if (destPos >= 0) {
          canMove = true;
          if (tempTiles[destPos]) {
            // 合并
            this._mergeTo(tempTiles, index, destPos);
          } else {
            // 移动
            this._moveTo(tempTiles, index, destPos);
          }
        }
      }
    }
    // 还原矩阵
    tiles = this._recovery(tempTiles, direction);

    if (canMove) {
      this._randomTile(tiles, false);
      this._updateState(tiles);
    }
  }

  _findDestPos(tiles, srcPos) {
    var dest = -1;
    if (tiles[srcPos]) {
      var n = Math.sqrt(tiles.length);
      var row = Math.floor(srcPos / n);
      var column = srcPos % n;
      var lastIndex;
      for (var i = n-1; i > column; i--) {
        var index = row * n + i;
        if (tiles[index]) {
          lastIndex = index;
        } else {
          dest = index;
          break;
        }
      }
      if (tiles[lastIndex]
          && (tiles[lastIndex].value === tiles[srcPos].value)) {
        dest = lastIndex;
      }
    }
    return dest;
  }

  _mergeTo(tiles, fromPos, toPos) {
    var to = tiles[toPos];
    tiles[fromPos] = null;
    tiles[toPos] = {key:to.key, value:to.value * 2};
    this.score += tiles[toPos].value;
  }

  _moveTo(tiles, fromPos, toPos) {
    tiles[toPos] = tiles[fromPos];
    tiles[fromPos] = null;
  }

  _transform(tiles, direction) {
    switch (direction) {
      case 0:
        return tiles;
      case 1:
        return Utils.flipLR(tiles);
      case 2:
        return Utils.rot(tiles);
      case 3:
        return Utils.inv(tiles);
    }
  }

  _recovery(tiles, direction) {
    switch (direction) {
      case 0:
        return tiles;
      case 1:
        return Utils.flipLR(tiles);
      case 2:
        return Utils.antiRot(tiles);
      case 3:
        return Utils.inv(tiles);
    }
  }

  _updateState(tiles) {
    if (this.score > this.best) {
      this.best = this.score;
      Utils.saveBest(this.best);
    }
    this.setState({score:this.score, best:this.best, tiles:tiles});
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf8ef',
  }
});

module.exports = Container;
