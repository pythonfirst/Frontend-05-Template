本周最大的收获很大，学习了JavaScript更高级的知识，像类型转换中的装箱操作和拆箱操作、不属于JavaScript语言本身的事件循环以及意外的收获包括：JavaScript中的错误机制

# 将number转为string

## parseInt

### 参考

[parseInt-mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

## Object.prototype.toString()

[toString-mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

# 位运算

## 参考

[位运算符在JS中的妙用](https://juejin.im/post/6844903568906911752)

[按位操作符-mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

# 装箱操作&拆箱操作

# JS结构化

## 宏任物&微任务

宏任物是传递给JavaScript引擎(传给引擎是一段JavaScript代码)的任务，微任务(只有promise会产生微任务)为引擎内部的任务。

## 事件循环(event loop)

# JavaScript错误机制

```javascript
/**
 * try catch 只能捕获运行时错误
 * const a 属于语法错误，直接在运行前被浏览器抛出
 * 语法错误通过window.error捕获。
 */
var a = 1
try {
  a = 2
  const a
} catch (err) {
  console.log('err', err)
}
```

[JavaScript之错误异常探讨](https://segmentfault.com/a/1190000018757095)

# 作用域链 & 闭包

## Realms

[理解ES2018中的Realms](https://juejin.cn/post/6850418121010839560)

[how-to-understand-js-realms](https://stackoverflow.com/questions/49832187/how-to-understand-js-realms)

[realms可视化](https://levi-16.github.io/GeekUniversity-fe-homework-preview/preview02/realm.html)

