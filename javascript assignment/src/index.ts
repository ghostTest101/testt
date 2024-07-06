import express from "express";
import mongoose from "mongoose";
import  router  from "./router";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", router);

mongoose
  .connect("mongodb://0.0.0.0:27017/books", {
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
