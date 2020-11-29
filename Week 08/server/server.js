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
