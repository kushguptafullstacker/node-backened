const fs = require("fs");
const http = require('http');
const path = require("path");

const port = 4000;

const fileserver = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    const extname = String(path.extname(filePath).toLowerCase());

    const mimeType = {
        ".html": "text/html",
        ".css": "text/css"
    };

    const contentType = mimeType[extname] || "application/octet-stream";

    fs.readFile(filePath, "utf8", (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { "content-type": "text/html" });
                res.end("<h1>404 - File not found</h1>");
            } else {
                res.writeHead(500, { "content-type": "text/html" });
                res.end("<h1>500 - Server error</h1>");
            }
        } else {
            res.writeHead(200, { "content-type": contentType });
            res.end(content, "utf8");
        }
    });
});

fileserver.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
