"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handler_1 = require("./handler");
var mockdata_1 = require("./mockdata");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtSecretKey = "secret";
describe("generateToken", function () {
    it("should generate a JWT token for a valid user", function () {
        var req = {
            body: {
                name: mockdata_1.hashedPasswords[0].name,
                pass: mockdata_1.hashedPasswords[0].pass,
            },
        };
        var res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        (0, handler_1.generateToken)(req, res);
        expect(res.send).toHaveBeenCalledWith(jsonwebtoken_1.default.sign({ id: mockdata_1.hashedPasswords[0].id }, jwtSecretKey));
    });
    it("should return a 401 error for an invalid user", function () {
        var req = {
            body: {
                name: "invalid",
                pass: "invalid",
            },
        };
        var res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        (0, handler_1.generateToken)(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: "Invalid Credential" });
    });
});
describe("getUser", function () {
    it("should return user data if token is valid", function () {
        var req = {
            header: jest.fn().mockReturnValue(jsonwebtoken_1.default.sign({ id: mockdata_1.dataSet[0].id }, jwtSecretKey)),
        };
        var res = {
            send: jest.fn(),
        };
        (0, handler_1.getUser)(req, res);
        expect(res.send).toHaveBeenCalledWith(mockdata_1.dataSet[0]);
    });
    it("should return 401 if token is invalid", function () {
        var req = {
            header: jest.fn().mockReturnValue("invalid_token"),
        };
        var res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        (0, handler_1.getUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });
    it("should return 401 if token is missing", function () {
        var req = {
            header: jest.fn().mockReturnValue(undefined),
        };
        var res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        (0, handler_1.getUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });
});
describe("getAllUser", function () {
    it("should return all users' name if token is valid", function () {
        var req = {
            header: jest.fn().mockReturnValue(jsonwebtoken_1.default.sign({ id: mockdata_1.dataSet[0].id }, jwtSecretKey)),
        };
        var res = {
            send: jest.fn(),
        };
        (0, handler_1.getAllUser)(req, res);
        expect(res.send).toHaveBeenCalledWith(mockdata_1.dataSet.map(function (ele) { return ele.name; }));
    });
    it("should return 401 if token is invalid", function () {
        var req = {
            header: jest.fn().mockReturnValue("invalid_token"),
        };
        var res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        (0, handler_1.getAllUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });
    it("should return 401 if token is missing", function () {
        var req = {
            header: jest.fn().mockReturnValue(undefined),
        };
        var res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        (0, handler_1.getAllUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });
});
describe("register", function () {
    it("should register a new user and return a success message", function () {
        var req = {
            body: {
                name: "John Doe",
                pass: "password123",
                email: "johndoe@example.com",
            },
        };
        var res = {
            send: jest.fn(),
        };
        (0, handler_1.register)(req, res);
        expect(res.send).toHaveBeenCalledWith({ message: "User registered successfully" });
    });
});
