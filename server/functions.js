// Remove random letters
module.exports = function removeLetter(str, errorNumber) {
  for (var i = 0; i < errorNumber * 2; i++) {
    str = removeRandomLetter(str)
  }
  function removeRandomLetter(str) {
    var pos = Math.floor(Math.random() * str.length)
    return str.substring(0, pos) + str.substring(pos + 1)
  }
  return str
}

// Swap near characters
module.exports = function swapLetter(str) {
  let list = str.split('')
  const i = Math.floor(Math.random() * list.length - 1)
  const b = list[i]
  list[i] = list[i + 1]
  list[i + 1] = b

  return list.join('')
}
