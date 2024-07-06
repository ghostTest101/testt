"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.register = exports.getUser = exports.generateToken = void 0;
var mockdata_1 = require("./mockdata");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtSecretKey = "secret";
var generateToken = function (req, res) {
    var userExists = mockdata_1.hashedPasswords.find(function (ele) { return req.body.name === ele.name && req.body.pass === ele.pass; });
    if (userExists) {
        return res.send(jsonwebtoken_1.default.sign({ id: userExists.id }, jwtSecretKey));
    }
    // Access Denied
    return res.status(401).send({ message: "Invalid Credential" });
};
exports.generateToken = generateToken;
var getUser = function (req, res) {
    try {
        var token = req.header("authorization");
        var verified_1 = jsonwebtoken_1.default.verify(token, jwtSecretKey);
        if (verified_1) {
            var userdata = mockdata_1.dataSet.find(function (ele) { return verified_1.id === ele.id; });
            return res.send(userdata);
        }
        else {
            // Access Denied
            return res.status(401).send(Error);
        }
    }
    catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
};
exports.getUser = getUser;
var register = function (req, res) {
    try {
        var user = {
            id: Math.floor(Math.random() * 1000).toString(),
            name: req.body.name,
            pass: req.body.pass,
            email: req.body.email,
        };
        mockdata_1.dataSet.push(user);
        return res.send({ message: "User registered successfully" });
    }
    catch (error) {
        return res.status(400).send(error);
    }
};
exports.register = register;
var getAllUser = function (req, res) {
    try {
        var token = req.header("authorization");
        var verified = jsonwebtoken_1.default.verify(token, jwtSecretKey);
        if (verified) {
            var userdata = mockdata_1.dataSet.map(function (ele) { return ele.name; });
            return res.send(userdata);
        }
        else {
            // Access Denied
            return res.status(401).send(Error);
        }
    }
    catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
};
exports.getAllUser = getAllUser;
