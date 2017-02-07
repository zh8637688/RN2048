import {
  Dimensions,
  AsyncStorage
} from 'react-native';

const {width} = Dimensions.get('window');
const boardSize = width - 30;
const cellSize = (boardSize - 8 * 5)/4;
const keyBest = 'best';

// 矩阵左右交换
const flipLR = (matrix) => {
  var n = Math.sqrt(matrix.length);
  var newMatrix = [];
  for (var i = 0; i < n; i++) {
    for (var j = n - 1; j >= 0; j--) {
      newMatrix.push(matrix[i*n+j]);
    }
  }
  return newMatrix;
}

// 矩阵求逆
const inv = (matrix) => {
  var n = Math.sqrt(matrix.length);
  var newMatrix = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      newMatrix.push(matrix[j*n+i]);
    }
  }
  return newMatrix;
}

// 顺时针旋转
const rot = (matrix) => {
  var n = Math.sqrt(matrix.length);
  var newMatrix = [];
  for (var i = 0; i < n; i++) {
    for (var j = n-1; j >= 0; j--) {
      newMatrix.push(matrix[j*n+i]);
    }
  }
  return newMatrix;
}

// 逆时针旋转
const antiRot = (matrix) => {
  var n = Math.sqrt(matrix.length);
  var newMatrix = [];
  for (var i = n-1; i >= 0; i--) {
    for (var j = 0; j < n; j++) {
      newMatrix.push(matrix[j*n+i]);
    }
  }
  return newMatrix;
}

const saveBest = (best) => {
  AsyncStorage.setItem(keyBest, best.toString());
}

const getBest = (callback) => {
  AsyncStorage.getItem(keyBest, (error, result) => {
    if (result > 0) {
      callback(result);
    } else {
      callback(0);
    }
  });
}

module.exports = {
  boardSize:boardSize,
  cellSize:cellSize,
  flipLR:flipLR,
  inv:inv,
  rot:rot,
  antiRot:antiRot,
  saveBest:saveBest,
  getBest:getBest
}
