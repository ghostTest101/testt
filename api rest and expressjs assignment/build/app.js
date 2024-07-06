"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var handler_1 = require("./handler");
var app = (0, express_1.default)();
var PORT = 5000;
app.use(express_1.default.json());
app.listen(PORT, function () {
    console.log("Server is up and running on ".concat(PORT, " ..."));
});
app.post("/user/generateToken", handler_1.generateToken);
// Verification of JWT
app.get("/user", handler_1.getUser);
// Verification of JWT
app.get("/users", handler_1.getUser);
// Verification of JWT
app.post("/register", handler_1.getUser);
