// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  eventType: { type: String, required: true },
  theme: { type: String },
  extraRequirements: { type: String },
  venue: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
});


const Event = mongoose.model("Event", eventSchema);

app.post("/api/events", async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = new Event(eventData);
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
