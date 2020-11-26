function next(pattern) {
  let next = new Array(pattern.length).fill(0)
  next[0] = -1
  let i=1;
  let j=0;
  while (i<pattern.length-1) {
    if (pattern[i] === pattern[j] || j === -1){
      i++
      j++
      next[i] = j // j++之后的结果
    } else {
      j = next[j] // 比较难的理解点
    }
  }

  return next
}

function kmp(pattern, str) {
  let j = 0
  let i = 0
  while(i< str.length) {
    if (str[i] !== pattern[j] && j !== -1) {
      j = next(pattern)[j]
    } else {
      j++
      i++
    }
  }

  // 返回查询结果
  if (j === pattern.length) {
    return i-j
  } else {
    return -1
  }
}

console.log(next('abababca'))
console.log(next('abababzabababa'))
console.log(next('abcabd'))
console.log(kmp('abababc', 'abababababc'))
console.log(kmp('abcdfe', 'abcdabcdf'))
