import express from 'express'
import { generateToken,  getUser} from './handler'
const app = express();
const PORT = 5000;
app.use(express.json())
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

app.post("/user/generateToken", generateToken);

// Verification of JWT
app.get("/user", getUser);
