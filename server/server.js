const express = require('express');// express import
const mongoose = require('mongoose');//mongoose import
const cors = require('cors');// handling cors

const MONGO_URI = 'mongodb+srv://pathakayush0703:0P0rwLfIyiBH0V8a@cluster0.dqhwl.mongodb.net/';//mongo db connection

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from the frontend(middleware to connect frontend and backend)
}));
app.use(express.json());//middleware

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })// mondo db connection
  .then(() => console.log('MongoDB connected'))// if concceted suscessfully shoe this
  .catch(err => console.log(err));// if not show error

// Define your Job model
const Job = mongoose.model('Job', new mongoose.Schema({ // this are the filed to store data 
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
}));

app.get('/', (req, res) => {
  res.send('Welcome to the Job Board API');
});

// Define routes directly in server.js
app.get('/api/jobs', async (req, res) => {// get request to retrive the existing job
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/jobs', async (req, res) => {// post request to post the new job
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
  });

  try {
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
