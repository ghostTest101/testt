import { hashedPasswords, dataSet } from "./mockdata";
import express from "express";
import jwt from "jsonwebtoken";

const jwtSecretKey = "secret";
export const generateToken = (req: express.Request, res: express.Response) => {
  let userExists = hashedPasswords.find(
    (ele) => req.body.name === ele.name && req.body.pass === ele.pass
  );
  if (userExists) {
    return res.send(jwt.sign({ id: userExists.id }, jwtSecretKey));
  }
  // Access Denied
  return res.status(401).send({ message: "Invalid Credential" });
};

export const getUser = (req: express.Request, res: express.Response) => {
  try {
    const token = req.header("authorization");

    const verified = jwt.verify(token as string, jwtSecretKey);
    if (verified) {
      let userdata = dataSet.find(
        (ele) => (verified as { id: string }).id === ele.id
      );
      return res.send(userdata);
    } else {
      // Access Denied
      return res.status(401).send(Error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
};

export const register = (req: express.Request, res: express.Response) => {
  try {
    const user = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: req.body.name,
      pass: req.body.pass,
      email: req.body.email,
    };
    dataSet.push(user);
    return res.send({ message: "User registered successfully" });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getAllUser = (req: express.Request, res: express.Response) => {
  try {
    const token = req.header("authorization");

    const verified = jwt.verify(token as string, jwtSecretKey);
    if (verified) {
      let userdata = dataSet.map((ele: any) => ele.name);
      return res.send(userdata);
    } else {
      // Access Denied
      return res.status(401).send(Error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
};