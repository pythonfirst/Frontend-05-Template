本周学习了编译原理中的LL算法，完成了简单的加减乘除的词法与语法分析，虽然对编译原理相关的知识一脸懵逼，但是在学习实现算法的过程中，接触了多个之前没了解和不熟悉的知识点，这正是学习最大的是收获。

### 正则表达式

#### exec()

此方法可以结合while循环对字符串进行遍历，patten的lastIndex属性能够巧妙的实现很多逻辑。

```javascript
let patten = /(java)|(grea)/g

let text = 'javascript is greatest program language and so it is greater than java.'

let result
while ((result = patten.exec(text)) !== null ) {
  console.log('result', result, patten.lastIndex)
}
```

[mdn RegExp.prototype.exec()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

### 递归

#### 概念

递归就是在函数中出现调用自己的语句，构成递归需要有两个条件：base case（基线条件） 和recursive case (递归条件)。base case 即递归结束条件，recursive case 即需要重复调用自身的条件。找到base case 需要边界条件测试，找到recursive case 写出递推公式即可，然后将两种case转为代码实现。

#### 优势

代码简练易懂。

#### 劣势

围绕着调用栈（理解递归一定要先理解调用栈进而去理解递归函数调用栈，推荐看图解算法递归章节）会出现三个劣势，如果数据量（n大）比较大会造成空间复杂度高、堆栈溢出（系统栈大小一定，对调用栈较多容易出现溢出）、大量函数调用耗时、重复计算（可通过缓存解决，详情看极客时间数据结构与算法之美递归章节）问题。

### EOF

通常代表着文件或者标准输入的结束，它不是一个特殊字符，而是结束时返回的一个信号值，当遇到此信号值时，代表着读取结束。

#### 参考

[阮一峰-EOF是什么](http://www.ruanyifeng.com/blog/2011/11/eof.html)

### Generator 

#### 可迭代协议

#### 迭代器协议

#### yield

[yield](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)

#### for... of

#### 序列

JavaScript中的序列指的什么，generator用于返回一个序列？

[mdn for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

[mdn Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

