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

# http协议的格式

## request

## response

