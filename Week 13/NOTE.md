# HTML实体定义

## 使用nbsp;(&#160)渲染空格

建议使用css中的white-space属性控制空格显示，nbsp全称为no-break-space。看似出现了空格，但是单词并没有被打断破坏了HTML语义，如：

```html
<p>hello          world</p>
 <!--和上面的有什么区别 -->
<p>hello&nbsp;&nbsp;&nbsp;world</p>
```

## &lt反转义<

# HTML语意化

## em&strong

em更多是一种语气辅助，strong表示一种重要内容，如

```html
<!-- 语意化 -->
<!-- 我吃苹果，没有吃梨或者香蕉 -->
<p>我吃了一个<em>苹果</em></p> 
<!-- 我吃了一个，不是两个或者三个 -->
<p>我吃了<em>一个</em>苹果</p> 
```

## ol & ul

当需要有序列表(y，但是还是需要将前置符号改为点的形式）

# 语法

Element: <tagname>...</tagname>

Text: text

Comment: <!-- comments -->

DocumentType: <!Document html>

ProcessingInstruction: <?a 1?>

CDATA:<![CDATA[]]>

## 字符引用

* `&#161;` => !
* `&amp;` => &
* `&lt;` => <
* `&quot;` => &quot;

# Browser API

## DOM

### Node  

#### 组成

* Element 
  * HTMLELement
    * HTMLAnchorElement
    * HTMLAppletElement
    * HTMLAreaElement
    * HTMLAudioELement
    * HTMLBaseELement
    * HTMLBodyElement
    * ...
  * SVGE lement
    * SVGAElement
    * SVGAltGllyphElement
    * ...

* Document
* CharacterDat a
* DocumentFragment
* DocumentType

#### 操作

即找到DOM树节点的操作。

* 导航类操作
  * Node导航
    * parentNode
    * childNode
    * firstChild
    * lastChild
    * nextSibling
    * previousSibling
  * Element导航
    * parentElement
    * children
    * firstElementChild
    * lastElementChild
    * nextElementSibling
    * previousElementSibling
* 修改操作
  * appendChild
  * insertBefore
  * removeChild
  * replaceChild 
* 高级操作
  * compareDocumentPosition
  * contains
  * isEqualNode
  * isSameNode (可以使用JavaScript中的`===`代替)
  * cloneNode

## Event

### Capture Mode

### Bubble Mode

## Range

### HTML Collection

#### 定义

[HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)

#### convert to array

 [most efficient way to convert an HTMLCollection to an Array](https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array)

#### 实践-翻转DOM元素

Fragment 和rang 组合使用

[DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)

#### iterator(已废弃)

## CSSOM

### document.stylesheet

#### cssRules

#### insertRule

#### removeRule

#### getComputedStyle

**CSS伪元素**无法通过DOM API 访问，可以通过CSSOM访问并修改

```javascript
getComputedStyle(document.querySelector('a'), "::before")
```

## CSSOM view

### window

#### 属性

*  window.innerWidth & window.innerHeight 

HTML文档实际渲染所包含的区域尺寸

* window.outerWidth & window.outerHeight

包含浏览器工具栏部分的尺寸

* window.devicePixelRatio(DPR)

屏幕上的物理像素与代码中px的比例

* window.screen
  * window.screen.width
  * window.screen.height
  * window.screen.availWidth
  * window.screen.availHeight

#### API

window.open('about:blank', 'blank', 'width=100, height=100, left=100, right=100')

moveTo(x,y)

moveBy(x,y)

resizeTo(x,y)

resizeBy(x,y)

### scroll

#### Element scroll

scrollTop

scrollLEft

scrollWidth

scrollHeigth

scrolll(x,y)

scrollBy(x,y)

scrollIntoView()

#### window

scrollX

scrollY

scroll(x, y)

scrollBy(x,y)

### layout

* getClientRects()
* getBoundingClientRect()

## 其他API

### 标准化组织
