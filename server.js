const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  let contentType = "";

  if (filePath === "./") {
    filePath = "./index.html";
    contentType = "text/html";
  } else if (filePath.endsWith(".js")) {
    contentType = "text/javascript";
  } else if (filePath.endsWith(".css")) {
    contentType = "text/css";
  } else {
    filePath = "./index.html";
    contentType = "text/html";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found, ERROR 404");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      res.end();
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
