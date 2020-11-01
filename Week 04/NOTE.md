本周学习了一种数据结构trie树和两种算法kmp和wildcard，其中kmp用了很长的时间去理解，也找了很多其它相关资料。wildcard算法相对容易理解，但是在代码实现中也有很多技巧值得学习。

# KMP

## 参考资料

1. [知乎大神介绍KMP](如何更好地理解和掌握 KMP 算法? - 海纳的回答 - 知乎 https://www.zhihu.com/question/21923021/answer/281346746)
2. [阮一峰介绍KMP](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)
3. [jBoxer介绍KMP的理解](http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/)

# Map数据结构

# Object.create(null)

为什么要用Object.create(null)来创建一个新的空对象，而不是直接用对象字面量，如：

```javascript
// 以下两者有什么区别
let obj = Object.create(null)
let obj = {}
```

在Vuejs的源码中也有很多此种用法，核心目的还是让对象更加干净，不被原型污染。

## 参考

[详解Object.create(null)](https://juejin.im/post/6844903589815517192)

# Symbol

```JavaScript
let $ = Symbol('$') // 有什么作用

作为对象属性时，不会被for...in 和for... of 遍历。
```

## TODO

需要es6标准教程查看全部symbol特性。

# 生成随机字母

```javascript
 /*
  生成指定长度随机字符串
  */
  function generateRandomString(length) {
    let word = ""
    for (let i=0; i<length; i++) {
      word += String.fromCharCode(Math.random()*26 + 'a'.charCodeAt(0))
    }
    return word
  }
```



## String.fromCharCode()

## Sting.charcodeAt()

```javascript
function generateRandomString(length) {
        let word = ""
        for (let i=0; i<length; i++) {
          word += String.fromCharCode(Math.random()*26 + 'a'.charCodeAt(0))
        }
        return word
      }
```

# for ... in && for ... of

# Array.prototype.fill()

用于填充数组默认值

# ++j && j++

# {}

可以将部分代码逻辑放到{}中，结合let const 局部话变量。

# new RegExp()

需要运行时动态生成正则表达式时，需要用到此构造函数。