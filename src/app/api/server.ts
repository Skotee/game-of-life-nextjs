import express from "express";
const app = express();
const http = require("http").createServer(app);
const sse = require("express-sse")();

app.use("/sse", sse);
