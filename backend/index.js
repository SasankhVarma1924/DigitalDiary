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

const memorySchema = mongoose.Schema(
  {
    userId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    content : {type: String, required: true},
    createdAt : {type: Date, default: Date.now}
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
const Memory = mongoose.model("Memory", memorySchema, "memories");
const userDetailsCollection = mongoose.connection.collection("userdetails");
const memoriesCollection = mongoose.connection.collection("memories");
  
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

app.post("/api/memories/:name", async (req, res) =>
{
  try {
    const uname = req.params.name;
    const user = await userDetailsCollection.findOne({username: uname});
    if(!user)
    {
      return res.status(404).json({success: false, msg: "user not found"});
    }
    const uId = user._id;
    const memory = new Memory({
      userId : uId,
      content : req.body.content
    });
    await memory.save();
    return res.status(201).json({success: false, msg: "added to memories"});
  } catch (error) {
    return res.status(500).json({success: false, msg: "internal server error"});
  }
})

app.get("/api/memories/:name/:date", async (req, res) =>
{
  try{
    const uname = req.params.name;
    const mdate = new Date(req.params.date);
    const user = await userDetailsCollection.findOne({username: uname});
    if(!user)
    {
      return res.status(404).json({success: false, msg: "user not found"});
    }
    const uId = user._id;
    const startOfDay = new Date(mdate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(mdate.setHours(23, 59, 59, 999));

    const userMemory = await memoriesCollection.findOne({
      userId: uId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    if (userMemory) {
      return res.status(201).json({success: true, msg: "Retreived Memory", content: userMemory.content});
    } else {
      return res.status(404).json({ message: 'No memories found for this date.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

app.get("/api/memories/:name", async (req, res) =>
{
  try {
    const uname = req.params.name;
    const user = await userDetailsCollection.findOne({username: uname});
    if(!user)
    {
      return res.status(404).json({success: false, msg: "user not found"});
    }
    const uId = user._id;

    const memories = await memoriesCollection
        .find({ userId: uId }, { projection: { content: 1, createdAt: 1, _id: 0} })
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray();
    if(memories.length <= 0)
      return res.status(404).json({success: false, msg : "No memories found"});
    return res.status(201).json({success: true, msg : "Retreived all memories", memories : memories});
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

app.put("/api/memories/:name/:date", async (req, res) =>
{
  try {
    const uname = req.params.name;
    const mdate = new Date(req.params.date);
    const startOfDay = new Date(mdate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(mdate.setHours(23, 59, 59, 999));
    const content = req.body.content;
    const user = await userDetailsCollection.findOne({username: uname});
    if(!user)
    {
      return res.status(404).json({success: false, msg: "user not found"});
    }
    const uId = user._id;

    const result = await memoriesCollection.updateOne(
      {
        userId: uId,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        }
      },{$set : {content: content}}
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, msg: "No memory found for the given date" });
    }
    return res.json({ success: true, msg: "Memory content updated" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }

})

app.listen(PORT, () => {console.log(`listening to ${PORT}`)});

