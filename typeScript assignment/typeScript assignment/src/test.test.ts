import { generateToken, getUser } from "./handler";
import { Request, Response } from "express";
import { hashedPasswords, dataSet } from "./mockdata";
import jwt from "jsonwebtoken";

const jwtSecretKey = "secret";

describe("generateToken", () => {
  it("should generate a JWT token for a valid user", () => {
    const req = {
      body: {
        name: hashedPasswords[0].name,
        pass: hashedPasswords[0].pass,
      },
    } as Request;
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    generateToken(req, res);
    expect(res.send).toHaveBeenCalledWith(
      jwt.sign({ id: hashedPasswords[0].id }, jwtSecretKey),
    );
  });

  it("should return a 401 error for an invalid user", () => {
    const req = {
      body: {
        name: "invalid",
        pass: "invalid",
      },
    } as Request;
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    generateToken(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ message: "Invalid Credential" });
  });
});

describe("getUser", () => {
  it("should return user data if token is valid", () => {
    const req = {
      header: jest.fn().mockReturnValue(
        jwt.sign({ id: dataSet[0].id }, jwtSecretKey),
      ),
    } as any;
    const res = {
      send: jest.fn(),
    } as any;
    getUser(req, res);
    expect(res.send).toHaveBeenCalledWith(dataSet[0]);
  });

  it("should return 401 if token is invalid", () => {
    const req = {
      header: jest.fn().mockReturnValue("invalid_token"),
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
    getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should return 401 if token is missing", () => {
    const req = {
      header: jest.fn().mockReturnValue(undefined),
    } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
    getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
