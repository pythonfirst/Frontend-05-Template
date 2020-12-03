

本周学习了有限状态机基础及其在解析http请求中的数据的应用。大概了解了浏览器中的数据请求是如何工作的。

# 浏览器显示网页的过程

# 有限状态机

## Moore状态机

## Mealy 状态机

# 如何在vscode中调试nodejs代码

[使用 VS Code 调试 Node.js 的超简单方法](https://juejin.cn/post/6844903838000873486)

# 通过node 的http模块写一个简易的server

```javascript
const http = require("http");
http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", (error) => console.log(error))
      .on("data", (chunk) => {
        console.log("chunk:", chunk);
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        console.log("body:", body);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("Hello Node\n");
      });
  })
  .listen(8088);
console.log("Server running at http://127.0.0.1:8088/");

```

# http协议

http协议属于文本型协议(所有数据都会转成字符串)。

## request

1. request line 包括 method(POST)，path(/)， protocol version(协议版本)

示例： POST / HTTP/1.1

2. Header

Key value组成的不固定行数数据结构。其中Content-Type为必要字段。

3. body

由content-type决定具体结构，也是key value结构。HTTP协议规定\r \n组成换行符。

## response

1. Response line 

由protocal和状态码构成，示例：`HTTP/1.1 200ok`

2. Response Header

格式与request header相同

3. Response body

由Content-Type决定body结构。chunked body 由16进制数字➕一行内容循环构成，知道遇到一行为0的数字。

# 其它

## IIFE写法

### void

```javascript
void async function() {
  let request = new Request({
    method: 'POSt',
    host: '127.0.0.1',
    port: '8080',
    path: '/',
    headers: {
      ['X-Foo2']: 'customed'
    },
    body: {
      name: 'zhao'
    }
  })

  let response = await request.send()

  console.log(response)
}()
```

### 小括号

```javascript
(async function() {
  let request = new Request({
    method: 'POSt',
    host: '127.0.0.1',
    port: '8080',
    path: '/',
    headers: {
      ['X-Foo2']: 'customed'
    },
    body: {
      name: 'zhao'
    }
  })

  let response = await request.send()

  console.log(response)
})()
```

## 模版字面的坑

在使用模版字面量构建request时，注意模版里的\n符号的隐藏存在。

### 示例

以下两种写法表达的最终字符串相同，都包括\r\n，不过在使用模版字面量的时候，显性的换行(在编辑器内的换行，如写法2)会默认输出到最终字符串，而不需要再单独添加`\n`,

#### 写法1

```javascript
toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`
  
```

#### 写法2

```javascript
toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((key) => `${key}: ${this.headers[key]}`)
  .join("\r\n")}\r
\r
${this.bodyText}`;
  }
```

#### 参考

[What is a /r" and why would one use it with a \n?](https://stackoverflow.com/questions/10282314/what-is-a-r-and-why-would-one-use-it-with-a-n)

## 16进制字符串处理

给定一个16进制字符串如('ddf6')，将其处理为10进制数。

## 示例

```javascript
let str = 'f6'
let num = 0
for (let c of str) {
  num *= 16
  num += parseInt(c, 16)
}
```

## gitignore不生效问题解决

如果已经在仓库中提交过的文件，现在需要通过忽略的，只在 .gitignore中添加相关pattern是无效的。需要将git缓存清除再提交一次commit。

```Git
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```
