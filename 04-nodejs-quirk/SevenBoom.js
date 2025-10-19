function sevenBoom(arr) {
  for (let num of arr) {
    if (num.toString().includes('7')) {
      return "Boom!";
    }
  }
  return "there is no 7 in the array";
}

// Ejemplos:
console.log(sevenBoom([1, 2, 3]));              // "there is no 7 in the array"
console.log(sevenBoom([7, 1, 2]));              // "Boom!"
console.log(sevenBoom([12, 45, 78]));           // "Boom!"
console.log(sevenBoom([10, 20, 30]));           // "there is no 7 in the array"
