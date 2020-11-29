/**
 * find a
 * @param {待匹配的字符串} str 
 */
function matcha(str) {
  for (let c of str) {
    if (c === 'a') {
      return true
    }
  }
  return false
}

// console.log(matcha('apple'))

/**
 * find ab
 * @param {待匹配的字符串} str 
 */
function matchab(str) {
  let aStatus = false
  for (let c of str) {
    if (c === 'a') {
      aStatus = true
    } else if (c === 'b' && aStatus) {
      return true
    } else {
      aStatus = false
    }
  }
  return false
}

// console.log(matchab('appalbe'))

/**
 * find abcdef
 * @param {待匹配的字符串} str 
 */
function matchabcdef(str) {
  let aStatus = false
  let bStatus = false
  let cStatus = false
  let dStatus = false
  let eStatus = false
  let fStatus = false
  for (let c of str) {
    if (c === 'a') {
      aStatus = true
    } else if (c === 'b' && aStatus) {
      bStatus = true
    } else if (c === 'c' && bStatus) {
      cStatus = true
    } else if (c === 'd' && cStatus) {
      dStatus = true
    } else if (c === 'e' && dStatus) {
      eStatus = true
    } else if (c === 'f' && eStatus) {
      return true
    } else {
      aStatus = false
      bStatus = false
      cStatus = false
      dStatus = false
      eStatus = false
      fStatus = false
    }
  }
  return false
}

console.log(matchabcdef('appalbabcdefe'))

