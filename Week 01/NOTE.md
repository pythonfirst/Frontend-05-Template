# week1 学习笔记

##### TicTacToe

通过跟着winter老师做三子棋的游戏，学习到很多知识，如下所示：

1. chrome调试代码添加断点功能。

Chrome devtools 里边 Sources选项，在需要加断点的行前点击添加断点，右侧即可单步执行代码，并可以看到局部作用域、全局作用域的相关变量以及this指向。

![image-20201001220136221](/Users/canxiangzhao/Library/Application Support/typora-user-images/image-20201001220136221.png)

2. alert阻塞渲染问题

move函数中，即使先执行show函数，后执行alert函数，实际效果依然是必须处理完alert页面才重新渲染，但是代码其实已经执行。

自己尝试找找到的解决方法是：将alet函数放到setTimeout()中延迟10微妙？。

3. 数组克隆的两种方法

```javascript
JSON.parse(JSON.stringfy())
Object.creat() // 能够节省内存空间，提交程序执行效率
```

##### 红绿灯

通过红绿灯小练习学习了JavaScript异步编程实现的方法：callback、promise、async。这些之前已经掌握，通过和winter老师敲一边印象更加深刻了。

另外学习了generator函数，这个在工作中还没有用过，跟着winter老师的讲解，也算是明白了它的基础用法。

学习笔记