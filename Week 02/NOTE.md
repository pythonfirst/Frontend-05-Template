本周跟着做了一个地图编辑器，并完成了对已知两点（起点、终点）路径的寻找。其中新增的知识点有**队列&栈数据结构**、**广度优先搜索**、**深度优先搜索**、**A*算法**、**ES6 class**、**ASI机制**等等。

### 栈vs队列

栈的定义为先进后出，后进先出，在JavaScript里用array实现方法如下：

```javascript
let stack = []
stack.push(item) // 进栈
stack.pop()  // 出栈

// 或者
stack.unshift(item)  // 进栈
stack.shift(item)  // 出栈
```

队列的定义为先进先出，后进后出，在JavaScript里用array实现方法如下：

```javascript
let queue = [start]
queue.push() // 队列进
queue.shift() // 队列出
// 或者
queue.unshift()  // 队列进
queue.pop() // 队列出
```

### 广度优先搜索vs深度优先搜索

#### 广度优先搜索

广度优先搜索(Breadth-First-Search)，即从树的根节点(或者起点)开始遍历，优先查找节点周围的最近节点及次近节点，直到找到目标节点。

深度优先搜索(Depth-First-Search)，即从树的根节点(或者起点)开始遍历，顺着根节点查下一级节点，直到此分叉找到目标节点或者无下一级节点可走，则返回根节点走另外的分叉。

### ASI机制

#### 概念

ASI(Automatic Semicolon Insertion)即自动分号补全，JavaScript一些语句必须要用分号结尾，所以有些语句就会受到ASI机制影响。想要理解ASI机制，需要对[JavaScript词法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar)有个全面的了解，包括行终止符，restricted productions等等。mdn中提到的三个规则还不能完全理解，但是作为坚持不写分号的同学需要记住这几种情况就可以了：

> **真正会导致上下行解析出问题的 token 有 5 个：括号，方括号，正则开头的斜杠，加号，减号。**我还从没见过实际代码中用正则、加号、减号作为行首的情况，所以总结下来就是一句话：**一行开头是括号或者方括号的时候加上分号就可以了，其他时候全部不需要。**

#### 示例

下面这段代码`[x, y] = table[y*100 + x] `这行总是被跳过执行，就是因为中括号前面一定要要有分号，不然解析token会出现错误，导致无法正确执行。

```javascript
 // 如果找到end点则结束
  if (x === end[0] && y === end[1]) {
    let paths = []
    while (x != start[0] || y != start[1]) {
      // if (paths.length === 3) break
      paths.push(map[y*100 + x])

      await sleep(50)  // 此行前面一定要有分号
      [x, y] = table[y*100 + x]  // 这里解构赋值为什么会出现问题 因为asi的机制这里要加上分号
      container.children[y*100 + x].style.backgroundColor = 'purple'
    }
    return paths
  }

```

#### 参考

[asi详解](https://segmentfault.com/a/1190000004548664)

[尤大何时总结何时必须要有分号](JavaScript 语句后应该加分号么？ - 尤雨溪的回答 - 知乎 https://www.zhihu.com/question/20298345/answer/49551142)

[路人遇到的坑](http://objcer.com/2017/10/13/hacking-semicolons/)

### ES6 class

之前没有用过ES6的class语法，这次实现了一次，代码看起来的更加整洁。基础语法请看[阮老师的教程。](https://es6.ruanyifeng.com/#docs/class)


### 深拷贝&浅拷贝

在构建Sort数据结构时，对传入的参数data使用slice方法进行了一次浅拷贝，这里不明白为什么需要拷贝，而不是直接用data？到现在也还没有明白。不过对于JavaScript中的深拷贝浅拷贝也没有理解，这点基础知识需要补上。

#### 参考资料

[掘金-深拷贝&浅拷贝](https://juejin.im/post/6844903493925371917)


