/**
 * 基于PMT的FST
 * 重点是基于PMT的变种next数组生成状态表
 * @param {待搜索字符串} str 
 * @param {模式字符串} pattern 
 */
function match(str, pattern) {
  let stateTable = generateStateTable(pattern)
  let state = stateTable[0]
  for (let c of str) {
    state = state(c)
  }

  return state === end
}

/**
 * 根据模式字符串生成状态表
 * @param {模式字符串} pattern 
 */
function generateStateTable(pattern) {
  let table = new Array(pattern.length)
  let nextTable = next(pattern)
  for (let i=0; i<pattern.length; i++) {
    table[i] = function(c) {
      if (c === pattern[i]) {
        return i === pattern.length-1 ? end : table[i+1]
      } else {
        if (i === 0) {
          return table[0]
        } else {
          return table[nextTable[i]](c)  // 添加c参数传过去避免当前c被吃掉
        }
      }
    }
  }
  return table
}

/**
 * 终止状态
 * @param {待检测字符} c 
 */
function end(c) {
  return end
}

/**
 * 根据模式字符串生成next数组
 * @param {模式字符串} pattern 
 */
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

console.log(match('babawejfaabababca', 'abababca'))
console.log(match('aaaa', 'bba'))
console.log(match('aa aa', ''))

