import express from "express"
import mongoose from "mongoose";
import "dotenv/config"
import cors from "cors"

const app = express();
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI

const userDetailSchema = mongoose.Schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  }
)

const connectToDatabase = async () =>
{
  try {
    await mongoose.connect(MONGOURI);
    console.log("mongoose connected succesfully");
  } catch (error) {
    console.log("mongoose connection error");
  }
}

connectToDatabase();
const User = mongoose.model("User", userDetailSchema, "userdetails");
const userDetailsCollection = mongoose.connection.collection("userdetails");
  
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.get("/", (req, res) =>
{
  res.send("hi");
})

app.post("/api/users/signup", async (req, res) =>
{
  try {
    const user = new User({
      username : req.body.username,
      password : req.body.password
    });
    await user.save();
    return res.status(201).json({success: true, msg : "successfully signed in"});
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({success: false, msg: 'Username already exists'});
    } else {
      return res.status(500).json({success: false, msg: 'Error creating user'});
    }
  }
})

app.post("/api/users/signin", async (req, res) =>
{
  try {
    const user = req.body;
    const found = await userDetailsCollection.findOne(user);
    if(!found)
    {
      return res.status(404).json({success: false, msg: "User not found"});
    }
    return res.status(200).json({success: true, msg : "User found"});
  } catch (error) {
    return res.status(500).json({success: false, msg : "Internal Server error"});
  }
})



app.listen(PORT, () => {console.log(`listening to ${PORT}`)});
