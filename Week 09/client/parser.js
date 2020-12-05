const EOF = Symbol('EOF')

let currentToken = null
let currentAttribute = null
let stack = [{tokenType: 'document', children: []}]
function emit(token) {
  console.log(token)
  let top = stack[stack.length-1]
  // 判断是否为开始标签
  if (token.tokenType === 'startTag') {
    let element = {
      children: []
    }

    for (let p in token) {
      if (p !== 'type') {
        element[p] = token[p]
      }
    }

    if (!token.isSelfClosing) {
      stack.push(element)
    }

    top.children.push(element)
    element.parent = top
  } else if (token.tokenType === 'endTag') {
    if (token.name === top.name) {  // 结束标签与top标签配对，则出栈
      stack.pop()
    }
  }
}
// 开始状态
function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    emit({
      tokenType: 'EOF'
    })
    return
  } else {
    // 文本节点处理
    emit({
      tokenType: 'text',
      cotent: c
    })
    return data
  }
}

// 标签开始
function tagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      tokenType: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === '/') {
    return endTagOpen
  } else if (c === EOF) {
    console.log('EOF-before-tag-name parse error')
    return
  } else {
    console.log('invalid-first-character-of-tag-name parse error')
    return
  }
}

// 结束标签
function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      tokenType: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === '>') {
    console.log('missing-end-tag-name parse error')
  } else if (c === EOF) {
    console.log('EOF-before-tag-name parse error')
  } else {
    console.log('invalid-first-character-of-tag-name parse error')
  }
}

// 标签名
function tagName(c) {
  if (c.match(/^[A-Z]$/)) {
    currentToken.tagName += c.toLowerCase()
    return tagName
  }
  else if (c === '>') {
    // 标签结束
    emit(currentToken)
    return data
  } else if (c.match(/^[\t\n\f ]$/)) {
    // 属性处理
    return beforeAttributeName
  } else if (c === '/') {
    // 自闭和标签 <input />
    return selfClosingStartTag
  } else if (c === EOF) {
    console.log('EOF-in-tag parse error')
  } else {
    currentToken.tagName += c
    return tagName
  }
}

// 自闭合标签
function selfClosingStartTag(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  } else if (c === EOF) {
    console.log('eof-in-tag error')
  } else {
    console.log('unspected-solidus-in-tag parse error')
  }
}

// 属性名开始
function beforeAttributeName(c) {
  if (c === '/' || c === '>' || c === EOF) {
    // 自封闭标签？
    return afterAttributeName(c)
  } else if (c.match(/^[\n\f\t ]$/)) {
    return beforeAttributeName
  } else if (c === '=') {
    console.log('unexpected-equals-sign-before-attribute-name parse error')
  } else {
    // 字符
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}


/**
 * <div class="c"></div>
 * <input type="number" />
 * <input type='number" />
 * @param {*} c 
 */
function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c ==='EOF') {
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '\u0000') { // Null
    console.log('unexpected-null-character parse error')
  } else if (c.match(/^[A-Z]$/)) {
    currentAttribute.name +=c
    return attributeName
  } else {
    currentAttribute.name +=c
    return attributeName
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\r\n\f ]$/)) {
    // ignore
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    // 这个情况什么时候可以出现
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {
    console.log('eof-in-tag parse error')
    emit({
      tokenType: 'EOF'
    })
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\r\n\f ]$/)) { // ignore whitespace
    return beforeAttributeValue
  } else if (c === '"') {
    return doubleQuoteAttributeValue
  } else if (c === '\'') {
    return singleQuoteAttributeValue
  } else if (c === '>') {
    console.log('missing-attribute-value parse error')
  } else {
    return unquoteAttributeValue(c)
  }
}

// 双引号属性值
function doubleQuoteAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterAttributeValue
  } else if (c === '\u0000') {
    console.log('unexpected-null-character parse error')
  } else if (c === EOF) {  //不懂什么逻辑
    console.log('eof-in-tag parse error')
  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}

// 单引号属性值
function singleQuoteAttributeValue(c) {
  if (c === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterAttributeValue
  } else if (c === '\u0000') {
    console.log('unexpected-null-character parse error')
  } else if (c === EOF) {  //不懂什么逻辑
    console.log('eof-in-tag parse error')
  } else {
    currentAttribute.value += c
    return singleQuoteAttributeValue
  }
}

// 无引号属性值
function unquoteAttributeValue(c) {
  if (c.match(/^[\r\n\f ]$/)) { //<input type=number />
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (c === '/') {  // <input type=number/>
    currentToken[currentAttribute.name] = currentAttribute.value 
    return selfClosingStartTag
  } else if (c === '>') {  // <div class="model">
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === '\u0000') { // 不知道什么逻辑
    console.log('unexpected-null-character parse error')
  } else if (c === '"' || c === '\'' || c === '<' || c === '=' || c === '`') { // 不懂什么逻辑
    console.log('unexpected-character-in-unquoted-attribute-value parse error')
  } else if (c === EOF) {  //不懂什么逻辑
    console.log('eof-in-tag parse error')
  } else {
    currentAttribute.value += c
    return unquoteAttributeValue
  }
}

function afterAttributeValue(c) {
  if (c.match(/^[\r\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else if (c === EOF) {
    console.log('EOF-in-tag parser error')
  } else {
    console.log('missing-whitespace-between-attibutes parser error')
    return beforeAttributeName
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data
  console.log('html', html)
  for (let c of html) {
    state = state(c)
  }
  console.log('stack', stack)
  state = state(EOF)
}