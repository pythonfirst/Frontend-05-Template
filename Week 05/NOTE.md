这周学习里重要的知识点proxy，通过proxy实现了最基础的响应式原理。另外做了个基础的拖拽，学习了range API（还没完全明白）。

 # proxy

## 概念

一个对target对象进行包装的对象，可以自定义函数默认操作的行为如：get、set等等。

## 与setter和getter的关系

## 应用

### 无操作转发代理

```javascript
let target = {};
let p = new Proxy(target, {});
p.a = 37;   // 操作转发到目标
console.log(target.a);    // 37. 操作已经被正确地转发
```

### 验证(validator)

```javascript
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') { 
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 150) {
        throw TypeError('The age seems invalid')
      }
      obj[prop] = value
    }
  }
}

let person = new Proxy({}, validator)
person.age = 100;

console.log(person.age); 
// 100

person.age = 'young'; 
// 抛出异常: Uncaught TypeError: The age is not an integer

person.age = 300; 
// 抛出异常: Uncaught RangeError: The age seems invalid
```

### DOM节点操作

此示例中的oldval缓存方法值得借鉴。

```javascript
let view = new Proxy({
  selected: null
}, {
  set: function(obj, prop, newval) {
    let oldval = obj[prop];  // 缓存了oldval

    if (prop === 'selected') {
      if (oldval) {
        oldval.setAttribute('aria-selected', 'false');
      }
      if (newval) {
        newval.setAttribute('aria-selected', 'true');
      }
    }

    // 默认行为是存储被传入 setter 函数的属性值
    obj[prop] = newval;

    // 表示操作成功
    return true;
  }
});

let i1 = view.selected = document.getElementById('item-1');
console.log(i1.getAttribute('aria-selected')); // 'true'

let i2 = view.selected = document.getElementById('item-2');
console.log(i1.getAttribute('aria-selected')); // 'false'
console.log(i2.getAttribute('aria-selected')); // 'true'
```

## 劣势

可预见性会降低

# 钩子(hook)

 # Map & Set

## Map

类ojbect数据结构，相比Object主要有以下几点不同：

1. 可以将**任何数据类型作为key值**，包括对象，数组，函数，NaN等等，对象则只能以字符串为key值。
2. key值与内存地址绑定，内存地址不同，则视为不同的key，内存地址相同则视为同一个key，如：

```javascript
const k1 = {}
const k2 = {}
const k3 = k1

const m1 = new Map()
  .set(k1, 1)
  .set(k2, 2)
  .set(k3, 3)

m1.get(k1) // 3  // 说明k3是对k1的引用，所以视为同一个key，但是两个都可以通过get获取
m1.get(k3) // 3 
```



1. Map可以遍历，**遍历时按照元素插入顺序遍历**，对象遍历只能靠Object.prototype.keys()方法，且元素顺序随机。
2. 方法可以链式调用（所有方法返回该数据map)。

## Set

### 概念

类数组数据结构，相比Array主要有几下几点不同

1. 元素不能重复，按照 "Same-value equality"(类似于===)进行比较，但是NaN === NaN。（===比较则NaN 则不同，按照数据的内存地址进行比较，如果引用类型则为同一个值，如果两个对象（对象间引用）指向同一个内存则视为一个值。）

### 实践

#### 实现并集、差集、交集

```javascript
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

let union = new Set([...a, ...b])  // 并集

let instersect = new Set([...a].filter((item) => b.has(item)))  // 交集

let diff = new Set([...a].filter(item => !b.has(item)))  // 差集
```

## TODO

```javascript
const m = new Map([
  ['F', 'no'],
  ['T', 'yes']
])
// 箭头函数传参写法出自何处？[k, v]
t = new Map([...m].filter(([k, v]) => {
  console.log('k', k)
  return k === 'F'
}))
```

# range

## TODO: 

1. DOMAPI的range虽然跟着课程可以做出来拖拽的效果，但是还使不清楚range具体是什么，在脑子里形不成具象。
2. DOM中的一些事件还是不很熟悉，如本周遇到的selectstart事件。
3. CSSOM完全不了解，需要不断补充上。

# 遇到的坑

1. for...of 循环中最好要用let声明变量，如忽略let则会默认为var，使变量为全局变量，如有重复变量则会造成报错.

```javascript
let effect = function(callback) {
  usdReactivities = []
  callback()

  // 判断当前reactive的callback是否已经注册 =>winter老师思路更简洁
  for (reactive of usdReactivities) {
    // 如果obj属性不存在，则新创建一个
    if (!callbacks.get(reactive[0])) {
      callbacks.set(reactive[0], new Map())
    }
    // 如果prop不存在，则新创建一个
    if (!callbacks.get(reactive[0]).get(reactive[1])) {
      callbacks.get(reactive[0]).set(reactive[1], [])
    }
    // 统一对callback进行push
    callbacks.get(reactive[0]).get(reactive[1]).push(callback)
  }
  }

let reactive = function(obj) {
  if (reactivities.get(obj)) {
    return reactivities.get(obj)
  }

  let proxy = new Proxy(obj, {
    get: function(obj, prop) {
      // console.log(obj, prop)
      usdReactivities.push([obj, prop])
      // 支持嵌套的obj
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop]);  // reative函数名与上面for循环重名，导致reative为全局变量会被重写，运行时导致reative报错：reative非函数。
      }
      return obj[prop]
    },
    set: function(obj, prop, value) {
      console.log(obj, prop, value)
      obj[prop] = value
      if (callbacks.get(obj) && callbacks.get(obj).get(prop)) {
        callbacks.get(obj).get(prop).forEach(callback => callback())
      }
      return obj[prop]
    }
  })
  
  
```