"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.use("/api", router_1.default);
mongoose_1.default
    .connect("mongodb://0.0.0.0:27017/books", {})
    .then(function () {
    console.log("Connected to MongoDB");
    app.listen(port, function () {
        console.log("Server listening on port ".concat(port));
    });
})
    .catch(function (err) {
    console.error("Error connecting to MongoDB:", err);
});
